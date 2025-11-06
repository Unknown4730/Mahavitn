export interface Consumer {
  consumerNumber: string;
  name: string;
  address: string;
  dueAmount: number;
  dueDate: string;
  billDate: string;
  unitsConsumed: number;
  lastReading: number;
  currentReading: number;
  tariffType: string;
  meterImage?: string;
  meterReadingDate?: string;
  billPDF?: string;
  currentBill?: {
    units: number;
    amount: number;
    dueDate: string;
  };
  category?: string;
  status?: string;
}

export interface UsageData {
  month: string;
  units: number;
  amount: number;
}

export const mockConsumers: Consumer[] = [
  {
    consumerNumber: "MH123456789",
    name: "Rajesh Kumar Sharma",
    address: "123, Gandhi Nagar, Pune - 411001",
    dueAmount: 2850,
    dueDate: "2025-10-25",
    billDate: "2025-09-25",
    unitsConsumed: 285,
    lastReading: 12450,
    currentReading: 12735,
    tariffType: "Residential",
    category: "Residential",
    status: "Active",
    meterImage: "https://images.unsplash.com/photo-1662601619308-3cd3038944b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMG1ldGVyJTIwZGlnaXRhbCUyMHJlYWRpbmd8ZW58MXx8fHwxNzYwNDEwOTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    meterReadingDate: "2025-10-01",
    billPDF: "/mock-bill-1.pdf",
    currentBill: {
      units: 285,
      amount: 2850,
      dueDate: "25 Oct 2025"
    }
  },
  {
    consumerNumber: "MH987654321",
    name: "Priya Deshpande",
    address: "456, Shivaji Road, Mumbai - 400001",
    dueAmount: 1425,
    dueDate: "2025-10-28",
    billDate: "2025-09-28",
    unitsConsumed: 142,
    lastReading: 8920,
    currentReading: 9062,
    tariffType: "Residential",
    category: "Residential",
    status: "Active",
    meterImage: "https://images.unsplash.com/photo-1662601619308-3cd3038944b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMG1ldGVyJTIwZGlnaXRhbCUyMHJlYWRpbmd8ZW58MXx8fHwxNzYwNDEwOTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    meterReadingDate: "2025-10-01",
    billPDF: "/mock-bill-2.pdf",
    currentBill: {
      units: 142,
      amount: 1425,
      dueDate: "28 Oct 2025"
    }
  },
  {
    consumerNumber: "MH456789123",
    name: "अमित पाटील",
    address: "789, विवेकानंद नगर, नागपूर - 440001",
    dueAmount: 3275,
    dueDate: "2025-11-02",
    billDate: "2025-10-02",
    unitsConsumed: 327,
    lastReading: 15620,
    currentReading: 15947,
    tariffType: "Commercial",
    category: "Commercial",
    status: "Active",
    meterImage: "https://images.unsplash.com/photo-1662601619308-3cd3038944b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMG1ldGVyJTIwZGlnaXRhbCUyMHJlYWRpbmd8ZW58MXx8fHwxNzYwNDEwOTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    meterReadingDate: "2025-10-05",
    billPDF: "/mock-bill-3.pdf",
    currentBill: {
      units: 327,
      amount: 3275,
      dueDate: "2 Nov 2025"
    }
  },
  {
    consumerNumber: "MH654321987",
    name: "सुनीता जोशी",
    address: "321, कोल्हापूर रोड, पुणे - 411038",
    dueAmount: 1890,
    dueDate: "2025-10-30",
    billDate: "2025-09-30",
    unitsConsumed: 189,
    lastReading: 9845,
    currentReading: 10034,
    tariffType: "Residential",
    category: "Residential",
    status: "Active",
    meterImage: "https://images.unsplash.com/photo-1662601619308-3cd3038944b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMG1ldGVyJTIwZGlnaXRhbCUyMHJlYWRpbmd8ZW58MXx8fHwxNzYwNDEwOTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    meterReadingDate: "2025-10-02",
    billPDF: "/mock-bill-4.pdf",
    currentBill: {
      units: 189,
      amount: 1890,
      dueDate: "30 Oct 2025"
    }
  }
];

export const mockUsageData: UsageData[] = [
  { month: "Apr", units: 310, amount: 3100 },
  { month: "May", units: 335, amount: 3350 },
  { month: "Jun", units: 342, amount: 3420 },
  { month: "Jul", units: 320, amount: 3200 },
  { month: "Aug", units: 298, amount: 2980 },
  { month: "Sep", units: 285, amount: 2850 }
];

export const mockUsageDataMarathi: UsageData[] = [
  { month: "एप्रिल", units: 310, amount: 3100 },
  { month: "मे", units: 335, amount: 3350 },
  { month: "जून", units: 342, amount: 3420 },
  { month: "जुलै", units: 320, amount: 3200 },
  { month: "ऑगस्ट", units: 298, amount: 2980 },
  { month: "सप्टेंबर", units: 285, amount: 2850 }
];

export const energyTips = {
  en: [
    "Use LED bulbs to save up to 80% energy",
    "Unplug appliances when not in use",
    "Set AC temperature to 24°C for optimal savings",
    "Use star-rated appliances for better efficiency"
  ],
  mr: [
    "LED बल्ब वापरून ८०% ऊर्जा वाचवा",
    "वापरात नसताना उपकरणे बंद करा",
    "AC चे तापमान २४°C ठेवा",
    "स्टार रेटेड उपकरणे वापरा"
  ]
};

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  consumerNumbers: string[];
  defaultConsumer: string;
}

