import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', logger(console.log));

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to verify user
async function verifyUser(authHeader: string | null) {
  if (!authHeader) {
    return { error: 'No authorization header', user: null };
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    return { error: 'No token provided', user: null };
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return { error: 'Invalid token', user: null };
  }

  return { error: null, user: data.user };
}

// ============ AUTH ROUTES ============

// Sign Up
app.post('/make-server-6d937304/auth/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, phone } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: { name, phone: phone || '' }
    });

    if (authError) {
      console.log('Signup error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Create user profile in KV store
    const userProfile = {
      userId: authData.user.id,
      email,
      name,
      phone: phone || '',
      consumers: [],
      createdAt: new Date().toISOString()
    };

    await kv.set(`user:${authData.user.id}`, userProfile);

    return c.json({ 
      message: 'User created successfully',
      user: {
        id: authData.user.id,
        email,
        name
      }
    });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Failed to create user: ' + error.message }, 500);
  }
});

// Get User Profile
app.get('/make-server-6d937304/auth/profile', async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error || !user) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    const profile = await kv.get(`user:${user.id}`);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    return c.json({ profile });
  } catch (error) {
    console.log('Get profile error:', error);
    return c.json({ error: 'Failed to get profile: ' + error.message }, 500);
  }
});

// Update User Profile
app.put('/make-server-6d937304/auth/profile', async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error || !user) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { name, phone } = body;

    const profile = await kv.get(`user:${user.id}`);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    const updatedProfile = {
      ...profile,
      name: name || profile.name,
      phone: phone || profile.phone,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${user.id}`, updatedProfile);

    return c.json({ profile: updatedProfile });
  } catch (error) {
    console.log('Update profile error:', error);
    return c.json({ error: 'Failed to update profile: ' + error.message }, 500);
  }
});

// ============ CONSUMER ROUTES ============

// Add Consumer
app.post('/make-server-6d937304/consumers', async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error || !user) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { consumerNumber, name, address, category } = body;

    if (!consumerNumber) {
      return c.json({ error: 'Consumer number is required' }, 400);
    }

    // Check if consumer already exists
    const existingConsumer = await kv.get(`consumer:${consumerNumber}`);
    if (existingConsumer) {
      return c.json({ error: 'Consumer number already registered' }, 400);
    }

    // Create consumer
    const consumer = {
      consumerNumber,
      userId: user.id,
      name: name || '',
      address: address || '',
      category: category || 'Residential',
      status: 'Active',
      createdAt: new Date().toISOString()
    };

    await kv.set(`consumer:${consumerNumber}`, consumer);

    // Update user profile with consumer
    const profile = await kv.get(`user:${user.id}`);
    if (profile) {
      const updatedProfile = {
        ...profile,
        consumers: [...(profile.consumers || []), consumerNumber]
      };
      await kv.set(`user:${user.id}`, updatedProfile);
    }

    return c.json({ consumer });
  } catch (error) {
    console.log('Add consumer error:', error);
    return c.json({ error: 'Failed to add consumer: ' + error.message }, 500);
  }
});

// Get User's Consumers
app.get('/make-server-6d937304/consumers', async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error || !user) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    const profile = await kv.get(`user:${user.id}`);
    if (!profile || !profile.consumers || profile.consumers.length === 0) {
      return c.json({ consumers: [] });
    }

    // Get all consumer details
    const consumers = await Promise.all(
      profile.consumers.map(async (consumerNumber: string) => {
        const consumer = await kv.get(`consumer:${consumerNumber}`);
        if (consumer) {
          // Get latest bill
          const bills = await kv.getByPrefix(`bill:${consumerNumber}:`);
          const latestBill = bills.sort((a: any, b: any) => 
            new Date(b.billDate).getTime() - new Date(a.billDate).getTime()
          )[0];

          return {
            ...consumer,
            currentBill: latestBill || null
          };
        }
        return null;
      })
    );

    return c.json({ consumers: consumers.filter(c => c !== null) });
  } catch (error) {
    console.log('Get consumers error:', error);
    return c.json({ error: 'Failed to get consumers: ' + error.message }, 500);
  }
});

// Get Consumer Details
app.get('/make-server-6d937304/consumers/:consumerNumber', async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error || !user) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    const consumerNumber = c.req.param('consumerNumber');
    const consumer = await kv.get(`consumer:${consumerNumber}`);

    if (!consumer) {
      return c.json({ error: 'Consumer not found' }, 404);
    }

    // Verify ownership
    if (consumer.userId !== user.id) {
      return c.json({ error: 'Access denied' }, 403);
    }

    // Get bill history
    const bills = await kv.getByPrefix(`bill:${consumerNumber}:`);
    const sortedBills = bills.sort((a: any, b: any) => 
      new Date(b.billDate).getTime() - new Date(a.billDate).getTime()
    );

    // Get usage history
    const usageHistory = await kv.getByPrefix(`usage:${consumerNumber}:`);
    const sortedUsage = usageHistory.sort((a: any, b: any) => 
      new Date(b.month).getTime() - new Date(a.month).getTime()
    );

    return c.json({ 
      consumer,
      bills: sortedBills,
      usageHistory: sortedUsage.slice(0, 6) // Last 6 months
    });
  } catch (error) {
    console.log('Get consumer details error:', error);
    return c.json({ error: 'Failed to get consumer details: ' + error.message }, 500);
  }
});

// Remove Consumer from User Account
app.delete('/make-server-6d937304/consumers/:consumerNumber', async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error || !user) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    const consumerNumber = c.req.param('consumerNumber');
    const consumer = await kv.get(`consumer:${consumerNumber}`);

    if (!consumer) {
      return c.json({ error: 'Consumer not found' }, 404);
    }

    // Verify ownership
    if (consumer.userId !== user.id) {
      return c.json({ error: 'Access denied' }, 403);
    }

    // Remove consumer from user's profile
    const profile = await kv.get(`user:${user.id}`);
    if (profile) {
      const updatedProfile = {
        ...profile,
        consumers: (profile.consumers || []).filter((num: string) => num !== consumerNumber)
      };
      await kv.set(`user:${user.id}`, updatedProfile);
    }

    // Delete the consumer record
    await kv.del(`consumer:${consumerNumber}`);

    return c.json({ message: 'Consumer removed successfully' });
  } catch (error) {
    console.log('Remove consumer error:', error);
    return c.json({ error: 'Failed to remove consumer: ' + error.message }, 500);
  }
});

// ============ BILL ROUTES ============

// Create Bill (Admin/System)
app.post('/make-server-6d937304/bills', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      consumerNumber, 
      month, 
      year,
      previousReading, 
      currentReading, 
      unitsConsumed,
      amount,
      dueDate 
    } = body;

    if (!consumerNumber || !month || !year) {
      return c.json({ error: 'Consumer number, month, and year are required' }, 400);
    }

    const billId = `${consumerNumber}:${year}-${String(month).padStart(2, '0')}`;
    
    const bill = {
      billId,
      consumerNumber,
      month,
      year,
      previousReading: previousReading || 0,
      currentReading: currentReading || 0,
      unitsConsumed: unitsConsumed || 0,
      amount: amount || 0,
      dueDate: dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      billDate: new Date().toISOString(),
      status: 'Unpaid',
      createdAt: new Date().toISOString()
    };

    await kv.set(`bill:${billId}`, bill);

    // Update usage history
    const usage = {
      consumerNumber,
      month: `${year}-${String(month).padStart(2, '0')}-01`,
      units: unitsConsumed || 0,
      amount: amount || 0
    };
    await kv.set(`usage:${consumerNumber}:${year}-${String(month).padStart(2, '0')}`, usage);

    return c.json({ bill });
  } catch (error) {
    console.log('Create bill error:', error);
    return c.json({ error: 'Failed to create bill: ' + error.message }, 500);
  }
});

// Pay Bill
app.post('/make-server-6d937304/bills/:billId/pay', async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error || !user) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    const billId = c.req.param('billId');
    const bill = await kv.get(`bill:${billId}`);

    if (!bill) {
      return c.json({ error: 'Bill not found' }, 404);
    }

    // Verify consumer ownership
    const consumer = await kv.get(`consumer:${bill.consumerNumber}`);
    if (!consumer || consumer.userId !== user.id) {
      return c.json({ error: 'Access denied' }, 403);
    }

    const body = await c.req.json();
    const { paymentMethod, transactionId } = body;

    // Update bill status
    const updatedBill = {
      ...bill,
      status: 'Paid',
      paymentDate: new Date().toISOString(),
      paymentMethod: paymentMethod || 'Online',
      transactionId: transactionId || `TXN${Date.now()}`
    };

    await kv.set(`bill:${billId}`, updatedBill);

    // Create payment record
    const payment = {
      paymentId: `PAY${Date.now()}`,
      billId,
      consumerNumber: bill.consumerNumber,
      amount: bill.amount,
      paymentMethod: paymentMethod || 'Online',
      transactionId: transactionId || `TXN${Date.now()}`,
      paymentDate: new Date().toISOString(),
      userId: user.id
    };

    await kv.set(`payment:${payment.paymentId}`, payment);

    return c.json({ 
      message: 'Payment successful',
      payment,
      bill: updatedBill
    });
  } catch (error) {
    console.log('Pay bill error:', error);
    return c.json({ error: 'Failed to process payment: ' + error.message }, 500);
  }
});

// ============ SERVICE REQUEST ROUTES ============

// Create Service Request
app.post('/make-server-6d937304/service-requests', async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error || !user) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { type, consumerNumber, description, priority } = body;

    if (!type || !description) {
      return c.json({ error: 'Type and description are required' }, 400);
    }

    const requestId = `REQ${Date.now()}`;
    
    const serviceRequest = {
      requestId,
      userId: user.id,
      consumerNumber: consumerNumber || '',
      type, // 'outage', 'new_connection', 'meter_issue', 'billing_query', 'other'
      description,
      priority: priority || 'medium',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`service-request:${requestId}`, serviceRequest);

    return c.json({ 
      message: 'Service request created successfully',
      serviceRequest 
    });
  } catch (error) {
    console.log('Create service request error:', error);
    return c.json({ error: 'Failed to create service request: ' + error.message }, 500);
  }
});

// Get User's Service Requests
app.get('/make-server-6d937304/service-requests', async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error || !user) {
      return c.json({ error: error || 'Unauthorized' }, 401);
    }

    const allRequests = await kv.getByPrefix('service-request:');
    const userRequests = allRequests
      .filter((req: any) => req.userId === user.id)
      .sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return c.json({ serviceRequests: userRequests });
  } catch (error) {
    console.log('Get service requests error:', error);
    return c.json({ error: 'Failed to get service requests: ' + error.message }, 500);
  }
});

// ============ ANNOUNCEMENTS ROUTES ============

// Get Announcements
app.get('/make-server-6d937304/announcements', async (c) => {
  try {
    const announcements = await kv.getByPrefix('announcement:');
    const sortedAnnouncements = announcements.sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return c.json({ announcements: sortedAnnouncements });
  } catch (error) {
    console.log('Get announcements error:', error);
    return c.json({ error: 'Failed to get announcements: ' + error.message }, 500);
  }
});

// Create Announcement (Admin only)
app.post('/make-server-6d937304/announcements', async (c) => {
  try {
    const body = await c.req.json();
    const { title, titleMr, description, descriptionMr, type, priority } = body;

    if (!title || !description) {
      return c.json({ error: 'Title and description are required' }, 400);
    }

    const announcementId = `ANN${Date.now()}`;
    
    const announcement = {
      id: announcementId,
      title,
      titleMr: titleMr || title,
      description,
      descriptionMr: descriptionMr || description,
      type: type || 'info',
      priority: priority || 'medium',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    await kv.set(`announcement:${announcementId}`, announcement);

    return c.json({ announcement });
  } catch (error) {
    console.log('Create announcement error:', error);
    return c.json({ error: 'Failed to create announcement: ' + error.message }, 500);
  }
});

// Health check
app.get('/make-server-6d937304/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
Deno.serve(app.fetch);
