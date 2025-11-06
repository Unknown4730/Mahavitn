import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ee8e359e`;

/**
 * Create test user from Kolhapur with 2 consumer accounts
 */
export async function createKolhapurUser() {
  const userData = {
    email: 'kolhapur.user@mahavitaran.com',
    password: 'Kolhapur@123',
    name: 'संजय पाटील',
    phone: '+91 9876501234'
  };

  try {
    // Create user account
    const signupResponse = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(userData),
    });

    const signupData = await signupResponse.json();
    
    if (!signupResponse.ok) {
      // User might already exist
      if (signupData.error && signupData.error.includes('already registered')) {
        console.log('ℹ️  User already exists, attempting to get existing data...');
        return { 
          success: true, 
          credentials: {
            email: userData.email,
            password: userData.password
          },
          message: 'User already exists'
        };
      }
      throw new Error(signupData.error || 'Signup failed');
    }

    console.log('✅ User created:', signupData.user.email);

    // Login to get access token
    const { createClient } = await import('./supabase/client');
    const supabase = createClient();
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      throw new Error('Login failed: ' + authError.message);
    }

    const accessToken = authData.session.access_token;

    // Consumer 1: Residential - Kolhapur Home
    const consumer1 = {
      consumerNumber: '266511869340',
      name: 'संजय पाटील',
      address: 'प्लॉट नं. १२३, शिवाजी रोड, कोल्हापूर - ४१६००२',
      category: 'Residential'
    };

    const consumer1Response = await fetch(`${API_BASE_URL}/consumers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(consumer1),
    });

    if (consumer1Response.ok) {
      console.log('✅ Consumer 1 added:', consumer1.consumerNumber);
    }

    // Consumer 2: Commercial - Kolhapur Shop
    const consumer2 = {
      consumerNumber: '266511870125',
      name: 'पाटील ट्रेडर्स',
      address: 'दुकान क्र. ४५, लक्ष्मी मार्केट, रंकाळा चौक, कोल्हापूर - ४१६०१२',
      category: 'Commercial'
    };

    const consumer2Response = await fetch(`${API_BASE_URL}/consumers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(consumer2),
    });

    if (consumer2Response.ok) {
      console.log('✅ Consumer 2 added:', consumer2.consumerNumber);
    }

    // Create bills for Consumer 1 (last 6 months)
    const consumer1Bills = [
      { month: 5, year: 2025, previousReading: 12150, currentReading: 12435, unitsConsumed: 285, amount: 2850 },
      { month: 6, year: 2025, previousReading: 12435, currentReading: 12750, unitsConsumed: 315, amount: 3150 },
      { month: 7, year: 2025, previousReading: 12750, currentReading: 13085, unitsConsumed: 335, amount: 3350 },
      { month: 8, year: 2025, previousReading: 13085, currentReading: 13427, unitsConsumed: 342, amount: 3420 },
      { month: 9, year: 2025, previousReading: 13427, currentReading: 13747, unitsConsumed: 320, amount: 3200 },
      { month: 10, year: 2025, previousReading: 13747, currentReading: 14045, unitsConsumed: 298, amount: 2980 }
    ];

    for (const bill of consumer1Bills) {
      const dueDate = new Date(bill.year, bill.month, 25).toISOString();
      await fetch(`${API_BASE_URL}/bills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          ...bill,
          consumerNumber: consumer1.consumerNumber,
          dueDate
        }),
      });
    }
    console.log('✅ Bills created for Consumer 1');

    // Create bills for Consumer 2 (last 6 months)
    const consumer2Bills = [
      { month: 5, year: 2025, previousReading: 45200, currentReading: 45850, unitsConsumed: 650, amount: 9750 },
      { month: 6, year: 2025, previousReading: 45850, currentReading: 46580, unitsConsumed: 730, amount: 10950 },
      { month: 7, year: 2025, previousReading: 46580, currentReading: 47360, unitsConsumed: 780, amount: 11700 },
      { month: 8, year: 2025, previousReading: 47360, currentReading: 48080, unitsConsumed: 720, amount: 10800 },
      { month: 9, year: 2025, previousReading: 48080, currentReading: 48765, unitsConsumed: 685, amount: 10275 },
      { month: 10, year: 2025, previousReading: 48765, currentReading: 49485, unitsConsumed: 720, amount: 10800 }
    ];

    for (const bill of consumer2Bills) {
      const dueDate = new Date(bill.year, bill.month, 25).toISOString();
      await fetch(`${API_BASE_URL}/bills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          ...bill,
          consumerNumber: consumer2.consumerNumber,
          dueDate
        }),
      });
    }
    console.log('✅ Bills created for Consumer 2');

    return {
      success: true,
      credentials: {
        email: userData.email,
        password: userData.password
      },
      consumers: [consumer1.consumerNumber, consumer2.consumerNumber],
      message: 'Kolhapur user created successfully with 2 consumer accounts'
    };

  } catch (error) {
    console.error('❌ Error creating Kolhapur user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Seed initial announcements
 */
export async function seedAnnouncements() {
  const announcements = [
    {
      title: "Scheduled Maintenance - Kolhapur Region",
      titleMr: "नियोजित देखभाल - कोल्हापूर क्षेत्र",
      description: "Power supply will be interrupted on Nov 15, 2025 from 10 AM to 2 PM in select areas of Kolhapur for maintenance work.",
      descriptionMr: "देखभाल कामासाठी 15 नोव्हेंबर 2025 रोजी सकाळी 10 ते दुपारी 2 वाजेपर्यंत कोल्हापूरच्या काही भागात वीज पुरवठा खंडित होईल.",
      type: 'maintenance',
      priority: 'high'
    },
    {
      title: "New Solar Net Metering Policy",
      titleMr: "नवीन सौर नेट मीटरिंग धोरण",
      description: "Mahavitaran introduces new net metering benefits for rooftop solar installations. Apply now and get up to 30% subsidy.",
      descriptionMr: "महावितरण छतावरील सौर प्रतिष्ठापनांसाठी नवीन नेट मीटरिंग फायदे सादर करते. आता अर्ज करा आणि 30% पर्यंत सबसिडी मिळवा.",
      type: 'info',
      priority: 'medium'
    },
    {
      title: "Diwali Special - Pay Bills & Win Prizes",
      titleMr: "दिवाळी स्पेशल - बिले भरा आणि बक्षिसे जिंका",
      description: "Pay your electricity bills before Nov 25 and stand a chance to win exciting prizes worth ₹1 lakh. Lucky draw on Nov 30.",
      descriptionMr: "25 नोव्हेंबर पूर्वी आपली विद्युत बिले भरा आणि ₹1 लाख किमतीची रोमांचक बक्षिसे जिंकण्याची संधी मिळवा. 30 नोव्हेंबर रोजी लकी ड्रॉ.",
      type: 'important',
      priority: 'high'
    },
    {
      title: "Energy Conservation Week",
      titleMr: "ऊर्जा संवर्धन आठवडा",
      description: "Join us in celebrating Energy Conservation Week from Nov 18-24. Learn tips to reduce your electricity consumption and save money.",
      descriptionMr: "18-24 नोव्हेंबर दरम्यान ऊर्जा संवर्धन आठवडा साजरा करण्यात आमच्यासोबत सामील व्हा. आपला विद्युत वापर कमी करण्याच्या टिप्स जाणून घ्या आणि पैसे वाचवा.",
      type: 'info',
      priority: 'low'
    },
    {
      title: "Important: Update Mobile Number",
      titleMr: "महत्त्वाचे: मोबाईल नंबर अपडेट करा",
      description: "Update your registered mobile number to receive important alerts, bill reminders, and power outage notifications via SMS.",
      descriptionMr: "एसएमएस द्वारे महत्त्वाचे अलर्ट, बिल स्मरणपत्रे आणि वीज खंडित होण्याच्या सूचना प्राप्त करण्यासाठी आपला नोंदणीकृत मोबाईल नंबर अपडेट करा.",
      type: 'warning',
      priority: 'medium'
    }
  ];

  const results = [];
  
  for (const announcement of announcements) {
    try {
      const response = await fetch(`${API_BASE_URL}/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(announcement),
      });

      if (response.ok) {
        const data = await response.json();
        results.push({ success: true, data });
      } else {
        const error = await response.json();
        results.push({ success: false, error });
      }
    } catch (error) {
      results.push({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  const successCount = results.filter(r => r.success).length;
  console.log(`✅ Created ${successCount}/${announcements.length} announcements`);

  return results;
}

/**
 * Initialize all live data
 */
export async function initializeLiveData() {
  console.log('🌱 Starting live data initialization...');
  
  // Seed announcements
  console.log('\n📢 Creating announcements...');
  await seedAnnouncements();
  
  // Create Kolhapur user with 2 consumers
  console.log('\n👤 Creating Kolhapur user...');
  const userResult = await createKolhapurUser();
  
  if (userResult.success) {
    console.log('\n✅ Live data initialization complete!');
    console.log('\n📋 Login Credentials:');
    console.log('   Email:', userResult.credentials.email);
    console.log('   Password:', userResult.credentials.password);
    if (userResult.consumers) {
      console.log('\n🏠 Consumer Accounts:');
      console.log('   1. Residential:', userResult.consumers[0]);
      console.log('   2. Commercial:', userResult.consumers[1]);
    }
  } else {
    console.error('\n❌ Failed to initialize data:', userResult.error);
  }
  
  return userResult;
}
