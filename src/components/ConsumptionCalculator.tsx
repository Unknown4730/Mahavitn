import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from './LanguageContext';
import { 
  Calculator, 
  Zap, 
  Home, 
  Building2, 
  Factory, 
  TrendingUp,
  AlertCircle,
  IndianRupee,
  FileText,
  Download,
  Tv,
  AirVent,
  Refrigerator,
  Lightbulb,
  WashingMachine,
  Plus,
  Trash2,
  ArrowRight,
  Sun,
  Leaf,
  DollarSign,
  Award
} from 'lucide-react';

interface CalculationResult {
  totalUnits: number;
  energyCharges: number;
  fixedCharges: number;
  electricityDuty: number;
  taxes: number;
  totalAmount: number;
  tariffRate: number;
}

interface Appliance {
  id: string;
  name: string;
  nameMr: string;
  watts: number;
  hoursPerDay: number;
  quantity: number;
}

interface CommonAppliance {
  name: string;
  nameMr: string;
  watts: number;
  icon: any;
}

export function ConsumptionCalculator() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('solar');
  const [calculationMethod, setCalculationMethod] = useState<'units' | 'readings'>('readings');
  const [tariffType, setTariffType] = useState('residential');
  const [previousReading, setPreviousReading] = useState('');
  const [currentReading, setCurrentReading] = useState('');
  const [directUnits, setDirectUnits] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  // Appliance Calculator State
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [selectedAppliance, setSelectedAppliance] = useState('');
  const [customApplianceName, setCustomApplianceName] = useState('');
  const [customWattage, setCustomWattage] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [quantity, setQuantity] = useState('1');

  // Solar Calculator State
  const [solarRoofArea, setSolarRoofArea] = useState('');
  const [solarMonthlyBill, setSolarMonthlyBill] = useState('');
  const [solarSystemCapacity, setSolarSystemCapacity] = useState('');

  const commonAppliances: CommonAppliance[] = [
    { name: 'LED Bulb (10W)', nameMr: 'LED बल्ब (10W)', watts: 10, icon: Lightbulb },
    { name: 'CFL Bulb (20W)', nameMr: 'CFL बल्ब (20W)', watts: 20, icon: Lightbulb },
    { name: 'Tube Light (40W)', nameMr: 'ट्यूब लाइट (40W)', watts: 40, icon: Lightbulb },
    { name: 'Ceiling Fan (75W)', nameMr: 'सीलिंग फॅन (75W)', watts: 75, icon: AirVent },
    { name: 'Refrigerator (150W)', nameMr: 'रेफ्रिजरेटर (150W)', watts: 150, icon: Refrigerator },
    { name: 'TV - LED (80W)', nameMr: 'टीव्ही - LED (80W)', watts: 80, icon: Tv },
    { name: 'TV - LCD (120W)', nameMr: 'टीव्ही - LCD (120W)', watts: 120, icon: Tv },
    { name: 'Washing Machine (500W)', nameMr: 'वॉशिंग मशीन (500W)', watts: 500, icon: WashingMachine },
    { name: 'Air Conditioner 1 Ton (1000W)', nameMr: 'एअर कंडिशनर 1 टन (1000W)', watts: 1000, icon: AirVent },
    { name: 'Air Conditioner 1.5 Ton (1500W)', nameMr: 'एअर कंडिशनर 1.5 टन (1500W)', watts: 1500, icon: AirVent },
    { name: 'Water Heater/Geyser (2000W)', nameMr: 'वॉटर हीटर/गीझर (2000W)', watts: 2000, icon: Zap },
    { name: 'Microwave Oven (1200W)', nameMr: 'मायक्रोवेव्ह ओव्हन (1200W)', watts: 1200, icon: Zap },
    { name: 'Electric Iron (1000W)', nameMr: 'इलेक्ट्रिक इस्त्री (1000W)', watts: 1000, icon: Zap },
    { name: 'Desktop Computer (200W)', nameMr: 'डेस्कटॉप कॉम्प्युटर (200W)', watts: 200, icon: Tv },
    { name: 'Laptop (65W)', nameMr: 'लॅपटॉप (65W)', watts: 65, icon: Tv },
    { name: 'Water Pump (750W)', nameMr: 'वॉटर पंप (750W)', watts: 750, icon: Zap }
  ];

  const tariffRates = {
    residential: {
      rate: 10.0,
      fixedCharge: 120,
      name: language === 'mr' ? 'निवासी' : 'Residential'
    },
    commercial: {
      rate: 12.5,
      fixedCharge: 250,
      name: language === 'mr' ? 'व्यावसायिक' : 'Commercial'
    },
    industrial: {
      rate: 11.0,
      fixedCharge: 500,
      name: language === 'mr' ? 'औद्योगिक' : 'Industrial'
    },
    agricultural: {
      rate: 6.5,
      fixedCharge: 80,
      name: language === 'mr' ? 'कृषी' : 'Agricultural'
    }
  };

  const calculateBill = () => {
    let units = 0;

    if (calculationMethod === 'readings') {
      const prev = parseFloat(previousReading);
      const curr = parseFloat(currentReading);
      
      if (isNaN(prev) || isNaN(curr) || prev < 0 || curr < 0 || curr <= prev) {
        alert(language === 'mr' ? 'कृपया वैध रीडिंग प्रविष्ट करा' : 'Please enter valid readings');
        return;
      }
      units = curr - prev;
    } else {
      units = parseFloat(directUnits);
      if (isNaN(units) || units <= 0) {
        alert(language === 'mr' ? 'कृपया वैध युनिट्स प्रविष्ट करा' : 'Please enter valid units');
        return;
      }
    }

    const selectedTariff = tariffRates[tariffType as keyof typeof tariffRates];
    const energyCharges = units * selectedTariff.rate;
    const fixedCharges = selectedTariff.fixedCharge;
    const electricityDuty = energyCharges * 0.16; // 16% electricity duty
    const taxes = (energyCharges + fixedCharges + electricityDuty) * 0.05; // 5% GST
    const totalAmount = energyCharges + fixedCharges + electricityDuty + taxes;

    setResult({
      totalUnits: units,
      energyCharges,
      fixedCharges,
      electricityDuty,
      taxes,
      totalAmount,
      tariffRate: selectedTariff.rate
    });
  };

  const resetCalculator = () => {
    setPreviousReading('');
    setCurrentReading('');
    setDirectUnits('');
    setResult(null);
  };

  // Appliance Calculator Functions
  const addAppliance = () => {
    if (selectedAppliance === 'custom') {
      if (!customApplianceName || !customWattage || !hoursPerDay) {
        alert(language === 'mr' ? 'कृपया सर्व तपशील भरा' : 'Please fill all details');
        return;
      }
      
      const newAppliance: Appliance = {
        id: Date.now().toString(),
        name: customApplianceName,
        nameMr: customApplianceName,
        watts: parseFloat(customWattage),
        hoursPerDay: parseFloat(hoursPerDay),
        quantity: parseInt(quantity) || 1
      };
      
      setAppliances([...appliances, newAppliance]);
      setCustomApplianceName('');
      setCustomWattage('');
      setHoursPerDay('');
      setQuantity('1');
      setSelectedAppliance('');
    } else if (selectedAppliance) {
      const selected = commonAppliances.find(a => a.name === selectedAppliance);
      if (!selected || !hoursPerDay) {
        alert(language === 'mr' ? 'कृपया तास प्रविष्ट करा' : 'Please enter hours');
        return;
      }
      
      const newAppliance: Appliance = {
        id: Date.now().toString(),
        name: selected.name,
        nameMr: selected.nameMr,
        watts: selected.watts,
        hoursPerDay: parseFloat(hoursPerDay),
        quantity: parseInt(quantity) || 1
      };
      
      setAppliances([...appliances, newAppliance]);
      setHoursPerDay('');
      setQuantity('1');
      setSelectedAppliance('');
    }
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const calculateApplianceConsumption = () => {
    // Calculate daily consumption in kWh
    const dailyKWh = appliances.reduce((total, app) => {
      const appDaily = (app.watts * app.hoursPerDay * app.quantity) / 1000;
      return total + appDaily;
    }, 0);
    
    // Calculate monthly consumption
    const monthlyKWh = dailyKWh * 30;
    
    return {
      daily: dailyKWh,
      monthly: monthlyKWh,
      yearly: dailyKWh * 365
    };
  };

  const transferToMainCalculator = () => {
    const consumption = calculateApplianceConsumption();
    setDirectUnits(consumption.monthly.toFixed(2));
    setCalculationMethod('units');
    setActiveTab('bill');
  };

  const applianceConsumption = calculateApplianceConsumption();
  const selectedTariff = tariffRates[tariffType as keyof typeof tariffRates];

  // Solar Calculator Functions
  const calculateSolarSavings = () => {
    const bill = parseFloat(solarMonthlyBill);
    const area = parseFloat(solarRoofArea);
    const capacity = parseFloat(solarSystemCapacity);
    
    if (isNaN(bill) && isNaN(area) && isNaN(capacity)) return null;
    
    // Calculate based on available inputs
    let estimatedCapacity = capacity;
    if (!estimatedCapacity && area) {
      estimatedCapacity = area / 10; // Rough estimate: 1kW per 10 sq.m
    }
    if (!estimatedCapacity) return null;
    
    const annualGeneration = estimatedCapacity * 1500; // ~1500 units per kW per year
    const monthlyGeneration = annualGeneration / 12;
    const annualSavings = annualGeneration * 6; // Assuming ₹6 per unit
    const monthlySavings = annualSavings / 12;
    const systemCost = estimatedCapacity * 50000; // ₹50,000 per kW
    
    // Calculate subsidy (PM Surya Ghar scheme)
    let subsidy = 0;
    if (estimatedCapacity <= 3) {
      subsidy = estimatedCapacity * 30000; // ₹30,000 per kW for first 3 kW
    } else {
      subsidy = 90000 + (estimatedCapacity - 3) * 18000; // ₹90,000 for first 3kW + ₹18,000 per additional kW
    }
    subsidy = Math.min(subsidy, 78000); // Max ₹78,000
    
    const netCost = systemCost - subsidy;
    const paybackPeriod = netCost / annualSavings;
    const savings25Years = (annualSavings * 25) - netCost;
    const co2Saved = annualGeneration * 0.82; // 0.82 kg CO2 per kWh
    
    return {
      capacity: estimatedCapacity.toFixed(2),
      annualGeneration: annualGeneration.toFixed(0),
      monthlyGeneration: monthlyGeneration.toFixed(0),
      annualSavings: annualSavings.toFixed(0),
      monthlySavings: monthlySavings.toFixed(0),
      systemCost: systemCost.toFixed(0),
      subsidy: subsidy.toFixed(0),
      netCost: netCost.toFixed(0),
      paybackPeriod: paybackPeriod.toFixed(1),
      savings25Years: savings25Years.toFixed(0),
      co2Saved: co2Saved.toFixed(0)
    };
  };

  const solarSavings = calculateSolarSavings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background pt-20 sm:pt-24 pb-8 sm:pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-primary mr-3" />
            <h1 className="text-primary">
              {language === 'mr' ? 'ऊर्जा कॅल्क्युलेटर' : 'Energy Calculator'}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'mr' 
              ? 'बिल, उपकरणे आणि सौर बचत मोजा. लॉगिन आवश्यक नाही.'
              : 'Calculate bills, appliance consumption, and solar savings. No login required.'}
          </p>
        </motion.div>

        {/* Tabs for Bill Calculator, Appliance Calculator, and Solar Calculator */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3">
            <TabsTrigger value="bill" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {language === 'mr' ? 'बिल गणना' : 'Bill Calculator'}
            </TabsTrigger>
            <TabsTrigger value="appliances" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {language === 'mr' ? 'उपकरणे' : 'Appliances'}
            </TabsTrigger>
            <TabsTrigger value="solar" className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              {language === 'mr' ? 'सौर' : 'Solar'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bill" className="mt-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Calculator Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  {language === 'mr' ? 'तपशील भरा' : 'Enter Details'}
                </CardTitle>
                <CardDescription>
                  {language === 'mr' 
                    ? 'आपली मीटर रीडिंग किंवा युनिट्स प्रविष्ट करा'
                    : 'Enter your meter readings or units consumed'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tariff Type Selection */}
                <div className="space-y-3">
                  <Label>{language === 'mr' ? 'दर प्रकार' : 'Tariff Type'}</Label>
                  <Select value={tariffType} onValueChange={setTariffType}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-2" />
                          {language === 'mr' ? 'निवासी' : 'Residential'}
                        </div>
                      </SelectItem>
                      <SelectItem value="commercial">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          {language === 'mr' ? 'व्यावसायिक' : 'Commercial'}
                        </div>
                      </SelectItem>
                      <SelectItem value="industrial">
                        <div className="flex items-center">
                          <Factory className="w-4 h-4 mr-2" />
                          {language === 'mr' ? 'औद्योगिक' : 'Industrial'}
                        </div>
                      </SelectItem>
                      <SelectItem value="agricultural">
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {language === 'mr' ? 'कृषी' : 'Agricultural'}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      {language === 'mr' 
                        ? `दर: ₹${tariffRates[tariffType as keyof typeof tariffRates].rate}/युनिट`
                        : `Rate: ₹${tariffRates[tariffType as keyof typeof tariffRates].rate}/unit`}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Calculation Method Toggle */}
                <div className="space-y-3">
                  <Label>{language === 'mr' ? 'गणना पद्धत' : 'Calculation Method'}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={calculationMethod === 'readings' ? 'default' : 'outline'}
                      onClick={() => setCalculationMethod('readings')}
                      className="w-full"
                    >
                      {language === 'mr' ? 'मीटर रीडिंग' : 'Meter Readings'}
                    </Button>
                    <Button
                      variant={calculationMethod === 'units' ? 'default' : 'outline'}
                      onClick={() => setCalculationMethod('units')}
                      className="w-full"
                    >
                      {language === 'mr' ? 'युनिट्स' : 'Direct Units'}
                    </Button>
                  </div>
                </div>

                {/* Input Fields */}
                {calculationMethod === 'readings' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="previousReading">
                        {language === 'mr' ? 'मागील रीडिंग (युनिट्स)' : 'Previous Reading (Units)'}
                      </Label>
                      <Input
                        id="previousReading"
                        type="number"
                        placeholder={language === 'mr' ? 'उदा. 12450' : 'e.g. 12450'}
                        value={previousReading}
                        onChange={(e) => setPreviousReading(e.target.value)}
                        className="text-center"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="currentReading">
                        {language === 'mr' ? 'सध्याची रीडिंग (युनिट्स)' : 'Current Reading (Units)'}
                      </Label>
                      <Input
                        id="currentReading"
                        type="number"
                        placeholder={language === 'mr' ? 'उदा. 12735' : 'e.g. 12735'}
                        value={currentReading}
                        onChange={(e) => setCurrentReading(e.target.value)}
                        className="text-center"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Label htmlFor="directUnits">
                      {language === 'mr' ? 'एकूण युनिट्स वापर (kWh)' : 'Total Units Consumed (kWh)'}
                    </Label>
                    <Input
                      id="directUnits"
                      type="number"
                      placeholder={language === 'mr' ? 'उदा. 285' : 'e.g. 285'}
                      value={directUnits}
                      onChange={(e) => setDirectUnits(e.target.value)}
                      className="text-center"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={resetCalculator}
                    className="w-full"
                  >
                    {language === 'mr' ? 'रीसेट करा' : 'Reset'}
                  </Button>
                  <Button 
                    onClick={calculateBill}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    {language === 'mr' ? 'गणना करा' : 'Calculate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Result Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="glass-card sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  {language === 'mr' ? 'अंदाजे बिल' : 'Estimated Bill'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    {/* Total Amount */}
                    <div className="text-center p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border-2 border-primary/30">
                      <p className="text-sm text-muted-foreground mb-2">
                        {language === 'mr' ? 'एकूण देय रक्कम' : 'Total Amount Payable'}
                      </p>
                      <div className="flex items-center justify-center">
                        <IndianRupee className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2" />
                        <span className="text-primary">
                          {result.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <Badge className="mt-3 bg-primary text-primary-foreground">
                        {result.totalUnits} {language === 'mr' ? 'युनिट्स' : 'Units'}
                      </Badge>
                    </div>

                    <Separator />

                    {/* Breakdown */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">
                        {language === 'mr' ? 'तपशील' : 'Breakdown'}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'mr' ? 'ऊर्जा शुल्क' : 'Energy Charges'}
                          </span>
                          <span className="font-medium">
                            ₹{result.energyCharges.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            ({result.totalUnits} × ₹{result.tariffRate})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'mr' ? 'निश्चित शुल्क' : 'Fixed Charges'}
                          </span>
                          <span className="font-medium">
                            ₹{result.fixedCharges.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'mr' ? 'विद्युत शुल्क (16%)' : 'Electricity Duty (16%)'}
                          </span>
                          <span className="font-medium">
                            ₹{result.electricityDuty.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'mr' ? 'कर (5% GST)' : 'Taxes (5% GST)'}
                          </span>
                          <span className="font-medium">
                            ₹{result.taxes.toFixed(2)}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {language === 'mr' ? 'एकूण' : 'Total'}
                          </span>
                          <span className="font-bold text-primary">
                            ₹{result.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Note */}
                    <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>
                        {language === 'mr' 
                          ? 'हे अंदाजे गणना आहे. वास्तविक बिल रक्कम वेगळी असू शकते.'
                          : 'This is an approximate calculation. Actual bill amount may vary.'}
                      </p>
                    </div>

                    <Button variant="outline" className="w-full" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      {language === 'mr' ? 'पीडीएफ डाउनलोड करा' : 'Download PDF'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-sm">
                      {language === 'mr' 
                        ? 'तपशील भरा आणि बिल गणना करा'
                        : 'Fill in the details and calculate your bill'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          <Card className="glass-card border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {language === 'mr' ? 'निवासी दर' : 'Residential Rates'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'mr' 
                      ? '₹10/युनिट + ₹120 निश्चित शुल्क'
                      : '₹10/unit + ₹120 fixed charge'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-2 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {language === 'mr' ? 'व्यावसायिक दर' : 'Commercial Rates'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'mr' 
                      ? '₹12.5/युनिट + ₹250 निश्चित शुल्क'
                      : '₹12.5/unit + ₹250 fixed charge'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-2 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {language === 'mr' ? 'कृषी दर' : 'Agricultural Rates'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'mr' 
                      ? '₹6.5/युनिट + ₹80 निश्चित शुल्क'
                      : '₹6.5/unit + ₹80 fixed charge'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
          </TabsContent>

          <TabsContent value="appliances" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Appliance Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                      {language === 'mr' ? 'उपकरणे जोडा' : 'Add Appliances'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'mr' 
                        ? 'आपली घरगुती उपकरणे जोडा आणि वापर गणना करा'
                        : 'Add your household appliances and calculate usage'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Appliance Selection */}
                    <div className="space-y-3">
                      <Label>{language === 'mr' ? 'उपकरण निवडा' : 'Select Appliance'}</Label>
                      <Select value={selectedAppliance} onValueChange={setSelectedAppliance}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'mr' ? 'उपकरण निवडा...' : 'Select appliance...'} />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {commonAppliances.map((app) => {
                            const Icon = app.icon;
                            return (
                              <SelectItem key={app.name} value={app.name}>
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4" />
                                  <span>{language === 'mr' ? app.nameMr : app.name}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                          <SelectItem value="custom">
                            <div className="flex items-center gap-2">
                              <Plus className="w-4 h-4" />
                              <span>{language === 'mr' ? 'सानुकूल उपकरण' : 'Custom Appliance'}</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Custom Appliance Fields */}
                    {selectedAppliance === 'custom' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label>{language === 'mr' ? 'उपकरणाचे नाव' : 'Appliance Name'}</Label>
                          <Input
                            value={customApplianceName}
                            onChange={(e) => setCustomApplianceName(e.target.value)}
                            placeholder={language === 'mr' ? 'उदा. हेअर ड्रायर' : 'e.g. Hair Dryer'}
                          />
                        </div>
                        <div className="space-y-3">
                          <Label>{language === 'mr' ? 'वॉटेज (W)' : 'Wattage (W)'}</Label>
                          <Input
                            type="number"
                            value={customWattage}
                            onChange={(e) => setCustomWattage(e.target.value)}
                            placeholder={language === 'mr' ? 'उदा. 1500' : 'e.g. 1500'}
                          />
                        </div>
                      </div>
                    )}

                    {/* Usage Details */}
                    {selectedAppliance && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label>{language === 'mr' ? 'दररोज तास' : 'Hours Per Day'}</Label>
                          <Input
                            type="number"
                            step="0.5"
                            value={hoursPerDay}
                            onChange={(e) => setHoursPerDay(e.target.value)}
                            placeholder={language === 'mr' ? 'उदा. 5' : 'e.g. 5'}
                          />
                        </div>
                        <div className="space-y-3">
                          <Label>{language === 'mr' ? 'संख्या' : 'Quantity'}</Label>
                          <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="1"
                            min="1"
                          />
                        </div>
                      </div>
                    )}

                    {/* Add Button */}
                    {selectedAppliance && (
                      <Button 
                        onClick={addAppliance}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {language === 'mr' ? 'उपकरण जोडा' : 'Add Appliance'}
                      </Button>
                    )}

                    <Separator />

                    {/* Added Appliances List */}
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {language === 'mr' ? 'जोडलेली उपकरणे' : 'Added Appliances'}
                        <Badge variant="secondary" className="ml-auto">{appliances.length}</Badge>
                      </h4>
                      
                      {appliances.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p className="text-sm">
                            {language === 'mr' 
                              ? 'अद्याप कोणतीही उपकरणे जोडलेली नाहीत'
                              : 'No appliances added yet'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {appliances.map((app) => {
                            const dailyKWh = (app.watts * app.hoursPerDay * app.quantity) / 1000;
                            const monthlyKWh = dailyKWh * 30;
                            const monthlyCost = monthlyKWh * selectedTariff.rate;
                            
                            return (
                              <div
                                key={app.id}
                                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <h5 className="font-medium text-sm">
                                      {language === 'mr' ? app.nameMr : app.name}
                                    </h5>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeAppliance(app.id)}
                                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <div className="text-xs text-muted-foreground space-y-1">
                                    <p>
                                      {app.watts}W × {app.hoursPerDay}h × {app.quantity} {language === 'mr' ? 'उपकरणे' : 'units'}
                                    </p>
                                    <div className="flex items-center gap-4">
                                      <span className="font-medium text-primary">
                                        {monthlyKWh.toFixed(2)} kWh/{language === 'mr' ? 'महिना' : 'month'}
                                      </span>
                                      <span className="text-accent">
                                        ₹{monthlyCost.toFixed(2)}/{language === 'mr' ? 'महिना' : 'month'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Appliance Consumption Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-1"
              >
                <Card className="glass-card sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                      {language === 'mr' ? 'एकूण वापर' : 'Total Consumption'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appliances.length > 0 ? (
                      <div className="space-y-6">
                        {/* Daily Consumption */}
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">
                            {language === 'mr' ? 'दैनिक वापर' : 'Daily Consumption'}
                          </p>
                          <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {applianceConsumption.daily.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">kWh</p>
                        </div>

                        {/* Monthly Consumption */}
                        <div className="text-center p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border-2 border-primary/30">
                          <p className="text-sm text-muted-foreground mb-2">
                            {language === 'mr' ? 'मासिक वापर' : 'Monthly Consumption'}
                          </p>
                          <div className="flex items-center justify-center mb-2">
                            <Zap className="w-6 h-6 text-primary mr-2" />
                            <span className="text-3xl sm:text-4xl font-bold text-primary">
                              {applianceConsumption.monthly.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">kWh</p>
                          <Badge className="bg-primary text-primary-foreground">
                            ≈ ₹{(applianceConsumption.monthly * selectedTariff.rate).toFixed(2)}/{language === 'mr' ? 'महिना' : 'month'}
                          </Badge>
                        </div>

                        {/* Yearly Consumption */}
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">
                            {language === 'mr' ? 'वार्षिक वापर' : 'Yearly Consumption'}
                          </p>
                          <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                            {applianceConsumption.yearly.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">kWh</p>
                        </div>

                        <Separator />

                        {/* Transfer to Bill Calculator */}
                        <Button 
                          onClick={transferToMainCalculator}
                          className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90"
                        >
                          <ArrowRight className="w-4 h-4 mr-2" />
                          {language === 'mr' ? 'बिल गणनेत हस्तांतरित करा' : 'Transfer to Bill Calculator'}
                        </Button>

                        {/* Info */}
                        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <p>
                            {language === 'mr' 
                              ? 'ही अंदाजे गणना आहे. वास्तविक वापर वेगळा असू शकतो.'
                              : 'This is an approximate calculation. Actual consumption may vary.'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Zap className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="text-sm">
                          {language === 'mr' 
                            ? 'वापर पाहण्यासाठी उपकरणे जोडा'
                            : 'Add appliances to see consumption'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="solar" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Solar Calculator Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sun className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#FFD700]" />
                      {language === 'mr' ? 'सौर बचत कॅल्क्युलेटर' : 'Solar Savings Calculator'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'mr' 
                        ? 'सौर ऊर्जेच्या बचतीची गणना करा आणि ROI पहा'
                        : 'Calculate solar energy savings and return on investment'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Input Method Info */}
                    <div className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 rounded-lg border border-[#FFD700]/30">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-[#FFA500] flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">
                            {language === 'mr' ? 'कोणतीही एक पद्धत वापरा:' : 'Use any one method:'}
                          </p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• {language === 'mr' ? 'छप्पराचे क्षेत्र किंवा' : 'Roof area OR'}</li>
                            <li>• {language === 'mr' ? 'मासिक वीज बिल किंवा' : 'Monthly electricity bill OR'}</li>
                            <li>• {language === 'mr' ? 'इच्छित सौर क्षमता' : 'Desired solar capacity'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="roofArea">
                          {language === 'mr' ? 'छप्पर क्षेत्र (चौ.मी)' : 'Roof Area (sq.m)'}
                        </Label>
                        <Input
                          id="roofArea"
                          type="number"
                          placeholder={language === 'mr' ? 'उदा. 100' : 'e.g. 100'}
                          value={solarRoofArea}
                          onChange={(e) => setSolarRoofArea(e.target.value)}
                          className="text-center"
                        />
                        <p className="text-xs text-muted-foreground">
                          {language === 'mr' ? '1 kW ≈ 10 चौ.मी' : '1 kW ≈ 10 sq.m'}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="monthlyBill">
                          {language === 'mr' ? 'मासिक वीज बिल (₹)' : 'Monthly Bill (₹)'}
                        </Label>
                        <Input
                          id="monthlyBill"
                          type="number"
                          placeholder={language === 'mr' ? 'उदा. 3000' : 'e.g. 3000'}
                          value={solarMonthlyBill}
                          onChange={(e) => setSolarMonthlyBill(e.target.value)}
                          className="text-center"
                        />
                        <p className="text-xs text-muted-foreground">
                          {language === 'mr' ? 'सरासरी मासिक बिल' : 'Average monthly bill'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Separator className="flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {language === 'mr' ? 'किंवा' : 'OR'}
                      </span>
                      <Separator className="flex-1" />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="systemCapacity">
                        {language === 'mr' ? 'सौर प्रणाली क्षमता (kW)' : 'Solar System Capacity (kW)'}
                      </Label>
                      <Input
                        id="systemCapacity"
                        type="number"
                        step="0.5"
                        placeholder={language === 'mr' ? 'उदा. 3' : 'e.g. 3'}
                        value={solarSystemCapacity}
                        onChange={(e) => setSolarSystemCapacity(e.target.value)}
                        className="text-center"
                      />
                      <p className="text-xs text-muted-foreground">
                        {language === 'mr' 
                          ? 'निवासी: 1-10 kW | व्यावसायिक: 10-100 kW'
                          : 'Residential: 1-10 kW | Commercial: 10-100 kW'}
                      </p>
                    </div>

                    <Separator />

                    {/* Solar Benefits Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex gap-3 p-3 bg-white/50 dark:bg-black/10 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">
                            {language === 'mr' ? 'बिल बचत' : 'Bill Savings'}
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            {language === 'mr' ? '70-90% पर्यंत' : 'Up to 70-90%'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-white/50 dark:bg-black/10 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#0080FF] flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">
                            {language === 'mr' ? 'सरकारी सबसिडी' : 'Govt Subsidy'}
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            {language === 'mr' ? '₹78,000 पर्यंत' : 'Up to ₹78,000'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-white/50 dark:bg-black/10 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center flex-shrink-0">
                          <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">
                            {language === 'mr' ? 'पर्यावरण मैत्री' : 'Eco-Friendly'}
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            {language === 'mr' ? 'स्वच्छ ऊर्जा' : 'Clean Energy'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-white/50 dark:bg-black/10 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">
                            {language === 'mr' ? 'दीर्घकालीन ROI' : 'Long-term ROI'}
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            {language === 'mr' ? '25+ वर्षे सेवा' : '25+ years service'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Solar Results Display */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-1"
              >
                <Card className="glass-card sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                      {language === 'mr' ? 'बचत विश्लेषण' : 'Savings Analysis'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {solarSavings ? (
                      <div className="space-y-4">
                        {/* Recommended Capacity */}
                        <div className="text-center p-4 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 rounded-lg border-2 border-[#FFD700]/30">
                          <div className="flex items-center justify-center mb-2">
                            <Sun className="w-6 h-6 text-[#FFA500] mr-2" />
                            <span className="text-sm text-muted-foreground">
                              {language === 'mr' ? 'अनुशंसित क्षमता' : 'Recommended Capacity'}
                            </span>
                          </div>
                          <p className="text-3xl font-bold text-[#FFA500]">
                            {solarSavings.capacity} kW
                          </p>
                        </div>

                        <Separator />

                        {/* Key Metrics */}
                        <div className="space-y-3">
                          <div className="p-3 bg-gradient-to-br from-[#00BFFF]/10 to-[#0080FF]/10 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Zap className="w-4 h-4 text-[#00BFFF]" />
                              <span className="text-xs text-muted-foreground">
                                {language === 'mr' ? 'मासिक उत्पादन' : 'Monthly Generation'}
                              </span>
                            </div>
                            <p className="text-xl font-bold text-[#00BFFF]">
                              {solarSavings.monthlyGeneration} kWh
                            </p>
                          </div>

                          <div className="p-3 bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <IndianRupee className="w-4 h-4 text-[#10b981]" />
                              <span className="text-xs text-muted-foreground">
                                {language === 'mr' ? 'मासिक बचत' : 'Monthly Savings'}
                              </span>
                            </div>
                            <p className="text-xl font-bold text-[#10b981]">
                              ₹{parseFloat(solarSavings.monthlySavings).toLocaleString('en-IN')}
                            </p>
                          </div>

                          <div className="p-3 bg-gradient-to-br from-[#f59e0b]/10 to-[#d97706]/10 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                              <span className="text-xs text-muted-foreground">
                                {language === 'mr' ? 'परतावा कालावधी' : 'Payback Period'}
                              </span>
                            </div>
                            <p className="text-xl font-bold text-[#f59e0b]">
                              {solarSavings.paybackPeriod} {language === 'mr' ? 'वर्षे' : 'years'}
                            </p>
                          </div>
                        </div>

                        <Separator />

                        {/* Financial Breakdown */}
                        <div className="space-y-2 text-sm">
                          <h5 className="font-medium mb-3">
                            {language === 'mr' ? 'आर्थिक तपशील' : 'Financial Details'}
                          </h5>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {language === 'mr' ? 'प्रणाली खर्च' : 'System Cost'}
                            </span>
                            <span className="font-medium">
                              ₹{parseFloat(solarSavings.systemCost).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>
                              {language === 'mr' ? 'सरकारी सबसिडी' : 'Govt Subsidy'}
                            </span>
                            <span className="font-medium">
                              - ₹{parseFloat(solarSavings.subsidy).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold text-primary">
                            <span>
                              {language === 'mr' ? 'तुमची गुंतवणूक' : 'Your Investment'}
                            </span>
                            <span>
                              ₹{parseFloat(solarSavings.netCost).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <Separator />

                        {/* Long-term Savings */}
                        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-2">
                            {language === 'mr' ? '25 वर्षांत एकूण बचत' : 'Total Savings in 25 Years'}
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            ₹{parseFloat(solarSavings.savings25Years).toLocaleString('en-IN')}
                          </p>
                        </div>

                        {/* Environmental Impact */}
                        <div className="flex items-start gap-2 p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                          <Leaf className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                              {language === 'mr' ? 'पर्यावरण प्रभाव' : 'Environmental Impact'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {language === 'mr' 
                                ? `${parseFloat(solarSavings.co2Saved).toLocaleString('en-IN')} किलो CO₂ बचत/वर्ष`
                                : `${parseFloat(solarSavings.co2Saved).toLocaleString('en-IN')} kg CO₂ saved/year`}
                            </p>
                          </div>
                        </div>

                        {/* Note */}
                        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <p>
                            {language === 'mr' 
                              ? 'ही अंदाजे गणना आहे. वास्तविक परिणाम वेगळे असू शकतात.'
                              : 'This is an approximate calculation. Actual results may vary.'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Sun className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="text-sm">
                          {language === 'mr' 
                            ? 'तपशील भरा आणि बचत पहा'
                            : 'Fill in the details to see savings'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
