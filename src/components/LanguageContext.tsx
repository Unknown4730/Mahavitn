import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mr';

interface Translation {
  // Header
  payBill: string;
  reportOutage: string;
  newConnection: string;
  trackApplication: string;
  login: string;
  register: string;
  profile: string;
  logout: string;
  smartGrid: string;
  energyInsights: string;
  
  // Landing Page
  welcomeTitle: string;
  welcomeSubtitle: string;
  solarInitiatives: string;
  consumerServices: string;
  tariffPlans: string;
  quickAccess: string;
  ourServices: string;
  consumersServed: string;
  uptimeReliability: string;
  customerSupport: string;
  serviceCenters: string;
  learnMore: string;
  
  // Dashboard
  dashboard: string;
  consumerNumber: string;
  billDetails: string;
  dueAmount: string;
  dueDate: string;
  downloadBill: string;
  usageStats: string;
  energyTips: string;
  searchPlaceholder: string;
  lastThreeMonths: string;
  units: string;
  advancedAnalytics: string;
  smartInsights: string;
  gridMonitoring: string;
  
  // Smart Grid
  liveGridNetwork: string;
  gridHealth: string;
  networkStability: string;
  frequency: string;
  voltage: string;
  systemLoad: string;
  totalLoad: string;
  renewable: string;
  efficiency: string;
  carbon: string;
  
  // Energy Insights
  aiEfficiency: string;
  sustainability: string;
  costOptimization: string;
  predictability: string;
  smartEnergyInsights: string;
  usagePrediction: string;
  applianceOptimization: string;
  timeOfUse: string;
  achievements: string;
  
  // Login
  emailOrPhone: string;
  password: string;
  forgotPassword: string;
  dontHaveAccount: string;
  
  // Profile
  personalInfo: string;
  name: string;
  email: string;
  phone: string;
  savedConsumers: string;
  addConsumer: string;
  
  // Meter Reading & Bills
  meterReading: string;
  viewMeterReading: string;
  billViewing: string;
  viewBill: string;
  downloadPDF: string;
  payNow: string;
  currentReading: string;
  previousReading: string;
  unitsConsumed: string;
  readingDate: string;
  switchConsumer: string;
  selectConsumer: string;
  
  // Common
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  search: string;
  submit: string;
  back: string;
  next: string;
  online: string;
  offline: string;
  critical: string;
  maintenance: string;
  viewDetails: string;
  takeAction: string;
  optimize: string;
}