export const mockUserProfile: UserProfile = {
  name: "Rajesh Kumar Sharma",
  email: "rajesh.sharma@email.com",
  phone: "+91 9876543210",
  consumerNumbers: ["MH123456789", "MH987654321", "MH456789123", "MH654321987"],
  defaultConsumer: "MH123456789"
};

export interface Announcement {
  id: string;
  date: string;
  title: string;
  titleMr: string;
  description: string;
  descriptionMr: string;
  type: 'info' | 'warning' | 'maintenance' | 'important';
  priority: 'high' | 'medium' | 'low';
}

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    date: "2025-10-15",
    title: "Scheduled Maintenance - Pune Region",
    titleMr: "नियोजित देखभाल - पुणे क्षेत्र",
    description: "Power supply will be interrupted on Oct 20, 2025 from 10 AM to 2 PM in select areas of Pune for maintenance work.",
    descriptionMr: "देखभाल कामासाठी 20 ऑक्टोबर 2025 रोजी सकाळी 10 ते दुपारी 2 वाजेपर्यंत पुण्याच्या काही भागात वीज पुरवठा खंडित होईल.",
    type: 'maintenance',
    priority: 'high'
  },
  {
    id: "2",
    date: "2025-10-12",
    title: "New Solar Net Metering Policy",
    titleMr: "नवीन सौर नेट मीटरिंग धोरण",
    description: "Mahavitaran introduces new net metering benefits for rooftop solar installations. Apply now and get up to 30% subsidy.",
    descriptionMr: "महावितरण छतावरील सौर प्रतिष्ठापनांसाठी नवीन नेट मीटरिंग फायदे सादर करते. आता अर्ज करा आणि 30% पर्यंत सबसिडी मिळवा.",
    type: 'info',
    priority: 'medium'
  },
  {
    id: "3",
    date: "2025-10-10",
    title: "Diwali Special - Pay Bills & Win Prizes",
    titleMr: "दिवाळी स्पेशल - बिले भरा आणि बक्षिसे जिंका",
    description: "Pay your electricity bills before Oct 25 and stand a chance to win exciting prizes worth ₹1 lakh. Lucky draw on Oct 30.",
    descriptionMr: "25 ऑक्टोबर पूर्वी आपली विद्युत बिले भरा आणि ₹1 लाख किमतीची रोमांचक बक्षिसे जिंकण्याची संधी मिळवा. 30 ऑक्टोबर रोजी लकी ड्रॉ.",
    type: 'important',
    priority: 'high'
  },
  {
    id: "4",
    date: "2025-10-08",
    title: "Energy Conservation Week",
    titleMr: "ऊर्जा संवर्धन आठवडा",
    description: "Join us in celebrating Energy Conservation Week from Oct 18-24. Learn tips to reduce your electricity consumption and save money.",
    descriptionMr: "18-24 ऑक्टोबर दरम्यान ऊर्जा संवर्धन आठवडा साजरा करण्यात आमच्यासोबत सामील व्हा. आपला विद्युत वापर कमी करण्याच्या टिप्स जाणून घ्या आणि पैसे वाचवा.",
    type: 'info',
    priority: 'low'
  },
  {
    id: "5",
    date: "2025-10-05",
    title: "Important: Update Mobile Number",
    titleMr: "महत्त्वाचे: मोबाईल नंबर अपडेट करा",
    description: "Update your registered mobile number to receive important alerts, bill reminders, and power outage notifications via SMS.",
    descriptionMr: "एसएमएस द्वारे महत्त्वाचे अलर्ट, बिल स्मरणपत्रे आणि वीज खंडित होण्याच्या सूचना प्राप्त करण्यासाठी आपला नोंदणीकृत मोबाईल नंबर अपडेट करा.",
    type: 'warning',
    priority: 'medium'
  }
];

// Mock users for authentication
export interface MockUser {
  id: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  consumerNumbers: string[];
}

export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    email: "rajesh.sharma@email.com",
    password: "demo123",
    phone: "+91 9876543210",
    name: "Rajesh Kumar Sharma",
    consumerNumbers: ["MH123456789"]
  },
  {
    id: "user-2",
    email: "priya.deshpande@email.com",
    password: "demo123",
    phone: "+91 9876543211",
    name: "Priya Deshpande",
    consumerNumbers: ["MH987654321"]
  },
  {
    id: "user-3",
    email: "amit.patil@email.com",
    password: "demo123",
    phone: "+91 9876543212",
    name: "अमित पाटील",
    consumerNumbers: ["MH456789123"]
  },
  {
    id: "user-4",
    email: "sunita.joshi@email.com",
    password: "demo123",
    phone: "+91 9876543213",
    name: "सुनीता जोशी",
    consumerNumbers: ["MH654321987"]
  },
  // Demo user with all consumer numbers
  {
    id: "user-demo",
    email: "demo@mahavitaran.com",
    password: "demo123",
    phone: "+91 9999999999",
    name: "Demo User",
    consumerNumbers: ["MH123456789", "MH987654321", "MH456789123", "MH654321987"]
  }
];