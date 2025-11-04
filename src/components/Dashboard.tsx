import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from './LanguageContext';
import { 
  mockConsumers, 
  mockUsageData, 
  mockUsageDataMarathi, 
  mockUserProfile,
  mockAnnouncements
} from './mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  Download, 
  CreditCard, 
  FileText, 
  Camera,
  Eye,
  User,
  MapPin,
  Calendar,
  Zap,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
  BarChart3,
  PieChart,
  Leaf,
  DollarSign,
  Clock,
  Lightbulb,
  Sun,
  Settings,
  Plus,
  Megaphone,
  Bell,
  Info,
  AlertTriangle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

interface DashboardProps {
  isLoggedIn: boolean;
  onPageChange?: (page: string) => void;
}

export function Dashboard({ isLoggedIn, onPageChange }: DashboardProps) {
  const { language, t } = useLanguage();
  const [searchConsumerNumber, setSearchConsumerNumber] = useState('');
  const [searchedConsumer, setSearchedConsumer] = useState(null);
  const [selectedConsumer, setSelectedConsumer] = useState(mockConsumers?.[0] || {
    consumerNumber: "MH123456789",
    name: "Rajesh Kumar Sharma",
    address: "123, Gandhi Nagar, Pune - 411001",
    category: "Residential",
    status: "Active",
    currentBill: {
      units: 285,
      amount: 2850,
      dueDate: "25 Oct 2025"
    }
  });
  const [showAddConsumer, setShowAddConsumer] = useState(false);
  const [newConsumerNumber, setNewConsumerNumber] = useState('');

  const usageData = language === 'mr' ? mockUsageDataMarathi : mockUsageData;
  
  // Simple mock detailed stats
  const detailedStats = {
    currentMonth: {
      units: 285,
      amount: 2850,
      month: language === 'mr' ? 'ऑक्टोबर २०२५' : 'October 2025',
      daysInMonth: 31,
      averagePerDay: 9.2
    },
    previousMonth: {
      units: 298,
      amount: 2980,
      month: language === 'mr' ? 'सप्टेंबर २०२५' : 'September 2025',
      averagePerDay: 9.9
    },
    comparison: {
      unitsChange: -13,
      amountChange: -130,
      percentageChange: -4.4,
      trend: 'down' as const
    },
    yearToDate: {
      totalUnits: 1773,
      totalAmount: 17730,
      averageMonthly: 295.5,
      monthsCounted: 6
    },
    efficiency: {
      costPerUnit: 10.0,
      peakUsageHour: language === 'mr' ? 'संध्याकाळी ७:०० - १०:००' : '7:00 PM - 10:00 PM',
      lowestUsageDay: language === 'mr' ? 'रविवार' : 'Sunday',
      highestUsageDay: language === 'mr' ? 'सोमवार' : 'Monday',
      averageDaily: 9.2
    },
    breakdown: {
      fixedCharges: 150,
      energyCharges: 2400,
      taxes: 240,
      subsidies: -60
    },
    environmental: {
      carbonFootprint: 142.5,
      treesEquivalent: 6.5,
      solarPanelsEquivalent: 2.3
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSearch = () => {
    if (searchConsumerNumber.trim()) {
      const found = mockConsumers.find(c => c.consumerNumber === searchConsumerNumber.trim());
      setSearchedConsumer(found || null);
    }
  };

  const handleAddConsumer = () => {
    if (newConsumerNumber.trim()) {
      // In a real app, this would validate and add the consumer
      console.log('Adding consumer:', newConsumerNumber);
      setNewConsumerNumber('');
      setShowAddConsumer(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <Card className="glass-card max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-4">
              {language === 'mr' ? 'कृपया लॉगिन करा' : 'Please Login'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'mr' 
                ? 'डॅशबोर्ड पाहण्यासाठी तुम्हाला लॉगिन करावे लागेल'
                : 'You need to login to access the dashboard'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 gradient-text">
            {language === 'mr' ? 'डॅशबोर्ड' : 'Dashboard'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            {language === 'mr' 
              ? `स्वागत आहे, ${mockUserProfile.name}` 
              : `Welcome, ${mockUserProfile.name}`
            }
          </p>
        </motion.div>

        {/* Consumer Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="flex items-center text-base sm:text-lg">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  {language === 'mr' ? 'ग्राहक निवड' : 'Consumer Selection'}
                </span>
                <Dialog open={showAddConsumer} onOpenChange={setShowAddConsumer}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      {language === 'mr' ? '+ नवीन ग्राहक' : '+ Add Consumer'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {language === 'mr' ? 'नवीन ग्राहक जोडा' : 'Add New Consumer'}
                      </DialogTitle>
                      <DialogDescription>
                        {language === 'mr' 
                          ? 'आपला नवीन ग्राहक क्रमांक प्रविष्ट करा'
                          : 'Enter your new consumer number'
                        }
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="newConsumer">
                          {language === 'mr' ? 'ग्राहक क्रमांक' : 'Consumer Number'}
                        </Label>
                        <Input
                          id="newConsumer"
                          value={newConsumerNumber}
                          onChange={(e) => setNewConsumerNumber(e.target.value)}
                          placeholder="123456789012"
                        />
                      </div>
                      <Button onClick={handleAddConsumer} className="w-full">
                        {language === 'mr' ? 'जोडा' : 'Add Consumer'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="consumerSelect">
                    {language === 'mr' ? 'ग्राहक निवडा' : 'Select Consumer'}
                  </Label>
                  <Select 
                    value={selectedConsumer?.consumerNumber || ''} 
                    onValueChange={(value) => {
                      const consumer = mockConsumers.find(c => c.consumerNumber === value);
                      if (consumer) setSelectedConsumer(consumer);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(mockConsumers || []).map((consumer) => (
                        <SelectItem key={consumer.consumerNumber} value={consumer.consumerNumber}>
                          {consumer.consumerNumber} - {consumer.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Consumer */}
                <div className="space-y-2">
                  <Label htmlFor="search">
                    {language === 'mr' ? 'ग्राहक शोधा' : 'Search Consumer'}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="search"
                      value={searchConsumerNumber}
                      onChange={(e) => setSearchConsumerNumber(e.target.value)}
                      placeholder={t.searchPlaceholder}
                    />
                    <Button onClick={handleSearch} size="icon">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  {searchedConsumer && (
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center text-green-700 dark:text-green-300">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          {language === 'mr' ? 'ग्राहक सापडला' : 'Consumer Found'}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        {searchedConsumer.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Consumer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-6 h-6 mr-2" />
                {language === 'mr' ? 'सध्याचा ग्राहक' : 'Current Consumer'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    {language === 'mr' ? 'ग्राहक क्रमांक' : 'Consumer Number'}
                  </Label>
                  <p className="text-lg font-semibold">{selectedConsumer?.consumerNumber || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    {language === 'mr' ? 'पत्ता' : 'Address'}
                  </Label>
                  <p className="text-lg">{selectedConsumer?.address || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    {language === 'mr' ? 'प्रकार' : 'Category'}
                  </Label>
                  <Badge variant="secondary">{selectedConsumer?.category || 'N/A'}</Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    {language === 'mr' ? 'स्थिती' : 'Status'}
                  </Label>
                  <Badge variant={selectedConsumer?.status === 'Active' ? 'default' : 'destructive'}>
                    {selectedConsumer?.status || 'N/A'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Bill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="flex items-center text-base sm:text-lg">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  {language === 'mr' ? 'सध्याचे बिल' : 'Current Bill'}
                </span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                        <Eye className="w-4 h-4 mr-2" />
                        {language === 'mr' ? 'बिल पहा' : 'View Bill'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {language === 'mr' ? 'बिल तपशील' : 'Bill Details'}
                        </DialogTitle>
                        <DialogDescription>
                          {language === 'mr' ? 'आपल्या वीज बिलाचे संपूर्ण तपशील पहा' : 'View complete details of your electricity bill'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label>{language === 'mr' ? '��िल क्रमांक' : 'Bill Number'}</Label>
                            <p className="font-mono">BILL/2024/001234</p>
                          </div>
                          <div>
                            <Label>{language === 'mr' ? 'बिल दिनांक' : 'Bill Date'}</Label>
                            <p>15 Jan 2024</p>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span>{language === 'mr' ? 'ऊर्जा शुल्क' : 'Energy Charges'}</span>
                            <span>₹850</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{language === 'mr' ? 'निश्चित शुल्क' : 'Fixed Charges'}</span>
                            <span>₹120</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{language === 'mr' ? 'कर' : 'Taxes'}</span>
                            <span>₹97</span>
                          </div>
                          <hr />
                          <div className="flex justify-between font-bold">
                            <span>{language === 'mr' ? 'एकूण' : 'Total'}</span>
                            <span>₹1,067</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        {language === 'mr' ? 'मीटर रीडिंग' : 'Meter Reading'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          {language === 'mr' ? 'मीटर रीडिंग तपशील' : 'Meter Reading Details'}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          {language === 'mr' 
                            ? 'आपल्या मीटर रीडिंगचे छायाचित्र आणि गणना केलेली युनिट्स'
                            : 'Your meter reading photo and calculated units'
                          }
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 px-2">
                        {/* Meter Photo */}
                        <div className="space-y-3">
                          <Label className="text-primary flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            {language === 'mr' ? 'मीटर छायाचित्र' : 'Meter Photo'}
                          </Label>
                          <div className="glass-card p-3 sm:p-4 rounded-lg flex flex-col items-center">
                            <ImageWithFallback
                              src={selectedConsumer?.meterImage || ''}
                              alt="Meter Reading"
                              className="w-full max-w-md h-auto aspect-video object-contain rounded"
                            />
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {language === 'mr' ? 'फोटो तारीख: ' : 'Photo Date: '}
                              {selectedConsumer?.meterReadingDate 
                                ? new Date(selectedConsumer.meterReadingDate).toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-IN')
                                : 'N/A'
                              }
                            </span>
                          </div>
                        </div>

                        <Separator />

                        {/* Calculated Readings */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Card className="glass-card border-2 border-primary/20">
                            <CardContent className="pt-6 pb-6">
                              <div className="text-center space-y-3">
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                                  <p className="text-sm text-muted-foreground">
                                    {language === 'mr' ? 'मागील रीडिंग' : 'Previous Reading'}
                                  </p>
                                </div>
                                <p className="text-3xl sm:text-4xl font-bold text-primary">
                                  {selectedConsumer?.lastReading?.toLocaleString() || '0'}
                                </p>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                  {language === 'mr' ? 'युनिट्स' : 'Units'}
                                </p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="glass-card border-2 border-accent/20">
                            <CardContent className="pt-6 pb-6">
                              <div className="text-center space-y-3">
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                                  <p className="text-sm text-muted-foreground">
                                    {language === 'mr' ? 'सध्याची रीडिंग' : 'Current Reading'}
                                  </p>
                                </div>
                                <p className="text-3xl sm:text-4xl font-bold text-accent">
                                  {selectedConsumer?.currentReading?.toLocaleString() || '0'}
                                </p>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                  {language === 'mr' ? 'युनिट्स' : 'Units'}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Calculated Usage */}
                        <Card className="glass-card bg-gradient-to-br from-primary/10 via-accent/5 to-accent/10 border-2 border-primary/30">
                          <CardContent className="pt-6 pb-6">
                            <div className="text-center space-y-3">
                              <div className="flex items-center justify-center gap-2">
                                <Zap className="w-5 h-5 text-primary animate-pulse" />
                                <p className="text-base text-muted-foreground">
                                  {language === 'mr' ? 'गणना केलेली वापर' : 'Calculated Usage'}
                                </p>
                              </div>
                              <p className="text-4xl sm:text-5xl font-bold text-primary">
                                {selectedConsumer?.unitsConsumed?.toLocaleString() || '0'}
                              </p>
                              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                                {language === 'mr' ? 'युनिट्स (kWh)' : 'Units (kWh)'}
                              </p>
                              <div className="pt-3 pb-2">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                                  <p className="text-xs sm:text-sm text-foreground">
                                    {language === 'mr' 
                                      ? `${selectedConsumer?.currentReading?.toLocaleString()} - ${selectedConsumer?.lastReading?.toLocaleString()} = ${selectedConsumer?.unitsConsumed?.toLocaleString()} युनिट्स`
                                      : `${selectedConsumer?.currentReading?.toLocaleString()} - ${selectedConsumer?.lastReading?.toLocaleString()} = ${selectedConsumer?.unitsConsumed?.toLocaleString()} units`
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <motion.div 
                  className="text-center p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-xl border border-yellow-200 dark:border-yellow-800"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    {selectedConsumer?.currentBill?.units || 0} {t.units}
                  </div>
                  <div className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                    {language === 'mr' ? 'या महिन्याचा वापर' : 'This Month Usage'}
                  </div>
                </motion.div>

                <motion.div 
                  className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl border border-green-200 dark:border-green-800"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {formatCurrency(selectedConsumer?.currentBill?.amount || 0)}
                  </div>
                  <div className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                    {language === 'mr' ? 'या महिन्याचे बिल' : 'This Month Bill'}
                  </div>
                </motion.div>

                <motion.div 
                  className="text-center p-4 sm:p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-xl border border-red-200 dark:border-red-800 sm:col-span-2 md:col-span-1"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {selectedConsumer?.currentBill?.dueDate || 'N/A'}
                  </div>
                  <div className="text-xs sm:text-sm text-red-700 dark:text-red-300 mb-3">
                    {language === 'mr' ? 'शेवटची तारीख' : 'Due Date'}
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => onPageChange?.('payment')}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    {t.payBill}
                  </Button>
                </motion.div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline" size="lg">
                  <Download className="w-6 h-6 mr-2" />
                  {t.downloadBill}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Statistics with Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="glass-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center text-lg sm:text-xl">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                {language === 'mr' ? 'वापर आकडेवारी' : 'Usage Statistics'}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {language === 'mr' ? 'गेल्या 6 महिन्यांचा वापर ट्रेंड' : 'Last 6 Months Usage Trends'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8">
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Bar Chart - Monthly Units */}
                <div className="h-64 sm:h-80">
                  <h4 className="text-sm sm:text-base font-medium mb-3 sm:mb-4 text-center">
                    {language === 'mr' ? 'मासिक युनिट्स वापर' : 'Monthly Units Consumption'}
                  </h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="var(--color-muted-foreground)"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="var(--color-muted-foreground)"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                      <Bar 
                        dataKey="units" 
                        fill="var(--color-energy-blue)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Line Chart - Monthly Bill Amount */}
                <div className="h-64 sm:h-80">
                  <h4 className="text-sm sm:text-base font-medium mb-3 sm:mb-4 text-center">
                    {language === 'mr' ? 'मासिक बिल रक्कम' : 'Monthly Bill Amount'}
                  </h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="var(--color-muted-foreground)"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="var(--color-muted-foreground)"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="var(--color-energy-lime)"
                        strokeWidth={3}
                        dot={{ fill: 'var(--color-energy-lime)', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Comparison Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="glass-card border-2 border-primary/20">
                  <CardHeader className="text-center pb-3">
                    <CardTitle className="flex items-center justify-center text-base sm:text-lg">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      {language === 'mr' ? 'चालू महिना' : 'Current Month'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">
                        {usageData[usageData.length - 1]?.units || 0} {t.units}
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-primary">
                        {formatCurrency(usageData[usageData.length - 1]?.amount || 0)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {usageData[usageData.length - 1]?.month}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-2 border-muted/50">
                  <CardHeader className="text-center pb-3">
                    <CardTitle className="flex items-center justify-center text-base sm:text-lg">
                      <Calendar className="w-5 h-5 mr-2" />
                      {language === 'mr' ? 'मागील महिना' : 'Previous Month'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-2xl sm:text-3xl font-bold text-muted-foreground">
                        {usageData[usageData.length - 2]?.units || 0} {t.units}
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-muted-foreground">
                        {formatCurrency(usageData[usageData.length - 2]?.amount || 0)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {usageData[usageData.length - 2]?.month}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-2 border-green-200 dark:border-green-800 sm:col-span-2 md:col-span-1">
                  <CardHeader className="text-center pb-3">
                    <CardTitle className="flex items-center justify-center text-base sm:text-lg">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      {language === 'mr' ? 'बदल' : 'Change'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center">
                        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2" />
                        <span className="text-xl sm:text-2xl font-bold text-green-600">
                          {(((usageData[usageData.length - 2]?.units - usageData[usageData.length - 1]?.units) / usageData[usageData.length - 2]?.units) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-medium text-green-600">
                        {(usageData[usageData.length - 2]?.units - usageData[usageData.length - 1]?.units) || 0} {t.units}
                      </div>
                      <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700">
                        {language === 'mr' ? 'कमी वापर' : 'Reduced Usage'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Energy Saving Tips & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Energy Saving Tips */}
          <Card className="glass-card border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center text-base sm:text-lg text-green-700 dark:text-green-400">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                {language === 'mr' ? 'ऊर्जा बचत टिप्स' : 'Energy Saving Tips'}
              </CardTitle>
              <CardDescription className="text-sm">
                {language === 'mr' ? 'आपले बिल कमी करण्यासाठी या सल्ल्यांचे पालन करा' : 'Follow these tips to reduce your bill'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {language === 'mr' ? 'LED बल्ब वापरा' : 'Use LED Bulbs'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'mr' ? '80% पर्यंत ऊर्जा बचत' : 'Save up to 80% energy'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                  <Sun className="w-4 h-4 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {language === 'mr' ? 'AC तापमान 24°C ठेवा' : 'Set AC to 24°C'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'mr' ? '30% कूलिंग खर्च कमी करा' : 'Reduce cooling costs by 30%'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center flex-shrink-0">
                  <Settings className="w-4 h-4 text-yellow-700 dark:text-yellow-300" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {language === 'mr' ? 'न वापरलेली उपकरणे बंद करा' : 'Unplug Unused Devices'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'mr' ? 'स्टँडबाय पॉवर वाया होणे टाळा' : 'Avoid standby power waste'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                {language === 'mr' ? 'द्रुत क्रिया' : 'Quick Actions'}
              </CardTitle>
              <CardDescription className="text-sm">
                {language === 'mr' ? 'सामान्य सेवा आणि विनंत्या' : 'Common services and requests'}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
                onClick={() => onPageChange?.('services')}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">{language === 'mr' ? 'पुरवठा तक्रार' : 'Report Outage'}</p>
                    <p className="text-xs text-muted-foreground">{language === 'mr' ? 'वीज खंडित झाल्याची तक्रार नोंदवा' : 'Report power interruption'}</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
                onClick={() => onPageChange?.('services')}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">{language === 'mr' ? 'नवीन कनेक्शन' : 'New Connection'}</p>
                    <p className="text-xs text-muted-foreground">{language === 'mr' ? 'नवीन विद्युत कनेक्शनसाठी अर्ज करा' : 'Apply for new electricity connection'}</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
                onClick={() => onPageChange?.('payment')}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">{language === 'mr' ? 'बिल भरा' : 'Pay Bill'}</p>
                    <p className="text-xs text-muted-foreground">{language === 'mr' ? 'ऑनलाइन बिल भरा' : 'Make online payment'}</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Announcements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="glass-card border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary" />
                {language === 'mr' ? 'घोषणा' : 'Announcements'}
              </CardTitle>
              <CardDescription>
                {language === 'mr' ? 'महत्त्वाच्या अपडेट्स आणि सूचना' : 'Important updates and notifications'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnnouncements.map((announcement, index) => {
                  const typeIcons = {
                    info: Info,
                    warning: AlertTriangle,
                    maintenance: Settings,
                    important: Bell
                  };
                  const typeColors = {
                    info: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
                    warning: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800',
                    maintenance: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
                    important: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800'
                  };
                  const Icon = typeIcons[announcement.type];
                  const colorClass = typeColors[announcement.type];

                  return (
                    <motion.div
                      key={announcement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 ${colorClass} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-medium">
                              {language === 'mr' ? announcement.titleMr : announcement.title}
                            </h4>
                            {announcement.priority === 'high' && (
                              <Badge variant="destructive" className="flex-shrink-0 text-xs">
                                {language === 'mr' ? 'उच्च' : 'High'}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {language === 'mr' ? announcement.descriptionMr : announcement.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(announcement.date).toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}