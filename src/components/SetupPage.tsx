import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { useLanguage } from './LanguageContext';
import { 
  Zap,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Copy,
  Check,
  ChevronRight,
  Power
} from 'lucide-react';
import { initializeSeedData } from '../utils/seedData';
import { toast } from 'sonner';

interface SetupPageProps {
  onPageChange: (page: string) => void;
}

export function SetupPage({ onPageChange }: SetupPageProps) {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'welcome' | 'seeding' | 'complete'>('welcome');
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleSeedData = async () => {
    setCurrentStep('seeding');
    setIsSeeding(true);
    setSeedResult(null);
    setProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const result = await initializeSeedData();
      clearInterval(progressInterval);
      setProgress(100);
      setSeedResult(result);
      
      setTimeout(() => {
        setCurrentStep('complete');
        toast.success(language === 'mr' ? 'सेटअप पूर्ण झाले!' : 'Setup Complete!');
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Seed error:', error);
      toast.error(language === 'mr' ? 'सेटअप अयशस्वी' : 'Setup Failed');
      setSeedResult({ error: true });
      setCurrentStep('welcome');
    } finally {
      setIsSeeding(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(language === 'mr' ? 'कॉपी केले!' : 'Copied!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const content = {
    en: {
      welcomeTitle: "Welcome to Mahavitaran",
      welcomeSubtitle: "Let's set up your account in just a few moments",
      setupTitle: "Account Setup",
      setupDescription: "We're preparing your personalized dashboard",
      completeTitle: "You're All Set!",
      completeDescription: "Your account has been configured successfully",
      getStarted: "Get Started",
      settingUp: "Setting Up",
      features: {
        demo: "Demo account with sample data",
        instant: "Instant access to all features",
        secure: "Secure authentication system"
      },
      credentials: "Your Login Credentials",
      email: "Email Address",
      password: "Password",
      goToDashboard: "Go to Dashboard",
      viewHomePage: "View Home Page",
      setupNote: "Save these credentials to access your account"
    },
    mr: {
      welcomeTitle: "महावितरणमध्ये आपले स्वागत आहे",
      welcomeSubtitle: "चला काही क्षणात आपले खाते सेट करूया",
      setupTitle: "खाते सेटअप",
      setupDescription: "आम्ही आपला वैयक्तिक डॅशबोर्ड तयार करत आहोत",
      completeTitle: "आपण तयार आहात!",
      completeDescription: "आपले खाते यशस्वीरित्या कॉन्फिगर केले गेले आहे",
      getStarted: "सुरुवात करा",
      settingUp: "सेट करत आहे",
      features: {
        demo: "नमुना डेटासह डेमो खाते",
        instant: "सर्व वैशिष्ट्यांमध्ये त्वरित प्रवेश",
        secure: "सुरक्षित प्रमाणीकरण प्रणाली"
      },
      credentials: "आपली लॉगिन माहिती",
      email: "ईमेल पत्ता",
      password: "पासवर्ड",
      goToDashboard: "डॅशबोर्डवर जा",
      viewHomePage: "मुख्य पृष्ठ पहा",
      setupNote: "आपल्या खात्यात प्रवेश करण्यासाठी ही माहिती जतन करा"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 relative overflow-hidden">
      {/* Animated Background Elements */}
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
          <AnimatePresence mode="wait">
            {currentStep === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass-card border-primary/20 shadow-2xl">
                  {/* Header with Logo */}
                  <CardHeader className="text-center pb-8 pt-12">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex justify-center mb-6"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                        <div className="relative bg-gradient-to-br from-primary to-accent p-6 rounded-2xl">
                          <Zap className="w-12 h-12 text-secondary" />
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <CardTitle className="text-3xl mb-3 text-foreground">
                        {t.welcomeTitle}
                      </CardTitle>
                      <CardDescription className="text-lg text-muted-foreground">
                        {t.welcomeSubtitle}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="pb-12">
                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="space-y-4 mb-8"
                    >
                      {[
                        { icon: Shield, text: t.features.demo, color: 'text-primary' },
                        { icon: Sparkles, text: t.features.instant, color: 'text-accent' },
                        { icon: Clock, text: t.features.secure, color: 'text-primary' }
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all shadow-sm hover:shadow-md"
                        >
                          <div className={`${feature.color} p-2 rounded-lg bg-secondary/10 border border-primary/20`}>
                            <feature.icon className="w-5 h-5" />
                          </div>
                          <p className="text-foreground font-medium">{feature.text}</p>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <Button
                        onClick={handleSeedData}
                        disabled={isSeeding}
                        className="w-full h-14 bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary"
                        size="lg"
                      >
                        <span className="font-semibold">{t.getStarted}</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>

                    {/* Quick Navigation */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="mt-6 text-center"
                    >
                      <button
                        onClick={() => onPageChange('landing')}
                        className="text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline"
                      >
                        {t.viewHomePage}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'seeding' && (
              <motion.div
                key="seeding"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass-card border-primary/20 shadow-2xl">
                  <CardContent className="py-16 px-8">
                    <div className="text-center space-y-8">
                      {/* Animated Loader */}
                      <motion.div
                        className="flex justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
                          <Power className="w-16 h-16 text-primary relative" />
                        </div>
                      </motion.div>

                      {/* Status */}
                      <div>
                        <h3 className="mb-2 text-foreground">{t.setupTitle}</h3>
                        <p className="text-muted-foreground">{t.setupDescription}</p>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-3">
                        <Progress value={progress} className="h-2" />
                        <p className="text-sm text-muted-foreground">{progress}%</p>
                      </div>

                      {/* Loading Steps */}
                      <div className="flex justify-center gap-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'complete' && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass-card border-primary/20 shadow-2xl">
                  <CardHeader className="text-center pb-6 pt-12">
                    {/* Success Icon */}
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
                        {t.completeTitle}
                      </CardTitle>
                      <CardDescription className="text-lg text-muted-foreground">
                        {t.completeDescription}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="pb-12 space-y-8">
                    {/* Credentials Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                        <p className="text-sm text-muted-foreground">{t.credentials}</p>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                      </div>

                      <Alert className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5 shadow-sm">
                        <AlertDescription>
                          <div className="space-y-4">
                            {/* Email */}
                            <div className="space-y-2">
                              <label className="text-sm text-muted-foreground">
                                {t.email}
                              </label>
                              <div className="flex items-center gap-2 p-3 bg-background/80 rounded-lg border-2 border-secondary/20 shadow-sm">
                                <code className="flex-1 text-foreground font-medium">demo@mahavitaran.com</code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard('demo@mahavitaran.com', 'email')}
                                  className="h-8 w-8 p-0 hover:bg-secondary/10"
                                >
                                  {copiedField === 'email' ? (
                                    <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-secondary dark:text-foreground" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                              <label className="text-sm text-muted-foreground">
                                {t.password}
                              </label>
                              <div className="flex items-center gap-2 p-3 bg-background/80 rounded-lg border-2 border-secondary/20 shadow-sm">
                                <code className="flex-1 text-foreground font-medium">demo123456</code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard('demo123456', 'password')}
                                  className="h-8 w-8 p-0 hover:bg-secondary/10"
                                >
                                  {copiedField === 'password' ? (
                                    <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-secondary dark:text-foreground" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            {/* Note */}
                            <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg border-2 border-yellow-400/40 dark:border-yellow-500/20">
                              <Sparkles className="w-4 h-4 text-yellow-700 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-yellow-900 dark:text-yellow-200 font-medium">
                                {t.setupNote}
                              </p>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="space-y-3"
                    >
                      <Button
                        onClick={() => onPageChange('login')}
                        className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white shadow-lg border-2 border-primary"
                        size="lg"
                      >
                        <span className="font-semibold">{t.goToDashboard}</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>

                      <Button
                        onClick={() => onPageChange('landing')}
                        variant="outline"
                        className="w-full h-12 border-2 border-secondary bg-white dark:bg-transparent hover:bg-secondary/5 text-secondary dark:text-foreground hover:text-secondary dark:hover:text-foreground font-semibold"
                        size="lg"
                      >
                        {t.viewHomePage}
                      </Button>
                    </motion.div>

                    {/* Stats */}
                    {seedResult && !seedResult.error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="flex justify-center gap-4"
                      >
                        <Badge variant="secondary" className="px-4 py-2 bg-primary/20 text-secondary dark:text-primary border-2 border-primary/40 font-medium shadow-sm">
                          <CheckCircle2 className="w-3 h-3 mr-2" />
                          {seedResult.announcements} {language === 'mr' ? 'घोषणा' : 'Announcements'}
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-2 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-2 border-green-400/40 dark:border-green-500/20 font-medium shadow-sm">
                          <CheckCircle2 className="w-3 h-3 mr-2" />
                          {language === 'mr' ? '1 वापरकर्ता' : '1 User'}
                        </Badge>
                      </motion.div>
                    )}
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
