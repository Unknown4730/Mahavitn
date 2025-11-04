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
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner';

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Login error:', error);
        
        // Provide user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please check your credentials or register a new account.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please confirm your email address first.');
        } else {
          toast.error('Login failed: ' + error.message);
        }
        
        setIsLoading(false);
        return;
      }

      if (data.session) {
        // Store access token
        localStorage.setItem('access_token', data.session.access_token);
        localStorage.setItem('user_id', data.user.id);
        
        toast.success('Login successful!');
        setIsLoading(false);
        onLogin();
        onPageChange('dashboard');
      }
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
                className="w-full bg-gradient-to-r from-[var(--color-energy-blue)] to-[var(--color-energy-navy)] hover:shadow-lg"
                disabled={isLoading}
              >
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
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                  💡 <strong>First time here?</strong> Please register a new account to get started. The login credentials will only work after you've created an account.
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs h-auto p-0 text-blue-600 dark:text-blue-400"
                  onClick={() => onPageChange('setup')}
                >
                  → Or use the Setup Page to create a demo account
                </Button>
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

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Demo credentials:</p>
          <p>Email: demo@mahavitaran.com or Phone: +91 9876543210</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  );
}