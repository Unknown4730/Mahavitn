import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { ProfilePage } from './components/ProfilePage';
import { ServicesPage } from './components/ServicesPage';
import { SmartGridPage } from './components/SmartGridPage';
import { EnergyInsightsPage } from './components/EnergyInsightsPage';
import { PaymentPage } from './components/PaymentPage';
import { ConsumptionCalculator } from './components/ConsumptionCalculator';
import { SolarInitiativePage } from './components/SolarInitiativePage';
import { DataInitializer } from './components/DataInitializer';
import { Toaster } from './components/ui/sonner';
import { createClient } from './utils/supabase/client';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }

    // Check for existing session
    const checkSession = async () => {
      try {
        // Check localStorage first for quick feedback
        const token = localStorage.getItem('access_token');
        if (token) {
          // Verify the token is still valid with Supabase
          const supabase = createClient();
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (session && !error) {
            // Update localStorage with fresh session data
            localStorage.setItem('access_token', session.access_token);
            localStorage.setItem('user_id', session.user.id);
            localStorage.setItem('user_email', session.user.email || '');
            localStorage.setItem('user_name', session.user.user_metadata?.name || '');
            setIsLoggedIn(true);
          } else {
            // Clear invalid session
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_name');
            setIsLoggedIn(false);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      }
    };
    checkSession();

    // Mobile viewport height fix for iOS
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const handlePageChange = (page: string) => {
    if (page === 'login' && !isLoggedIn) {
      setCurrentPage('login');
    } else if (page === 'dashboard' || page === 'profile' || page === 'payment') {
      if (!isLoggedIn) {
        setCurrentPage('login');
      } else {
        setCurrentPage(page);
      }
    } else {
      setCurrentPage(page);
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onPageChange={handlePageChange} />;
      case 'dashboard':
        return <Dashboard isLoggedIn={isLoggedIn} onPageChange={handlePageChange} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onPageChange={handlePageChange} />;
      case 'profile':
        return <ProfilePage onPageChange={handlePageChange} />;
      case 'services':
        return <ServicesPage onPageChange={handlePageChange} />;
      case 'smart-grid':
        return <SmartGridPage />;
      case 'energy-insights':
        return <EnergyInsightsPage />;
      case 'register':
        return <RegistrationPage onPageChange={handlePageChange} />;
      case 'payment':
        return <PaymentPage onPageChange={handlePageChange} />;
      case 'calculator':
        return <ConsumptionCalculator />;
      case 'solar-initiatives':
        return <SolarInitiativePage onPageChange={handlePageChange} />;
      case 'data-init':
        return <DataInitializer />;
      default:
        return <LandingPage onPageChange={handlePageChange} />;
    }
  };

  return (
    <LanguageProvider>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Header
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isLoggedIn={isLoggedIn}
          onLogin={() => handlePageChange('login')}
          onLogout={handleLogout}
          darkMode={darkMode}
          onDarkModeToggle={handleDarkModeToggle}
        />
        
        <main>
          {renderCurrentPage()}
        </main>
        
        <Toaster />
      </div>
    </LanguageProvider>
  );
}