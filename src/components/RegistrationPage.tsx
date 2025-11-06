import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { useLanguage } from './LanguageContext';
import { toast } from 'sonner@2.0.3';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  User,
  Phone,
  MapPin,
  Zap,
  ArrowLeft,
  UserPlus
} from 'lucide-react';

interface RegistrationPageProps {
  onPageChange: (page: string) => void;
  onLogin: () => void;
}

export function RegistrationPage({ onPageChange, onLogin }: RegistrationPageProps) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    consumerNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    
    // Simple mock registration - accept any valid data
    setTimeout(() => {
      localStorage.setItem('userEmail', formData.email);
      toast.success('Account created successfully! Logging you in...');
      setIsLoading(false);
      onLogin();
      onPageChange('dashboard');
    }, 800);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-energy-blue)]/10 via-background to-[var(--color-energy-lime)]/10 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-energy-blue)]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-energy-lime)]/5 rounded-full blur-3xl animate-pulse-energy" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[var(--color-energy-blue)] to-[var(--color-energy-lime)] rounded-xl flex items-center justify-center">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">{t.createAccount}</h1>
          <p className="text-muted-foreground">Join Mahavitaran digital platform</p>
        </div>

        <Card className="glass-card energy-glow">
          <CardHeader>
            <CardTitle>{t.register}</CardTitle>
            <CardDescription>
              Fill in your details to create your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.name} *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.email} *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.phone} *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="consumerNumber">{t.consumerNumberOptional}</Label>
                <div className="relative">
                  <Zap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="consumerNumber"
                    type="text"
                    placeholder="Enter existing consumer number"
                    className="pl-10"
                    value={formData.consumerNumber}
                    onChange={(e) => handleInputChange('consumerNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t.address} *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address"
                    className="pl-10 min-h-[80px] resize-none"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.password} *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t.confirmPassword} *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-[var(--color-energy-navy)] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-subtle"
                disabled={isLoading}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {isLoading ? 'Creating Account...' : t.createAccount}
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                {t.alreadyHaveAccount}
              </p>
              <Button 
                variant="outline" 
                className="w-full h-11 border-2 border-[var(--color-energy-blue)] text-[var(--color-energy-blue)] hover:bg-[var(--color-energy-blue)] hover:text-white transition-all duration-300"
                onClick={() => onPageChange('login')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.signInHere}
              </Button>
            </div>

            <div className="mt-6">
              <Button 
                variant="ghost" 
                onClick={() => onPageChange('landing')}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>* Required fields</p>
          <p>Consumer number can be added later from your profile</p>
        </div>
      </div>
    </div>
  );
}