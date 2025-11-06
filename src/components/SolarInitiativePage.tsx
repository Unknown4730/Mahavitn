import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { useLanguage } from './LanguageContext';
import { 
  Sun, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Award,
  Calculator,
  CheckCircle,
  ArrowRight,
  Download,
  Phone,
  MapPin,
  Users,
  Leaf,
  Battery,
  Home,
  Building2,
  Factory,
  IndianRupee,
  Calendar,
  Target,
  Sparkles
} from 'lucide-react';

interface SolarInitiativePageProps {
  onPageChange: (page: string) => void;
}

export function SolarInitiativePage({ onPageChange }: SolarInitiativePageProps) {
  const { t, language } = useLanguage();
  const [solarCapacity, setSolarCapacity] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [roofArea, setRoofArea] = useState('');

  const calculateSavings = () => {
    const bill = parseFloat(monthlyBill);
    const area = parseFloat(roofArea);
    if (isNaN(bill) || isNaN(area)) return null;
    
    const estimatedCapacity = area / 10; // Rough estimate: 1kW per 10 sq.m
    const annualGeneration = estimatedCapacity * 1500; // ~1500 units per kW per year
    const annualSavings = annualGeneration * 6; // Assuming ₹6 per unit
    const systemCost = estimatedCapacity * 50000; // ₹50,000 per kW
    const subsidy = Math.min(systemCost * 0.4, 78000); // 40% subsidy, max ₹78,000
    const paybackPeriod = (systemCost - subsidy) / annualSavings;
    
    return {
      capacity: estimatedCapacity.toFixed(2),
      annualGeneration: annualGeneration.toFixed(0),
      annualSavings: annualSavings.toFixed(0),
      systemCost: systemCost.toFixed(0),
      subsidy: subsidy.toFixed(0),
      paybackPeriod: paybackPeriod.toFixed(1)
    };
  };

  const savings = calculateSavings();

  const solarStats = [
    { 
      label: language === 'mr' ? 'कुल सौर क्षमता' : 'Total Solar Capacity', 
      value: '2,845', 
      unit: 'MW', 
      icon: Sun,
      color: 'from-[#FFD700] to-[#FFA500]'
    },
    { 
      label: language === 'mr' ? 'सौर ग्राहक' : 'Solar Consumers', 
      value: '45,230', 
      unit: '', 
      icon: Users,
      color: 'from-[#00BFFF] to-[#0080FF]'
    },
    { 
      label: language === 'mr' ? 'वार्षिक CO₂ बचत' : 'Annual CO₂ Saved', 
      value: '2.8M', 
      unit: 'tons', 
      icon: Leaf,
      color: 'from-[#10b981] to-[#059669]'
    },
    { 
      label: language === 'mr' ? 'ग्राहक बचत' : 'Consumer Savings', 
      value: '₹425Cr', 
      unit: '/year', 
      icon: TrendingUp,
      color: 'from-[#f59e0b] to-[#d97706]'
    }
  ];

  const programs = [
    {
      title: language === 'mr' ? 'घरगुती सौर छप्पर' : 'Residential Rooftop Solar',
      description: language === 'mr' 
        ? 'घरांसाठी 1-10 kW सौर प्रणाली, 40% सरकारी सबसिडीसह'
        : '1-10 kW solar systems for homes with 40% government subsidy',
      capacity: '1-10 kW',
      subsidy: language === 'mr' ? '40% पर्यंत' : 'Up to 40%',
      icon: Home,
      color: 'bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10'
    },
    {
      title: language === 'mr' ? 'व्यावसायिक सौर' : 'Commercial Solar',
      description: language === 'mr'
        ? 'व्यवसायांसाठी 10-100 kW प्रणाली, नेट मीटरिंग सुविधा'
        : '10-100 kW systems for businesses with net metering facility',
      capacity: '10-100 kW',
      subsidy: language === 'mr' ? '20% पर्यंत' : 'Up to 20%',
      icon: Building2,
      color: 'bg-gradient-to-br from-[#00BFFF]/10 to-[#0080FF]/10'
    },
    {
      title: language === 'mr' ? 'औद्योगिक सौर' : 'Industrial Solar',
      description: language === 'mr'
        ? 'मोठ्या उद्योगांसाठी 100+ kW प्रणाली, कस्टम समाधान'
        : '100+ kW systems for large industries with custom solutions',
      capacity: '100+ kW',
      subsidy: language === 'mr' ? 'कर लाभ' : 'Tax Benefits',
      icon: Factory,
      color: 'bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10'
    }
  ];

  const benefits = [
    { 
      title: language === 'mr' ? 'वीज बिल बचत' : 'Electricity Bill Savings',
      description: language === 'mr' 
        ? 'वीज बिलात 70-90% पर्यंत बचत करा'
        : 'Save 70-90% on your electricity bills',
      icon: DollarSign
    },
    { 
      title: language === 'mr' ? 'नेट मीटरिंग' : 'Net Metering',
      description: language === 'mr'
        ? 'अतिरिक्त वीज ग्रिडला विका आणि क्रेडिट मिळवा'
        : 'Sell excess power to grid and earn credits',
      icon: Zap
    },
    { 
      title: language === 'mr' ? 'पर्यावरण संरक्षण' : 'Environmental Protection',
      description: language === 'mr'
        ? 'कार्बन उत्सर्जन कमी करा, हरित भविष्य तयार करा'
        : 'Reduce carbon emissions, build a green future',
      icon: Leaf
    },
    { 
      title: language === 'mr' ? 'दीर्घकालीन गुंतवणूक' : 'Long-term Investment',
      description: language === 'mr'
        ? '25+ वर्षे सेवा, 5-7 वर्षांत परतावा'
        : '25+ years service, 5-7 years payback period',
      icon: TrendingUp
    }
  ];

  const applicationSteps = [
    {
      step: '1',
      title: language === 'mr' ? 'ऑनलाइन नोंदणी' : 'Online Registration',
      description: language === 'mr'
        ? 'आमच्या पोर्टलवर अर्ज भरा आणि आवश्यक कागदपत्रे अपलोड करा'
        : 'Fill application on our portal and upload required documents'
    },
    {
      step: '2',
      title: language === 'mr' ? 'तांत्रिक मूल्यांकन' : 'Technical Assessment',
      description: language === 'mr'
        ? 'आमचे अभियंता तुमच्या छप्पराचे मूल्यांकन करतील'
        : 'Our engineers will assess your rooftop feasibility'
    },
    {
      step: '3',
      title: language === 'mr' ? 'मंजुरी आणि सबसिडी' : 'Approval & Subsidy',
      description: language === 'mr'
        ? 'तांत्रिक मंजुरी आणि सबसिडी मंजुरी मिळवा'
        : 'Receive technical and subsidy approval'
    },
    {
      step: '4',
      title: language === 'mr' ? 'स्थापना' : 'Installation',
      description: language === 'mr'
        ? 'मान्यताप्राप्त विक्रेत्याकडून सौर प्रणाली स्थापित करा'
        : 'Install solar system through empaneled vendor'
    },
    {
      step: '5',
      title: language === 'mr' ? 'नेट मीटर' : 'Net Meter',
      description: language === 'mr'
        ? 'नेट मीटर स्थापना आणि ग्रिड कनेक्शन'
        : 'Net meter installation and grid connection'
    },
    {
      step: '6',
      title: language === 'mr' ? 'सबसिडी वितरण' : 'Subsidy Disbursement',
      description: language === 'mr'
        ? 'तपासणीनंतर सबसिडी रक्कम मिळवा'
        : 'Receive subsidy amount after inspection'
    }
  ];

  const successStories = [
    {
      name: 'Rajesh Patil',
      location: 'Pune',
      capacity: '5 kW',
      savings: '₹35,000/year',
      testimonial: language === 'mr'
        ? 'सौर ऊर्जेने माझे वीज बिल 80% कमी केले. उत्तम गुंतवणूक!'
        : 'Solar energy reduced my electricity bill by 80%. Great investment!',
      installation: 'Jan 2023'
    },
    {
      name: 'Sunita Deshmukh',
      location: 'Nagpur',
      capacity: '3 kW',
      savings: '₹22,000/year',
      testimonial: language === 'mr'
        ? 'सोपी प्रक्रिया आणि चांगली सबसिडी. खूप समाधानी!'
        : 'Easy process and good subsidy. Very satisfied!',
      installation: 'Mar 2023'
    },
    {
      name: 'Amit Kumar',
      location: 'Mumbai',
      capacity: '7 kW',
      savings: '₹48,000/year',
      testimonial: language === 'mr'
        ? 'व्यावसायिक जागेसाठी परिपूर्ण. बिल खूप कमी झाले.'
        : 'Perfect for commercial space. Bills drastically reduced.',
      installation: 'Aug 2022'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-energy-blue)]/5 via-background to-[var(--color-energy-lime)]/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[var(--color-energy-navy)] via-[var(--color-energy-blue)] to-[var(--color-energy-navy)] py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl animate-pulse-energy" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00BFFF]/20 rounded-full blur-3xl animate-pulse-energy" />
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center shadow-2xl">
                <Sun className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl text-white mb-4">
              {language === 'mr' ? 'सौर ऊर्जा उपक्रम' : 'Solar Energy Initiatives'}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {language === 'mr' 
                ? 'स्वच्छ, हरित आणि स्वस्त वीजेसाठी सौर ऊर्जा स्वीकारा. महाराष्ट्राला आत्मनिर्भर बनवण्यात सामील व्हा.'
                : 'Embrace solar energy for clean, green, and affordable electricity. Join us in making Maharashtra self-reliant.'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#FFD700] text-[var(--color-energy-navy)] hover:bg-[#FFA500] shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <FileText className="w-5 h-5 mr-2" />
                {language === 'mr' ? 'अर्ज सुरू करा' : 'Start Application'}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => onPageChange('calculator')}
              >
                <Calculator className="w-5 h-5 mr-2" />
                {language === 'mr' ? 'बचत मोजा' : 'Calculate Savings'}
              </Button>
            </div>
          </div>

          {/* Solar Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {solarStats.map((stat, index) => (
              <Card key={index} className="glass-card border-white/20 bg-white/10 backdrop-blur-md">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <Sparkles className="w-5 h-5 text-white/50" />
                  </div>
                  <div className="text-3xl text-white mb-1">
                    {stat.value}<span className="text-lg ml-1 text-white/70">{stat.unit}</span>
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <Tabs defaultValue="programs" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8 h-auto">
            <TabsTrigger value="programs" className="text-sm md:text-base py-3">
              <Sun className="w-4 h-4 mr-2" />
              {language === 'mr' ? 'कार्यक्रम' : 'Programs'}
            </TabsTrigger>
            <TabsTrigger value="netmetering" className="text-sm md:text-base py-3">
              <Battery className="w-4 h-4 mr-2" />
              {language === 'mr' ? 'नेट मीटरिंग' : 'Net Metering'}
            </TabsTrigger>
            <TabsTrigger value="subsidy" className="text-sm md:text-base py-3">
              <IndianRupee className="w-4 h-4 mr-2" />
              {language === 'mr' ? 'सबसिडी' : 'Subsidy'}
            </TabsTrigger>
            <TabsTrigger value="calculator" className="text-sm md:text-base py-3">
              <Calculator className="w-4 h-4 mr-2" />
              {language === 'mr' ? 'कॅल्क्युलेटर' : 'Calculator'}
            </TabsTrigger>
            <TabsTrigger value="process" className="text-sm md:text-base py-3">
              <FileText className="w-4 h-4 mr-2" />
              {language === 'mr' ? 'प्रक्रिया' : 'Process'}
            </TabsTrigger>
            <TabsTrigger value="success" className="text-sm md:text-base py-3">
              <Award className="w-4 h-4 mr-2" />
              {language === 'mr' ? 'यशोगाथा' : 'Success Stories'}
            </TabsTrigger>
          </TabsList>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((program, index) => (
                <Card key={index} className={`glass-card energy-glow hover:scale-105 transition-all ${program.color}`}>
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-energy-blue)] to-[var(--color-energy-navy)] flex items-center justify-center mb-4">
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                        <span className="text-sm">{language === 'mr' ? 'क्षमता' : 'Capacity'}</span>
                        <Badge variant="secondary">{program.capacity}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                        <span className="text-sm">{language === 'mr' ? 'सबसिडी' : 'Subsidy'}</span>
                        <Badge className="bg-[#FFD700] text-[var(--color-energy-navy)]">{program.subsidy}</Badge>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-[var(--color-energy-blue)] to-[var(--color-energy-navy)]">
                        {language === 'mr' ? 'अधिक माहिती' : 'Learn More'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits Section */}
            <Card className="glass-card energy-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[var(--color-energy-blue)]" />
                  {language === 'mr' ? 'सौर ऊर्जेचे फायदे' : 'Benefits of Solar Energy'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-white/50 dark:bg-black/10 rounded-lg hover:shadow-lg transition-all">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="mb-1">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Net Metering Tab */}
          <TabsContent value="netmetering" className="space-y-6">
            <Card className="glass-card energy-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="w-6 h-6 text-[var(--color-energy-blue)]" />
                  {language === 'mr' ? 'नेट मीटरिंग काय आहे?' : 'What is Net Metering?'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg">
                  {language === 'mr'
                    ? 'नेट मीटरिंग ही एक योजना आहे जी सौर ऊर्जा ग्राहकांना त्यांची अतिरिक्त वीज ग्रिडला विकण्याची परवानगी देते.'
                    : 'Net metering is a scheme that allows solar consumers to sell their excess electricity back to the grid.'
                  }
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-[var(--color-energy-blue)]">
                      <Zap className="w-5 h-5" />
                      {language === 'mr' ? 'कसे काम करते' : 'How It Works'}
                    </h4>
                    <ol className="space-y-3 list-decimal list-inside">
                      <li className="text-sm">
                        {language === 'mr' 
                          ? 'दिवसा सौर पॅनेल वीज निर्माण करतात'
                          : 'Solar panels generate electricity during daytime'
                        }
                      </li>
                      <li className="text-sm">
                        {language === 'mr'
                          ? 'अतिरिक्त वीज ग्रिडमध्ये पाठवली जाते'
                          : 'Excess power is sent to the grid'
                        }
                      </li>
                      <li className="text-sm">
                        {language === 'mr'
                          ? 'रात्री किंवा ढगाळ दिवशी ग्रिडवरून वीज वापरा'
                          : 'Use grid power at night or on cloudy days'
                        }
                      </li>
                      <li className="text-sm">
                        {language === 'mr'
                          ? 'केवळ निव्वळ वापरासाठी बिल भरा (वापर - उत्पादन)'
                          : 'Pay bill only for net usage (Consumed - Generated)'
                        }
                      </li>
                    </ol>
                  </div>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-[var(--color-energy-blue)]">
                      <Target className="w-5 h-5" />
                      {language === 'mr' ? 'पात्रता' : 'Eligibility'}
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          {language === 'mr'
                            ? 'सर्व घरगुती, व्यावसायिक आणि औद्योगिक ग्राहक'
                            : 'All residential, commercial and industrial consumers'
                          }
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          {language === 'mr'
                            ? 'सौर प्रणाली क्षमता संविदा मागणीच्या 100% पर्यंत'
                            : 'Solar system capacity up to 100% of sanctioned load'
                          }
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          {language === 'mr'
                            ? 'मान्यताप्राप्त विक्रेत्याकडून स्थापना'
                            : 'Installation through empaneled vendor'
                          }
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          {language === 'mr'
                            ? 'कोणतेही थकबाकी बिल नसावे'
                            : 'No pending electricity bills'
                          }
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="bg-gradient-to-r from-[var(--color-energy-blue)]/10 to-[var(--color-energy-lime)]/10 p-6 rounded-lg">
                  <h4 className="mb-4 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    {language === 'mr' ? 'बिलिंग व्यवस्था' : 'Billing Mechanism'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                      <div className="text-2xl text-[var(--color-energy-blue)] mb-2">1:1</div>
                      <div className="text-sm">{language === 'mr' ? 'एक्सचेंज रेशिओ' : 'Exchange Ratio'}</div>
                    </div>
                    <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                      <div className="text-2xl text-[var(--color-energy-blue)] mb-2">25 {language === 'mr' ? 'वर्षे' : 'Years'}</div>
                      <div className="text-sm">{language === 'mr' ? 'करार कालावधी' : 'Agreement Period'}</div>
                    </div>
                    <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                      <div className="text-2xl text-[var(--color-energy-blue)] mb-2">{language === 'mr' ? 'मासिक' : 'Monthly'}</div>
                      <div className="text-sm">{language === 'mr' ? 'सेटलमेंट' : 'Settlement'}</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-[var(--color-energy-blue)] to-[var(--color-energy-navy)]">
                  <Download className="w-5 h-5 mr-2" />
                  {language === 'mr' ? 'नेट मीटरिंग मार्गदर्शक तत्त्वे डाउनलोड करा' : 'Download Net Metering Guidelines'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subsidy Tab */}
          <TabsContent value="subsidy" className="space-y-6">
            <Card className="glass-card energy-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-6 h-6 text-[var(--color-energy-blue)]" />
                  {language === 'mr' ? 'सबसिडी योजना' : 'Subsidy Schemes'}
                </CardTitle>
                <CardDescription>
                  {language === 'mr'
                    ? 'केंद्र आणि राज्य सरकारच्या सबसिडी योजना'
                    : 'Central and State Government subsidy schemes'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Central Government Subsidy */}
                <div className="p-6 bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 rounded-lg border border-[#FFD700]/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4>{language === 'mr' ? 'केंद्र सरकार सबसिडी' : 'Central Government Subsidy'}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'mr' ? 'PM सूर्य घर योजना' : 'PM Surya Ghar Scheme'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg">
                      <span className="text-sm">1-3 kW</span>
                      <Badge className="bg-[#FFD700] text-[var(--color-energy-navy)]">
                        ₹30,000 per kW
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg">
                      <span className="text-sm">3-10 kW</span>
                      <Badge className="bg-[#FFD700] text-[var(--color-energy-navy)]">
                        ₹18,000 per kW (above 3 kW)
                      </Badge>
                    </div>
                    <div className="p-3 bg-white dark:bg-black/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{language === 'mr' ? 'कमाल सबसिडी' : 'Maximum Subsidy'}</span>
                        <span className="font-semibold text-[var(--color-energy-blue)]">₹78,000</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* State Government Benefits */}
                <div className="p-6 bg-gradient-to-br from-[#00BFFF]/10 to-[#0080FF]/10 rounded-lg border border-[#00BFFF]/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#0080FF] flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4>{language === 'mr' ? 'राज्य सरकार लाभ' : 'State Government Benefits'}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'mr' ? 'महाराष्ट्र सौर धोरण' : 'Maharashtra Solar Policy'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2 p-3 bg-white dark:bg-black/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm mb-1">
                          {language === 'mr' ? 'मोफत नेट मीटर स्थापना' : 'Free Net Meter Installation'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {language === 'mr' ? '₹3,000-5,000 ची बचत' : 'Save ₹3,000-5,000'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-white dark:bg-black/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm mb-1">
                          {language === 'mr' ? 'जलद मंजुरी प्रक्रिया' : 'Fast-track Approval Process'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {language === 'mr' ? '15 दिवसांत मंजुरी' : 'Approval within 15 days'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-white dark:bg-black/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm mb-1">
                          {language === 'mr' ? 'कर सवलत' : 'Tax Exemptions'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {language === 'mr' ? 'मालमत्ता कर सवलत' : 'Property tax rebates'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subsidy Calculator */}
                <div className="p-6 bg-white/50 dark:bg-black/10 rounded-lg">
                  <h4 className="mb-4">{language === 'mr' ? 'सबसिडी कॅल्क्युलेटर' : 'Subsidy Calculator'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{language === 'mr' ? 'प्रणाली क्षमता (kW)' : 'System Capacity (kW)'}</Label>
                      <Input 
                        type="number" 
                        placeholder="3"
                        value={solarCapacity}
                        onChange={(e) => setSolarCapacity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{language === 'mr' ? 'अंदाजे खर्च (₹/kW)' : 'Estimated Cost (₹/kW)'}</Label>
                      <Input 
                        type="number" 
                        placeholder="50000"
                        defaultValue="50000"
                        disabled
                      />
                    </div>
                  </div>
                  
                  {solarCapacity && parseFloat(solarCapacity) > 0 && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-[var(--color-energy-blue)]/10 to-[var(--color-energy-lime)]/10 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl text-[var(--color-energy-blue)] mb-1">
                            ₹{(parseFloat(solarCapacity) * 50000).toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {language === 'mr' ? 'कुल खर्च' : 'Total Cost'}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl text-green-600 mb-1">
                            ₹{Math.min(
                              parseFloat(solarCapacity) <= 3 
                                ? parseFloat(solarCapacity) * 30000 
                                : 90000 + (parseFloat(solarCapacity) - 3) * 18000,
                              78000
                            ).toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {language === 'mr' ? 'सबसिडी' : 'Subsidy'}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl text-[var(--color-energy-navy)] mb-1">
                            ₹{(
                              parseFloat(solarCapacity) * 50000 - 
                              Math.min(
                                parseFloat(solarCapacity) <= 3 
                                  ? parseFloat(solarCapacity) * 30000 
                                  : 90000 + (parseFloat(solarCapacity) - 3) * 18000,
                                78000
                              )
                            ).toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {language === 'mr' ? 'तुमचा खर्च' : 'Your Cost'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator" id="solar-calculator" className="space-y-6">
            <Card className="glass-card energy-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-[var(--color-energy-blue)]" />
                  {language === 'mr' ? 'सौर बचत कॅल्क्युलेटर' : 'Solar Savings Calculator'}
                </CardTitle>
                <CardDescription>
                  {language === 'mr'
                    ? 'तुमची संभाव्य बचत आणि परतावा मोजा'
                    : 'Calculate your potential savings and return on investment'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyBill">
                      {language === 'mr' ? 'मासिक वीज बिल (₹)' : 'Monthly Electricity Bill (₹)'}
                    </Label>
                    <Input
                      id="monthlyBill"
                      type="number"
                      placeholder="3000"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roofArea">
                      {language === 'mr' ? 'उपलब्ध छप्पर क्षेत्र (चौ.फूट)' : 'Available Roof Area (sq.ft)'}
                    </Label>
                    <Input
                      id="roofArea"
                      type="number"
                      placeholder="300"
                      value={roofArea}
                      onChange={(e) => setRoofArea(e.target.value)}
                    />
                  </div>
                </div>

                {savings && (
                  <div className="space-y-6">
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 rounded-lg border border-[#FFD700]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Sun className="w-5 h-5 text-[#FFA500]" />
                          <span className="text-sm text-muted-foreground">
                            {language === 'mr' ? 'अनुशंसित क्षमता' : 'Recommended Capacity'}
                          </span>
                        </div>
                        <div className="text-3xl text-[var(--color-energy-navy)]">{savings.capacity} kW</div>
                      </div>

                      <div className="p-4 bg-gradient-to-br from-[#00BFFF]/10 to-[#0080FF]/10 rounded-lg border border-[#00BFFF]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-5 h-5 text-[#00BFFF]" />
                          <span className="text-sm text-muted-foreground">
                            {language === 'mr' ? 'वार्षिक उत्पादन' : 'Annual Generation'}
                          </span>
                        </div>
                        <div className="text-3xl text-[var(--color-energy-navy)]">{savings.annualGeneration} kWh</div>
                      </div>

                      <div className="p-4 bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 rounded-lg border border-[#10b981]/30">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-[#10b981]" />
                          <span className="text-sm text-muted-foreground">
                            {language === 'mr' ? 'वार्षिक बचत' : 'Annual Savings'}
                          </span>
                        </div>
                        <div className="text-3xl text-[var(--color-energy-navy)]">₹{parseFloat(savings.annualSavings).toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    <div className="p-6 bg-white/50 dark:bg-black/10 rounded-lg space-y-4">
                      <h4 className="flex items-center gap-2">
                        <IndianRupee className="w-5 h-5" />
                        {language === 'mr' ? 'आर्थिक विश्लेषण' : 'Financial Analysis'}
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg">
                          <span className="text-sm">{language === 'mr' ? 'प्रणाली खर्च' : 'System Cost'}</span>
                          <span className="font-semibold">₹{parseFloat(savings.systemCost).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg">
                          <span className="text-sm">{language === 'mr' ? 'सरकारी सबसिडी' : 'Government Subsidy'}</span>
                          <span className="font-semibold text-green-600">- ₹{parseFloat(savings.subsidy).toLocaleString('en-IN')}</span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[var(--color-energy-blue)]/10 to-[var(--color-energy-lime)]/10 rounded-lg">
                          <span>{language === 'mr' ? 'तुमची गुंतवणूक' : 'Your Investment'}</span>
                          <span className="text-xl">
                            ₹{(parseFloat(savings.systemCost) - parseFloat(savings.subsidy)).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 rounded-lg">
                          <span>{language === 'mr' ? 'परतावा कालावधी' : 'Payback Period'}</span>
                          <span className="text-xl text-[var(--color-energy-blue)]">
                            {savings.paybackPeriod} {language === 'mr' ? 'वर्षे' : 'years'}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            {language === 'mr' ? '25 वर्षांत एकूण बचत' : 'Total Savings in 25 Years'}
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            ₹{((parseFloat(savings.annualSavings) * 25) - (parseFloat(savings.systemCost) - parseFloat(savings.subsidy))).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <Progress 
                          value={100} 
                          className="h-3 bg-gray-200"
                        />
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[var(--color-energy-navy)] hover:shadow-xl">
                      <FileText className="w-5 h-5 mr-2" />
                      {language === 'mr' ? 'अर्ज सुरू करा' : 'Start Application'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Process Tab */}
          <TabsContent value="process" className="space-y-6">
            <Card className="glass-card energy-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[var(--color-energy-blue)]" />
                  {language === 'mr' ? 'अर्ज प्रक्रिया' : 'Application Process'}
                </CardTitle>
                <CardDescription>
                  {language === 'mr'
                    ? '6 सोप्या चरणांमध्ये सौर ऊर्जा मिळवा'
                    : 'Get solar energy in 6 simple steps'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {applicationSteps.map((step, index) => (
                    <div key={index} className="relative">
                      {index < applicationSteps.length - 1 && (
                        <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-energy-blue)] to-[var(--color-energy-lime)]" />
                      )}
                      <div className="flex gap-4">
                        <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                          {step.step}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="p-4 bg-white/50 dark:bg-black/10 rounded-lg hover:shadow-lg transition-all">
                            <h4 className="mb-2">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-8" />

                <div className="space-y-4">
                  <h4 className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {language === 'mr' ? 'आवश्यक कागदपत्रे' : 'Required Documents'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      language === 'mr' ? 'ओळखपत्र (आधार/पॅन कार्ड)' : 'Identity Proof (Aadhaar/PAN Card)',
                      language === 'mr' ? 'विद्युत बिल प्रत' : 'Electricity Bill Copy',
                      language === 'mr' ? 'मालमत्ता कागदपत्रे' : 'Property Documents',
                      language === 'mr' ? 'छायाचित्र' : 'Photograph',
                      language === 'mr' ? 'बँक खाते तपशील' : 'Bank Account Details',
                      language === 'mr' ? 'छप्पराचे फोटो' : 'Roof Photographs'
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-white dark:bg-black/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[var(--color-energy-navy)] hover:shadow-xl">
                    <FileText className="w-5 h-5 mr-2" />
                    {language === 'mr' ? 'ऑनलाइन अर्ज करा' : 'Apply Online'}
                  </Button>
                  <Button variant="outline">
                    <Download className="w-5 h-5 mr-2" />
                    {language === 'mr' ? 'अर्ज फॉर्म डाउनलोड करा' : 'Download Application Form'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="glass-card energy-glow">
              <CardHeader>
                <CardTitle>{language === 'mr' ? 'सहाय्य केंद्र' : 'Help Center'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-black/10 rounded-lg">
                    <Phone className="w-5 h-5 text-[var(--color-energy-blue)] flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="mb-1">{language === 'mr' ? 'हेल्पलाइन' : 'Helpline'}</h5>
                      <p className="text-sm text-muted-foreground">1912 (Toll-Free)</p>
                      <p className="text-sm text-muted-foreground">+91-22-33019301</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-black/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-[var(--color-energy-blue)] flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="mb-1">{language === 'mr' ? 'कार्यालय' : 'Office'}</h5>
                      <p className="text-sm text-muted-foreground">
                        Prakashgad, Bandra (E), Mumbai - 400051
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="success" className="space-y-6">
            <Card className="glass-card energy-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-[var(--color-energy-blue)]" />
                  {language === 'mr' ? 'ग्राहक यशोगाथा' : 'Customer Success Stories'}
                </CardTitle>
                <CardDescription>
                  {language === 'mr'
                    ? 'सौर ऊर्जा स्वीकारणाऱ्या समाधानी ग्राहकांच्या अनुभव'
                    : 'Experiences of satisfied customers who adopted solar energy'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {successStories.map((story, index) => (
                    <Card key={index} className="glass-card hover:shadow-xl transition-all">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-white">
                            {story.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-base">{story.name}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {story.location}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 bg-white/50 dark:bg-black/10 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">
                              {language === 'mr' ? 'क्षमता' : 'Capacity'}
                            </div>
                            <div className="font-semibold text-[var(--color-energy-blue)]">{story.capacity}</div>
                          </div>
                          <div className="p-3 bg-white/50 dark:bg-black/10 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">
                              {language === 'mr' ? 'बचत' : 'Savings'}
                            </div>
                            <div className="font-semibold text-green-600">{story.savings}</div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-br from-[var(--color-energy-blue)]/10 to-[var(--color-energy-lime)]/10 rounded-lg">
                          <p className="text-sm italic">"{story.testimonial}"</p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {language === 'mr' ? 'स्थापित:' : 'Installed:'} {story.installation}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator className="my-8" />

                <div className="text-center space-y-4">
                  <h4>{language === 'mr' ? 'तुमचा अनुभव सामायिक करा' : 'Share Your Experience'}</h4>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    {language === 'mr'
                      ? 'तुम्ही सौर ऊर्जा स्वीकारली असल्यास, तुमचा अनुभव इतरांसोबत सामायिक करा आणि त्यांना प्रेरित करा.'
                      : 'If you have adopted solar energy, share your experience with others and inspire them.'
                    }
                  </p>
                  <Button variant="outline">
                    {language === 'mr' ? 'तुमची कथा सबमिट करा' : 'Submit Your Story'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="glass-card energy-glow mt-12 bg-gradient-to-r from-[var(--color-energy-navy)] to-[var(--color-energy-blue)]">
          <CardContent className="py-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sun className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl text-white mb-4">
              {language === 'mr' ? 'सौर क्रांतीत सामील व्हा' : 'Join the Solar Revolution'}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {language === 'mr'
                ? 'आजच सौर ऊर्जेकडे वळा आणि हरित, स्वच्छ आणि आत्मनिर्भर महाराष्ट्र तयार करण्यात योगदान द्या.'
                : 'Switch to solar energy today and contribute to building a green, clean, and self-reliant Maharashtra.'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#FFD700] text-[var(--color-energy-navy)] hover:bg-[#FFA500] shadow-xl"
              >
                <Zap className="w-5 h-5 mr-2" />
                {language === 'mr' ? 'आजच सुरू करा' : 'Get Started Today'}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                <Phone className="w-5 h-5 mr-2" />
                {language === 'mr' ? 'आम्हाला कॉल करा' : 'Call Us'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
