import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  ArrowLeft, 
  Shield, 
  CheckCircle2,
  AlertCircle,
  Receipt,
  Download,
  QrCode
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import qrCodeImage from 'figma:asset/e3affe5b4cba0aab70dacd405ecd412a0b336189.png';

interface PaymentPageProps {
  onPageChange: (page: string) => void;
  billAmount?: number;
  consumerNumber?: string;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ 
  onPageChange, 
  billAmount = 2450.50,
  consumerNumber = "MH01234567890"
}) => {
  const { language } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Form states
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [netBankingBank, setNetBankingBank] = useState('');

  const translations = {
    en: {
      title: 'Payment Gateway',
      subtitle: 'Complete your electricity bill payment',
      backToDashboard: 'Back to Dashboard',
      billSummary: 'Bill Summary',
      consumerNumber: 'Consumer Number',
      billAmount: 'Bill Amount',
      convenienceFee: 'Convenience Fee',
      totalAmount: 'Total Amount to Pay',
      paymentMethod: 'Select Payment Method',
      upi: 'UPI',
      upiDesc: 'Pay via UPI apps like Google Pay, PhonePe, Paytm',
      creditDebit: 'Credit/Debit Card',
      creditDebitDesc: 'Visa, Mastercard, RuPay accepted',
      netBanking: 'Net Banking',
      netBankingDesc: 'Pay directly from your bank account',
      wallet: 'Digital Wallet',
      walletDesc: 'Paytm, PhonePe, Amazon Pay',
      upiIdLabel: 'Enter UPI ID',
      upiIdPlaceholder: 'yourname@upi',
      cardNumberLabel: 'Card Number',
      cardNumberPlaceholder: '1234 5678 9012 3456',
      cardNameLabel: 'Cardholder Name',
      cardNamePlaceholder: 'Name on card',
      expiryLabel: 'Expiry Date',
      expiryPlaceholder: 'MM/YY',
      cvvLabel: 'CVV',
      cvvPlaceholder: '123',
      selectBank: 'Select Your Bank',
      selectBankPlaceholder: 'Choose your bank',
      securePayment: 'Secure Payment',
      securePaymentDesc: 'Your payment information is encrypted and secure',
      proceedToPay: 'Proceed to Pay',
      processing: 'Processing Payment...',
      paymentSuccess: 'Payment Successful!',
      paymentSuccessDesc: 'Your electricity bill payment has been completed successfully',
      transactionId: 'Transaction ID',
      downloadReceipt: 'Download Receipt',
      done: 'Done',
      banks: {
        sbi: 'State Bank of India',
        hdfc: 'HDFC Bank',
        icici: 'ICICI Bank',
        axis: 'Axis Bank',
        pnb: 'Punjab National Bank',
        bob: 'Bank of Baroda',
        canara: 'Canara Bank',
        union: 'Union Bank of India'
      }
    },
    mr: {
      title: 'पेमेंट गेटवे',
      subtitle: 'आपले वीज बिल भरणे पूर्ण करा',
      backToDashboard: 'डॅशबोर्डवर परत',
      billSummary: 'बिल सारांश',
      consumerNumber: 'ग्राहक क्रमांक',
      billAmount: 'बिल रक्कम',
      convenienceFee: 'सुविधा शुल्क',
      totalAmount: 'एकूण देय रक्कम',
      paymentMethod: 'पेमेंट पद्धत निवडा',
      upi: 'UPI',
      upiDesc: 'Google Pay, PhonePe, Paytm सारख्या UPI अॅप्सद्वारे भरा',
      creditDebit: 'क्रेडिट/डेबिट कार्ड',
      creditDebitDesc: 'Visa, Mastercard, RuPay स्वीकारले जाते',
      netBanking: 'नेट बँकिंग',
      netBankingDesc: 'आपल्या बँक खात्यातून थेट भरा',
      wallet: 'डिजिटल वॉलेट',
      walletDesc: 'Paytm, PhonePe, Amazon Pay',
      upiIdLabel: 'UPI ID टाका',
      upiIdPlaceholder: 'yourname@upi',
      cardNumberLabel: 'कार्ड क्रमांक',
      cardNumberPlaceholder: '1234 5678 9012 3456',
      cardNameLabel: 'कार्डधारकाचे नाव',
      cardNamePlaceholder: 'कार्डवरील नाव',
      expiryLabel: 'समाप्ती तारीख',
      expiryPlaceholder: 'MM/YY',
      cvvLabel: 'CVV',
      cvvPlaceholder: '123',
      selectBank: 'आपली बँक निवडा',
      selectBankPlaceholder: 'बँक निवडा',
      securePayment: 'सुरक्षित पेमेंट',
      securePaymentDesc: 'आपली पेमेंट माहिती एन्क्रिप्टेड आणि सुरक्षित आहे',
      proceedToPay: 'पेमेंट करा',
      processing: 'पेमेंट प्रक्रिया सुरू आहे...',
      paymentSuccess: 'पेमेंट यशस्वी!',
      paymentSuccessDesc: 'आपले वीज बिल भरणे यशस्वीरित्या पूर्ण झाले आहे',
      transactionId: 'व्यवहार क्रमांक',
      downloadReceipt: 'पावती डाउनलोड करा',
      done: 'पूर्ण झाले',
      banks: {
        sbi: 'भारतीय स्टेट बँक',
        hdfc: 'HDFC बँक',
        icici: 'ICICI बँक',
        axis: 'Axis बँक',
        pnb: 'पंजाब नॅशनल बँक',
        bob: 'बँक ऑफ बडोदा',
        canara: 'केनरा बँक',
        union: 'युनियन बँक ऑफ इंडिया'
      }
    }
  };

  const t = translations[language as keyof typeof translations];
  const convenienceFee = billAmount * 0.01; // 1% convenience fee
  const totalAmount = billAmount + convenienceFee;

  const paymentMethods = [
    {
      id: 'upi',
      icon: Smartphone,
      title: t.upi,
      description: t.upiDesc
    },
    {
      id: 'card',
      icon: CreditCard,
      title: t.creditDebit,
      description: t.creditDebitDesc
    },
    {
      id: 'netbanking',
      icon: Building2,
      title: t.netBanking,
      description: t.netBankingDesc
    },
    {
      id: 'wallet',
      icon: Wallet,
      title: t.wallet,
      description: t.walletDesc
    }
  ];

  const handlePayment = async () => {
    // Validation
    if (paymentMethod === 'upi' && !upiId) {
      toast.error(language === 'en' ? 'Please enter UPI ID' : 'कृपया UPI ID टाका');
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber || !cardName || !cardExpiry || !cardCvv)) {
      toast.error(language === 'en' ? 'Please fill all card details' : 'कृपया सर्व कार्ड तपशील भरा');
      return;
    }
    if (paymentMethod === 'netbanking' && !netBankingBank) {
      toast.error(language === 'en' ? 'Please select a bank' : 'कृपया बँक निवडा');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const txnId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
      setTransactionId(txnId);
      setProcessing(false);
      setShowSuccess(true);
      toast.success(language === 'en' ? 'Payment completed successfully!' : 'पेमेंट यशस्वीरित्या पूर्ण झाले!');
    }, 3000);
  };

  const handleDownloadReceipt = () => {
    toast.success(language === 'en' ? 'Receipt downloaded!' : 'पावती डाउनलोड झाली!');
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'upi':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* UPI ID Input Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">{t.upiIdLabel}</Label>
                  <Input
                    id="upiId"
                    type="text"
                    placeholder={t.upiIdPlaceholder}
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="bg-input-background"
                  />
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Pay_Logo_%282020%29.svg" alt="Google Pay" className="h-8" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/PhonePe_Logo.svg" alt="PhonePe" className="h-8" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-8" />
                </div>
              </div>

              {/* QR Code Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  <Label>{language === 'en' ? 'Scan QR Code' : 'QR कोड स्कॅन करा'}</Label>
                </div>
                <div className="glass-card p-4 rounded-lg flex items-center justify-center">
                  <ImageWithFallback
                    src={qrCodeImage}
                    alt="UPI QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {language === 'en' 
                    ? 'Scan with any UPI app to pay' 
                    : 'कोणत्याही UPI अॅपने स्कॅन करून भरा'}
                </p>
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">{t.cardNumberLabel}</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder={t.cardNumberPlaceholder}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
                className="bg-input-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">{t.cardNameLabel}</Label>
              <Input
                id="cardName"
                type="text"
                placeholder={t.cardNamePlaceholder}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="bg-input-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">{t.expiryLabel}</Label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder={t.expiryPlaceholder}
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  maxLength={5}
                  className="bg-input-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">{t.cvvLabel}</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder={t.cvvPlaceholder}
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  maxLength={3}
                  className="bg-input-background"
                />
              </div>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank">{t.selectBank}</Label>
              <Select value={netBankingBank} onValueChange={setNetBankingBank}>
                <SelectTrigger id="bank" className="bg-input-background">
                  <SelectValue placeholder={t.selectBankPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sbi">{t.banks.sbi}</SelectItem>
                  <SelectItem value="hdfc">{t.banks.hdfc}</SelectItem>
                  <SelectItem value="icici">{t.banks.icici}</SelectItem>
                  <SelectItem value="axis">{t.banks.axis}</SelectItem>
                  <SelectItem value="pnb">{t.banks.pnb}</SelectItem>
                  <SelectItem value="bob">{t.banks.bob}</SelectItem>
                  <SelectItem value="canara">{t.banks.canara}</SelectItem>
                  <SelectItem value="union">{t.banks.union}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {['Paytm', 'PhonePe', 'Amazon Pay'].map((wallet) => (
                <button
                  key={wallet}
                  className="glass-card p-4 rounded-lg hover:border-primary transition-all"
                >
                  <Wallet className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-center text-sm">{wallet}</p>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-accent/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onPageChange('dashboard')}
            className="mb-4 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToDashboard}
          </Button>
          <h1 className="text-primary mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bill Summary - Left Column */}
          <div className="lg:col-span-1">
            <Card className="glass-card p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Receipt className="w-5 h-5 text-primary" />
                <h2 className="text-primary">{t.billSummary}</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">{t.consumerNumber}</span>
                  <span className="font-mono">{consumerNumber}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">{t.billAmount}</span>
                  <span>₹{billAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">{t.convenienceFee}</span>
                  <span>₹{convenienceFee.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center pt-2">
                  <span className="text-primary">{t.totalAmount}</span>
                  <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Alert className="mt-6 bg-accent/10 border-accent">
                <Shield className="w-4 h-4 text-accent" />
                <AlertDescription className="text-sm">
                  <strong>{t.securePayment}</strong>
                  <br />
                  {t.securePaymentDesc}
                </AlertDescription>
              </Alert>
            </Card>
          </div>

          {/* Payment Form - Right Column */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-6">
              <h2 className="text-primary mb-6">{t.paymentMethod}</h2>

              {/* Payment Method Selection */}
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3 mb-8">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={method.id} id={method.id} />
                    <method.icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className="flex-1">
                      <p className={paymentMethod === method.id ? 'text-primary' : ''}>{method.title}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <Separator className="my-6" />

              {/* Payment Form Fields */}
              <div className="mb-8">
                {renderPaymentForm()}
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                    {t.processing}
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    {t.proceedToPay} ₹{totalAmount.toFixed(2)}
                  </>
                )}
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-center">{t.paymentSuccess}</DialogTitle>
            <DialogDescription className="text-center">{t.paymentSuccessDesc}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">{t.consumerNumber}</span>
                <span className="font-mono">{consumerNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">{t.totalAmount}</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.transactionId}</span>
                <span className="font-mono text-sm">{transactionId}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleDownloadReceipt}
                variant="outline"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.downloadReceipt}
              </Button>
              <Button
                onClick={() => {
                  setShowSuccess(false);
                  onPageChange('dashboard');
                }}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t.done}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
