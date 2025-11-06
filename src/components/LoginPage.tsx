import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { useLanguage } from './LanguageContext';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { createClient } from '../utils/supabase/client';

interface LoginPageProps {
  onLogin: () => void;
  onPageChange: (page: string) => void;
}

export function LoginPage({ onLogin, onPageChange }: LoginPageProps) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Login error:', error);
        toast.error(error.message || 'Invalid email or password');
        setIsLoading(false);
        return;
      }

      if (!data.session || !data.user) {
        toast.error('Login failed - no session created');
        setIsLoading(false);
        return;
      }

      // Store user session in localStorage
      localStorage.setItem('access_token', data.session.access_token);
      localStorage.setItem('user_id', data.user.id);
      localStorage.setItem('user_email', data.user.email || '');
      localStorage.setItem('user_name', data.user.user_metadata?.name || '');
      
      toast.success('Login successful!');
      setIsLoading(false);
      onLogin();
      onPageChange('dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    }
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
              <Zap className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Mahavitaran account</p>
        </div>

        <Card className="glass-card energy-glow">
          <CardHeader>
            <CardTitle>{t.login}</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.emailOrPhone}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="Enter email or phone number"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
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

              <div className="flex items-center justify-between">
                <Button variant="link" className="px-0 text-sm">
                  {t.forgotPassword}
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-[var(--color-energy-navy)] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-subtle"
                disabled={isLoading}
              >
                <Zap className="w-5 h-5 mr-2" />
                {isLoading ? 'Signing in...' : t.login}
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                {t.dontHaveAccount}
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onPageChange('register')}
              >
                {t.register}
              </Button>
            </div>

            <div className="mt-6 p-4 bg-[var(--color-energy-blue)]/5 border border-[var(--color-energy-blue)]/20 rounded-lg">
              <p className="text-sm font-semibold mb-2">Demo Credentials:</p>
              <div className="text-sm space-y-1 font-mono">
                <p>📧 demo@mahavitaran.com</p>
                <p>🔐 demo123</p>
              </div>
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
      </div>
    </div>
  );
}