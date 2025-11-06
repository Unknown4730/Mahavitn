import React, { useState } from 'react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  Zap, 
  User, 
  LogOut, 
  Settings,
  Moon,
  Sun,
  Menu,
  Home,
  LayoutDashboard,
  Briefcase,
  X
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export function Header({ 
  currentPage, 
  onPageChange, 
  isLoggedIn, 
  onLogin, 
  onLogout,
  darkMode,
  onDarkModeToggle 
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    onPageChange(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b glass-card">
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer touch-manipulation"
            onClick={() => handleNavigation('landing')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[var(--color-energy-blue)] to-[var(--color-energy-lime)] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl hidden xs:inline">Mahavitaran</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              onClick={() => handleNavigation('landing')}
              className={currentPage === 'landing' ? 'bg-secondary text-white hover:bg-secondary/90 font-semibold' : 'hover:bg-secondary/10 hover:text-secondary font-medium'}
            >
              {language === 'mr' ? 'मुख्य पृष्ठ' : 'Home'}
            </Button>
            <Button 
              variant="ghost"
              onClick={() => handleNavigation('dashboard')}
              className={currentPage === 'dashboard' ? 'bg-secondary' : ''}
            >
              {t.dashboard}
            </Button>
            <Button 
              variant="ghost"
              onClick={() => handleNavigation('services')}
              className={currentPage === 'services' ? 'bg-secondary' : ''}
            >
              {t.consumerServices}
            </Button>
            <Button 
              variant="ghost"
              onClick={() => handleNavigation('calculator')}
              className={currentPage === 'calculator' ? 'bg-secondary' : ''}
            >
              {language === 'mr' ? 'कॅल्क्युलेटर' : 'Calculator'}
            </Button>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Selector - Hidden on smallest screens */}
            <div className="hidden sm:block">
              <Select value={language} onValueChange={(value: 'en' | 'mr') => setLanguage(value)}>
                <SelectTrigger className="w-16 sm:w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="mr">मर</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onDarkModeToggle}
              className="h-9 w-9 touch-manipulation"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Desktop User Menu */}
            {isLoggedIn ? (
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full touch-manipulation">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatar.png" alt="User" />
                        <AvatarFallback>RS</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={() => handleNavigation('dashboard')}>
                      <User className="mr-2 h-4 w-4" />
                      {t.dashboard}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('profile')}>
                      <Settings className="mr-2 h-4 w-4" />
                      {t.profile}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {t.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  onClick={onLogin} 
                  size="sm"
                  className="border-primary/50 hover:bg-primary/10"
                >
                  <User className="w-4 h-4 mr-2" />
                  {t.login}
                </Button>
                <Button 
                  onClick={() => handleNavigation('register')} 
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-md"
                >
                  {t.register}
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden touch-manipulation h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[var(--color-energy-blue)] to-[var(--color-energy-lime)] rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    Mahavitaran
                  </SheetTitle>
                  <SheetDescription>
                    {language === 'mr' ? 'नेव्हिगेशन मेनू' : 'Navigation menu'}
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 flex flex-col space-y-3">
                  {/* Language Selector in Mobile Menu */}
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm">{language === 'mr' ? 'भाषा' : 'Language'}</span>
                    <Select value={language} onValueChange={(value: 'en' | 'mr') => setLanguage(value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="mr">मराठी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Mobile Navigation Links */}
                  <Button 
                    variant={currentPage === 'landing' ? 'secondary' : 'ghost'}
                    onClick={() => handleNavigation('landing')}
                    className="justify-start touch-manipulation h-12"
                  >
                    <Home className="mr-3 h-5 w-5" />
                    {language === 'mr' ? 'मुख्य पृष्ठ' : 'Home'}
                  </Button>

                  <Button 
                    variant={currentPage === 'dashboard' ? 'secondary' : 'ghost'}
                    onClick={() => handleNavigation('dashboard')}
                    className="justify-start touch-manipulation h-12"
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    {t.dashboard}
                  </Button>

                  <Button 
                    variant={currentPage === 'services' ? 'secondary' : 'ghost'}
                    onClick={() => handleNavigation('services')}
                    className="justify-start touch-manipulation h-12"
                  >
                    <Briefcase className="mr-3 h-5 w-5" />
                    {t.consumerServices}
                  </Button>

                  <Button 
                    variant={currentPage === 'calculator' ? 'secondary' : 'ghost'}
                    onClick={() => handleNavigation('calculator')}
                    className="justify-start touch-manipulation h-12"
                  >
                    <Zap className="mr-3 h-5 w-5" />
                    {language === 'mr' ? 'बिल कॅल्क्युलेटर' : 'Bill Calculator'}
                  </Button>

                  <Separator />

                  {/* User Section */}
                  {isLoggedIn ? (
                    <>
                      <Button 
                        variant="ghost"
                        onClick={() => handleNavigation('profile')}
                        className="justify-start touch-manipulation h-12"
                      >
                        <Settings className="mr-3 h-5 w-5" />
                        {t.profile}
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={() => {
                          onLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="justify-start touch-manipulation h-12 text-destructive"
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        {t.logout}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={onLogin}
                        className="touch-manipulation h-12 border-primary/50 hover:bg-primary/10"
                        variant="outline"
                      >
                        <User className="mr-3 h-5 w-5" />
                        {t.login}
                      </Button>
                      <Button 
                        onClick={() => handleNavigation('register')}
                        className="touch-manipulation h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-md"
                      >
                        <User className="mr-3 h-5 w-5" />
                        {t.register}
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}