const translations: Record<Language, Translation> = {
  en: {
    // Header
    payBill: "Pay Bill",
    reportOutage: "Report Outage",
    newConnection: "New Connection",
    trackApplication: "Track Application",
    login: "Login",
    register: "Register",
    profile: "Profile",
    logout: "Logout",
    smartGrid: "Smart Grid",
    energyInsights: "Energy Insights",
    
    // Landing Page
    welcomeTitle: "Maharashtra State Electricity Distribution",
    welcomeSubtitle: "Reliable power for every home and business across Maharashtra",
    solarInitiatives: "Solar Initiatives",
    consumerServices: "Consumer Services",
    tariffPlans: "Tariff Plans",
    quickAccess: "Quick Access",
    ourServices: "Our Services",
    consumersServed: "Consumers Served",
    uptimeReliability: "Uptime Reliability",
    customerSupport: "Customer Support",
    serviceCenters: "Service Centers",
    learnMore: "Learn More",
    
    // Dashboard
    dashboard: "Dashboard",
    consumerNumber: "Consumer Number",
    billDetails: "Bill Details",
    dueAmount: "Due Amount",
    dueDate: "Due Date",
    downloadBill: "Download Bill",
    usageStats: "Usage Statistics",
    energyTips: "Energy Tips",
    searchPlaceholder: "Enter Consumer Number to Check Bill",
    lastThreeMonths: "Last 3 Months Usage",
    units: "Units (kWh)",
    advancedAnalytics: "Advanced Analytics",
    smartInsights: "Smart Insights",
    gridMonitoring: "Grid Monitoring",
    
    // Smart Grid
    liveGridNetwork: "Live Grid Network",
    gridHealth: "Grid Health",
    networkStability: "Network Stability",
    frequency: "Frequency",
    voltage: "Voltage",
    systemLoad: "System Load",
    totalLoad: "Total Load",
    renewable: "Renewable",
    efficiency: "Efficiency",
    carbon: "Carbon",
    
    // Energy Insights
    aiEfficiency: "AI Efficiency",
    sustainability: "Sustainability",
    costOptimization: "Cost Optimization",
    predictability: "Predictability",
    smartEnergyInsights: "Smart Energy Insights",
    usagePrediction: "6-Month Usage Prediction",
    applianceOptimization: "Appliance Optimization",
    timeOfUse: "Time-of-Use Optimization",
    achievements: "Achievements",
    
    // Meter Reading & Bills
    meterReading: "Meter Reading",
    viewMeterReading: "View Meter Reading",
    billViewing: "Bill Viewing",
    viewBill: "View Bill",
    downloadPDF: "Download PDF",
    payNow: "Pay Now",
    currentReading: "Current Reading",
    previousReading: "Previous Reading",
    unitsConsumed: "Units Consumed",
    readingDate: "Reading Date",
    switchConsumer: "Switch Consumer",
    selectConsumer: "Select Consumer",
    
    // Login
    emailOrPhone: "Email or Phone",
    password: "Password",
    forgotPassword: "Forgot Password?",
    dontHaveAccount: "Don't have an account?",
    
    // Profile
    personalInfo: "Personal Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    savedConsumers: "Saved Consumer Numbers",
    addConsumer: "Add Consumer",
    
    // Common
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    submit: "Submit",
    back: "Back",
    next: "Next",
    online: "Online",
    offline: "Offline",
    critical: "Critical",
    maintenance: "Maintenance",
    viewDetails: "View Details",
    takeAction: "Take Action",
    optimize: "Optimize"
  },
  mr: {
    // Header
    payBill: "बिल भरा",
    reportOutage: "वीज खंडित झाल्याची तक्रार",
    newConnection: "नवीन कनेक्शन",
    trackApplication: "अर्ज ट्रॅक करा",
    login: "लॉगिन",
    register: "नोंदणी",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",
    smartGrid: "स्मार्ट ग्रिड",
    energyInsights: "ऊर्जा अंतर्दृष्टी",
    
    // Landing Page
    welcomeTitle: "महाराष्ट्र राज्य वीज वितरण",
    welcomeSubtitle: "महाराष्ट्रातील प्रत्येक घर आणि व्यवसायासाठी विश्वसनीय वीज",
    solarInitiatives: "सौर ऊर्जा उपक्रम",
    consumerServices: "ग्राहक सेवा",
    tariffPlans: "दर योजना",
    quickAccess: "त्वरित प्रवेश",
    ourServices: "आमच्या सेवा",
    consumersServed: "ग्राहकांना सेवा",
    uptimeReliability: "अपटाइम विश्वसनीयता",
    customerSupport: "ग्राहक सहाय्य",
    serviceCenters: "सेवा केंद्रे",
    learnMore: "अधिक जाणून घ्या",
    
    // Dashboard
    dashboard: "डॅशबोर्ड",
    consumerNumber: "ग्राहक क्रमांक",
    billDetails: "बिल तपशील",
    dueAmount: "थकित रक्कम",
    dueDate: "शेवटची तारीख",
    downloadBill: "बिल डाउनलोड करा",
    usageStats: "वापर आकडेवारी",
    energyTips: "ऊर्जा टिपा",
    searchPlaceholder: "बिल तपासण्यासाठी ग्राहक क्रमांक प्रविष्ट करा",
    lastThreeMonths: "गेल्या ३ महिन्यांचा वापर",
    units: "युनिट्स (kWh)",
    advancedAnalytics: "प्रगत विश्लेषण",
    smartInsights: "स्मार्ट अंतर्दृष्टी",
    gridMonitoring: "ग्रिड निरीक्षण",
    
    // Smart Grid
    liveGridNetwork: "लाइव्ह ग्रिड नेटवर्क",
    gridHealth: "ग्रिड आरोग्य",
    networkStability: "नेटवर्क स्थिरता",
    frequency: "वारंवारता",
    voltage: "व्होल्टेज",
    systemLoad: "सिस्टम लोड",
    totalLoad: "एकूण लोड",
    renewable: "नवीकरणीय",
    efficiency: "कार्यक्षमता",
    carbon: "कार्बन",
    
    // Energy Insights
    aiEfficiency: "AI कार्यक्षमता",
    sustainability: "टिकाऊपणा",
    costOptimization: "खर्च अनुकूलन",
    predictability: "अंदाज क्षमता",
    smartEnergyInsights: "स्मार्ट ऊर्जा अंतर्दृष्टी",
    usagePrediction: "६ महिन्यांचा वापर अंदाज",
    applianceOptimization: "उपकरण अनुकूलन",
    timeOfUse: "वापराच्या वेळेचे अनुकूलन",
    achievements: "उपलब्धी",
    
    // Meter Reading & Bills
    meterReading: "मीटर रीडिंग",
    viewMeterReading: "मीटर रीडिंग पहा",
    billViewing: "बिल पाहणे",
    viewBill: "बिल पहा",
    downloadPDF: "PDF डाउनलोड करा",
    payNow: "आता भरा",
    currentReading: "सध्याचे रीडिंग",
    previousReading: "मागील रीडिंग",
    unitsConsumed: "वापरलेले युनिट्स",
    readingDate: "रीडिंगची तारीख",
    switchConsumer: "ग्राहक बदला",
    selectConsumer: "ग्राहक निवडा",
    
    // Login
    emailOrPhone: "ईमेल किंवा फोन",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड विसरलात?",
    dontHaveAccount: "खाते नाही?",
    
    // Profile
    personalInfo: "वैयक्तिक माहिती",
    name: "नाव",
    email: "ईमेल",
    phone: "फोन",
    savedConsumers: "सेव केलेले ग्राहक क्रमांक",
    addConsumer: "ग्राहक जोडा",
    
    // Common
    save: "सेव्ह करा",
    cancel: "रद्द करा",
    edit: "संपादन",
    delete: "हटवा",
    search: "शोधा",
    submit: "सबमिट करा",
    back: "मागे",
    next: "पुढे",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    critical: "गंभीर",
    maintenance: "देखभाल",
    viewDetails: "तपशील पहा",
    takeAction: "कृती करा",
    optimize: "अनुकूल करा"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('mr');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}