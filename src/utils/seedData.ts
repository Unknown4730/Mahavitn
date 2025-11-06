import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ee8e359e`;

/**
 * Seed test data for development and testing
 * This creates sample announcements that can be viewed without login
 */
export async function seedAnnouncements() {
  const announcements = [
    {
      title: "Scheduled Maintenance - Pune Region",
      titleMr: "नियोजित देखभाल - पुणे क्षेत्र",
      description: "Power supply will be interrupted on Oct 20, 2025 from 10 AM to 2 PM in select areas of Pune for maintenance work.",
      descriptionMr: "देखभाल कामासाठी 20 ऑक्टोबर 2025 रोजी सकाळी 10 ते दुपारी 2 वाजेपर्यंत पुण्याच्या काही भागात वीज पुरवठा खंडित होईल.",
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
      description: "Pay your electricity bills before Oct 25 and stand a chance to win exciting prizes worth ₹1 lakh. Lucky draw on Oct 30.",
      descriptionMr: "25 ऑक्टोबर पूर्वी आपली विद्युत बिले भरा आणि ₹1 लाख किमतीची रोमांचक बक्षिसे जिंकण्याची संधी मिळवा. 30 ऑक्टोबर रोजी लकी ड्रॉ.",
      type: 'important',
      priority: 'high'
    },
    {
      title: "Energy Conservation Week",
      titleMr: "ऊर्जा संवर्धन आठवडा",
      description: "Join us in celebrating Energy Conservation Week from Oct 18-24. Learn tips to reduce your electricity consumption and save money.",
      descriptionMr: "18-24 ऑक्टोबर दरम्यान ऊर्जा संवर्धन आठवडा साजरा करण्यात आमच्यासोबत सामील व्हा. आपला विद्युत वापर कमी करण्याच्या टिप्स जाणून घ्या आणि पैसे वाचवा.",
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

  return results;
}

/**
 * Create a test user account
 */
export async function createTestUser() {
  const testUser = {
    email: 'demo@mahavitaran.com',
    password: 'demo123456',
    name: 'Demo User',
    phone: '+91 9876543210'
  };

  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { 
        success: true, 
        data,
        credentials: {
          email: testUser.email,
          password: testUser.password
        }
      };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Initialize all seed data
 */
export async function initializeSeedData() {
  console.log('🌱 Starting data seeding...');
  
  // Seed announcements
  console.log('Creating announcements...');
  const announcementResults = await seedAnnouncements();
  const announcementsCreated = announcementResults.filter(r => r.success).length;
  console.log(`✅ Created ${announcementsCreated}/${announcementResults.length} announcements`);
  
  // Create test user
  console.log('Creating test user...');
  const userResult = await createTestUser();
  if (userResult.success) {
    console.log('✅ Test user created successfully');
    console.log('📧 Email:', userResult.credentials?.email);
    console.log('🔑 Password:', userResult.credentials?.password);
  } else {
    if (userResult.error && typeof userResult.error === 'string' && userResult.error.includes('already registered')) {
      console.log('ℹ️  Test user already exists');
    } else {
      console.log('❌ Failed to create test user:', userResult.error);
    }
  }
  
  console.log('🎉 Data seeding complete!');
  
  return {
    announcements: announcementsCreated,
    user: userResult.success
  };
}
