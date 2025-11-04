import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { useLanguage } from './LanguageContext';
import { 
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Bell,
  Smartphone,
  Mail,
  CreditCard,
  Home,
  Sparkles,
  Shield,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { addConsumerNumber } from '../utils/api';

interface UserSetupPageProps {
  onSetupComplete: () => void;
  userId: string;
  userEmail: string;
}

export function UserSetupPage({ onSetupComplete, userId, userEmail }: UserSetupPageProps) {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Consumer Account
  const [consumerNumber, setConsumerNumber] = useState('');
  const [consumerName, setConsumerName] = useState('');
  const [consumerAddress, setConsumerAddress] = useState('');

  // Step 2: Preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [billReminders, setBillReminders] = useState(true);
  const [outageAlerts, setOutageAlerts] = useState(true);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const content = {
    en: {
      title: 'Complete Your Profile',
      subtitle: 'Let\'s set up your account in a few simple steps',
      step1Title: 'Connect Your Consumer Account',
      step1Description: 'Link your electricity consumer number to access your bills and usage',
      step2Title: 'Notification Preferences',
      step2Description: 'Choose how you want to receive updates and alerts',
      step3Title: 'All Set!',
      step3Description: 'Your account is ready to use',
      consumerNumber: 'Consumer Number',
      consumerNumberPlaceholder: 'Enter your 12-digit consumer number',
      accountHolderName: 'Account Holder Name',
      accountHolderNamePlaceholder: 'As per your electricity bill',
      serviceAddress: 'Service Address',
      serviceAddressPlaceholder: 'Your registered electricity connection address',
      emailNotifications: 'Email Notifications',
      emailNotificationsDesc: 'Receive updates via email',
      smsNotifications: 'SMS Notifications',
      smsNotificationsDesc: 'Get alerts via text message',
      billReminders: 'Bill Payment Reminders',
      billRemindersDesc: 'Remind me before bill due dates',
      outageAlerts: 'Power Outage Alerts',
      outageAlertsDesc: 'Notify me about scheduled maintenance',
      next: 'Continue',
      back: 'Back',
      skip: 'Skip for now',
      finish: 'Go to Dashboard',
      stepOf: 'Step {{current}} of {{total}}',
      welcomeMessage: 'Welcome to Mahavitaran!',
      readyMessage: 'Your account is configured and ready to use. You can now access your dashboard, view bills, and manage your electricity account.',
      addConsumerLater: 'You can add your consumer number later from your profile settings',
      requiredField: 'This field is required',
      invalidConsumerNumber: 'Please enter a valid 12-digit consumer number',
      setupSuccess: 'Setup completed successfully!'
    },
    mr: {
      title: 'आपले प्रोफाईल पूर्ण करा',
      subtitle: 'चला काही सोप्या चरणांमध्ये आपले खाते सेट करूया',
      step1Title: 'आपले ग्राहक खाते जोडा',
      step1Description: 'आपल्या बिल आणि वापराच्या माहितीसाठी आपला वीज ग्राहक क्रमांक जोडा',
      step2Title: 'सूचना प्राधान्ये',
      step2Description: 'आपल्याला अपडेट आणि अलर्ट कसे प्राप्त करायचे ते निवडा',
      step3Title: 'सर्व तयार!',
      step3Description: 'आपले खाते वापरण्यासाठी तयार आहे',
      consumerNumber: 'ग्राहक क्रमांक',
      consumerNumberPlaceholder: 'आपला 12-अंकी ग्राहक क्रमांक प्रविष्ट करा',
      accountHolderName: 'खातेधारकाचे नाव',
      accountHolderNamePlaceholder: 'आपल्या वीज बिलानुसार',
      serviceAddress: 'सेवा पत्ता',
      serviceAddressPlaceholder: 'आपला नोंदणीकृत वीज कनेक्शन पत्ता',
      emailNotifications: 'ईमेल सूचना',
      emailNotificationsDesc: 'ईमेलद्वारे अपडेट प्राप्त करा',
      smsNotifications: 'SMS सूचना',
      smsNotificationsDesc: 'मजकूर संदेशाद्वारे अलर्ट मिळवा',
      billReminders: 'बिल भरणा आठवण',
      billRemindersDesc: 'बिल देय तारखेपूर्वी मला आठवण करा',
      outageAlerts: 'वीज खंडित अलर्ट',
      outageAlertsDesc: 'नियोजित देखभालीबद्दल मला सूचित करा',
      next: 'पुढे',
      back: 'मागे',
      skip: 'आत्तासाठी वगळा',
      finish: 'डॅशबोर्डवर जा',
      stepOf: 'चरण {{current}} पैकी {{total}}',
      welcomeMessage: 'महावितरणमध्ये आपले स्वागत आहे!',
      readyMessage: 'आपले खाते कॉन्फिगर केले आहे आणि वापरण्यासाठी तयार आहे. आपण आता आपला डॅशबोर्ड ऍक्सेस करू शकता, बिले पाहू शकता आणि आपले वीज खाते व्यवस्थापित करू शकता.',
      addConsumerLater: 'आपण आपल्या प्रोफाईल सेटिंग्जमधून नंतर आपला ग्राहक क्रमांक जोडू शकता',
      requiredField: 'हे फील्ड आवश्यक आहे',
      invalidConsumerNumber: 'कृपया वैध 12-अंकी ग्राहक क्रमांक प्रविष्ट करा',
      setupSuccess: 'सेटअप यशस्वीरित्या पूर्ण झाले!'
    }
  };

  const t = content[language];

  const validateStep1 = () => {
    if (!consumerNumber || !consumerName || !consumerAddress) {
      toast.error(t.requiredField);
      return false;
    }
    if (!/^\d{12}$/.test(consumerNumber)) {
      toast.error(t.invalidConsumerNumber);
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      
      setIsSubmitting(true);
      try {
        await addConsumerNumber(userId, {
          consumer_number: consumerNumber,
          consumer_name: consumerName,
          service_address: consumerAddress
        });
        setCurrentStep(2);
      } catch (error) {
        toast.error('Failed to add consumer account');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentStep === 2) {
      // Save preferences (can be extended to save to database)
      setCurrentStep(3);
    }
  };

  const handleSkip = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    toast.success(t.setupSuccess);
    onSetupComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-2xl">
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
              </div>
            </div>
            <h1 className="text-foreground mb-2">{t.title}</h1>
            <p className="text-muted-foreground mb-6">{t.subtitle}</p>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {t.stepOf.replace('{{current}}', currentStep.toString()).replace('{{total}}', totalSteps.toString())}
              </p>
            </div>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card border-primary/20 shadow-2xl">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <CreditCard className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-foreground">{t.step1Title}</CardTitle>
                    <CardDescription>{t.step1Description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="consumerNumber">{t.consumerNumber} *</Label>
                        <Input
                          id="consumerNumber"
                          placeholder={t.consumerNumberPlaceholder}
                          value={consumerNumber}
                          onChange={(e) => setConsumerNumber(e.target.value)}
                          maxLength={12}
                          className="bg-background/80 border-2 border-secondary/20 focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consumerName">{t.accountHolderName} *</Label>
                        <Input
                          id="consumerName"
                          placeholder={t.accountHolderNamePlaceholder}
                          value={consumerName}
                          onChange={(e) => setConsumerName(e.target.value)}
                          className="bg-background/80 border-2 border-secondary/20 focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consumerAddress">{t.serviceAddress} *</Label>
                        <Input
                          id="consumerAddress"
                          placeholder={t.serviceAddressPlaceholder}
                          value={consumerAddress}
                          onChange={(e) => setConsumerAddress(e.target.value)}
                          className="bg-background/80 border-2 border-secondary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <Alert className="border-2 border-primary/20 bg-primary/5">
                      <Info className="w-4 h-4 text-primary" />
                      <AlertDescription className="text-sm text-foreground">
                        {t.addConsumerLater}
                      </AlertDescription>
                    </Alert>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleSkip}
                        variant="outline"
                        className="flex-1 border-2 border-secondary/30 hover:bg-secondary/5"
                      >
                        {t.skip}
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="flex-1 bg-secondary hover:bg-secondary/90 text-white border-2 border-primary"
                      >
                        <span className="font-semibold">{t.next}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card border-primary/20 shadow-2xl">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-accent/10 rounded-full">
                        <Bell className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <CardTitle className="text-foreground">{t.step2Title}</CardTitle>
                    <CardDescription>{t.step2Description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {/* Email Notifications */}
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border-2 border-secondary/10">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">{t.emailNotifications}</p>
                            <p className="text-sm text-muted-foreground">{t.emailNotificationsDesc}</p>
                          </div>
                        </div>
                        <Switch
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>

                      {/* SMS Notifications */}
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border-2 border-secondary/10">
                        <div className="flex items-start gap-3">
                          <Smartphone className="w-5 h-5 text-accent mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">{t.smsNotifications}</p>
                            <p className="text-sm text-muted-foreground">{t.smsNotificationsDesc}</p>
                          </div>
                        </div>
                        <Switch
                          checked={smsNotifications}
                          onCheckedChange={setSmsNotifications}
                        />
                      </div>

                      {/* Bill Reminders */}
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border-2 border-secondary/10">
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">{t.billReminders}</p>
                            <p className="text-sm text-muted-foreground">{t.billRemindersDesc}</p>
                          </div>
                        </div>
                        <Switch
                          checked={billReminders}
                          onCheckedChange={setBillReminders}
                        />
                      </div>

                      {/* Outage Alerts */}
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border-2 border-secondary/10">
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-accent mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">{t.outageAlerts}</p>
                            <p className="text-sm text-muted-foreground">{t.outageAlertsDesc}</p>
                          </div>
                        </div>
                        <Switch
                          checked={outageAlerts}
                          onCheckedChange={setOutageAlerts}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="border-2 border-secondary/30 hover:bg-secondary/5"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t.back}
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="flex-1 bg-secondary hover:bg-secondary/90 text-white border-2 border-primary"
                      >
                        <span className="font-semibold">{t.next}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card border-primary/20 shadow-2xl">
                  <CardHeader className="text-center pb-6 pt-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2 
                      }}
                      className="flex justify-center mb-6"
                    >
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 bg-green-500/30 blur-2xl rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="relative bg-green-500 p-6 rounded-full">
                          <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <CardTitle className="text-3xl mb-3 text-foreground">
                        {t.welcomeMessage}
                      </CardTitle>
                      <CardDescription className="text-lg text-muted-foreground">
                        {t.step3Description}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="pb-12 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <Alert className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <AlertDescription className="text-foreground">
                          {t.readyMessage}
                        </AlertDescription>
                      </Alert>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <Button
                        onClick={handleFinish}
                        className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white shadow-lg border-2 border-primary"
                        size="lg"
                      >
                        <span className="font-semibold">{t.finish}</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
