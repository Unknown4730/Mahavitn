import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  CreditCard, 
  AlertTriangle, 
  Plus, 
  Search,
  Sun,
  Phone,
  FileText,
  Zap,
  ArrowRight,
  Calculator
} from 'lucide-react';

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

export function LandingPage({ onPageChange }: LandingPageProps) {
  const { language, t } = useLanguage();

  const quickActions = [
    {
      title: t.payBill,
      description: language === 'mr' ? "त्वरित आणि सुरक्षित ऑनलाइन बिल पेमेंट" : "Quick and secure online bill payment",
      icon: CreditCard,
      color: "from-blue-500 to-blue-600",
      action: () => onPageChange('dashboard')
    },
    {
      title: t.reportOutage,
      description: language === 'mr' ? "आपल्या क्षेत्रातील वीज खंडित होण्याची तक्रार करा" : "Report power outages in your area",
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
      action: () => onPageChange('services')
    },
    {
      title: t.newConnection,
      description: language === 'mr' ? "नवीन वीज कनेक्शनसाठी अर्ज करा" : "Apply for new electricity connection",
      icon: Plus,
      color: "from-green-500 to-emerald-600",
      action: () => onPageChange('services')
    },
    {
      title: t.trackApplication,
      description: language === 'mr' ? "आपल्या अर्जाची स्थिती ट्रॅक करा" : "Track your application status",
      icon: Search,
      color: "from-purple-500 to-violet-600",
      action: () => onPageChange('services')
    },
    {
      title: language === 'mr' ? 'बिल कॅल्क्युलेटर' : 'Bill Calculator',
      description: language === 'mr' ? "आपले अंदाजे बिल त्वरित गणना करा" : "Calculate your estimated bill instantly",
      icon: Calculator,
      color: "from-yellow-500 to-amber-600",
      action: () => onPageChange('calculator')
    }
  ];

  const services = [
    {
      title: t.solarInitiatives,
      description: language === 'mr' ? "सौर ऊर्जा कार्यक्रमांबद्दल जाणून घ्या" : "Learn about solar energy programs",
      icon: Sun,
      image: "https://images.unsplash.com/photo-1655300256486-4ec7251bf84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJlbmV3YWJsZSUyMGVuZXJneXxlbnwxfHx8fDE3NTk4NjE3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: t.consumerServices,
      description: language === 'mr' ? "२४/७ ग्राहक सहाय्य आणि सेवा" : "24/7 customer support and services",
      icon: Phone,
      image: "https://images.unsplash.com/photo-1593354902760-619ac1323a25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMG1ldGVyJTIwZGlnaXRhbHxlbnwxfHx8fDE3NTk4ODk2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: t.tariffPlans,
      description: language === 'mr' ? "सध्याचे विद्युत दर पहा" : "View current electricity tariff rates",
      icon: FileText,
      image: "https://images.unsplash.com/photo-1758429291507-5b5d14000f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMHBvd2VyJTIwZ3JpZCUyMGVuZXJneSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc1OTg4OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-energy-blue)]/10 to-[var(--color-energy-lime)]/10" />
        <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--color-energy-lime)] rounded-full opacity-20 animate-pulse-energy" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[var(--color-energy-blue)] rounded-full opacity-10 animate-pulse" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              {language === 'mr' ? "१९६० पासून महाराष्ट्राला वीज पुरवठा" : "Powering Maharashtra Since 1960"}
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[var(--color-energy-blue)] to-[var(--color-energy-navy)] bg-clip-text text-transparent">
              {t.welcomeTitle}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.welcomeSubtitle}
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[var(--color-energy-blue)] to-[var(--color-energy-navy)] hover:shadow-lg transform hover:scale-105 transition-all"
                  onClick={() => onPageChange('dashboard')}
                >
                  {t.payBill}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => onPageChange('services')}>
                  {t.consumerServices}
                </Button>
              </div>
              
              {/* First Time User Notice */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full border border-blue-200 dark:border-blue-800">
                  <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                    {language === 'mr' ? '🎉 पहिल्यांदा येथे?' : '🎉 First time here?'}
                  </span>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-xs sm:text-sm h-auto p-0 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    onClick={() => onPageChange('setup')}
                  >
                    {language === 'mr' ? 'सेटअप पृष्ठ →' : 'Setup Page →'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">{t.quickAccess}</h2>
            <p className="text-muted-foreground">
              {language === 'mr' ? "आपल्या बोटांच्या टोकावर आवश्यक सेवा" : "Essential services at your fingertips"}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card 
                    className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 glass-card"
                    onClick={action.action}
                  >
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">
                        {action.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4">{t.ourServices}</h2>
            <p className="text-muted-foreground">
              {language === 'mr' ? "महाराष्ट्रासाठी सर्वसमावेशक विद्युत समाधाने" : "Comprehensive electricity solutions for Maharashtra"}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center text-white">
                        <Icon className="w-6 h-6 mr-2" />
                        <span className="font-semibold">{service.title}</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <Button variant="outline" className="w-full">
                        {t.learnMore}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { 
                number: "३२ लाख+", 
                numberEn: "3.2M+", 
                label: language === 'mr' ? "ग्राहकांना सेवा" : "Consumers Served" 
              },
              { 
                number: "९९.९%", 
                numberEn: "99.9%", 
                label: language === 'mr' ? "अपटाइम विश्वसनीयता" : "Uptime Reliability" 
              },
              { 
                number: "२४/७", 
                numberEn: "24/7", 
                label: language === 'mr' ? "ग्राहक सहाय्य" : "Customer Support" 
              },
              { 
                number: "१५+", 
                numberEn: "15+", 
                label: language === 'mr' ? "सेवा केंद्रे" : "Service Centers" 
              }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-3xl font-bold text-[var(--color-energy-blue)] mb-2">
                  {language === 'mr' ? stat.number : stat.numberEn}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}