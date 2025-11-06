import { useState, useEffect } from 'react';
import { 
  consumerApi, 
  authApi, 
  announcementApi,
  getUserProfileWithConsumers,
  getConsumerBillsAndUsage
} from '../../utils/api';
import { config } from '../../utils/config';

export interface Consumer {
  consumerNumber: string;
  userId: string;
  name: string;
  address: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Agricultural';
  status: string;
  currentBill?: {
    unitsConsumed: number;
    amount: number;
    dueDate: string;
    status: string;
  };
  createdAt: string;
}

export interface UsageData {
  month: string;
  units: number;
  amount: number;
}

export interface Bill {
  billId: string;
  consumerNumber: string;
  month: number;
  year: number;
  previousReading: number;
  currentReading: number;
  unitsConsumed: number;
  amount: number;
  dueDate: string;
  billDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
}

export interface Announcement {
  id: string;
  title: string;
  titleMr: string;
  description: string;
  descriptionMr: string;
  type: 'info' | 'warning' | 'maintenance' | 'important';
  priority: 'high' | 'medium' | 'low';
  date: string;
}

/**
 * Hook to fetch user's consumers from Supabase
 */
export function useConsumers() {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsumers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await consumerApi.getConsumers();
      
      if (response.error) {
        setError(response.error);
        setConsumers([]);
      } else {
        setConsumers(response.data?.consumers || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch consumers');
      setConsumers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsumers();
  }, []);

  return { consumers, loading, error, refetch: fetchConsumers };
}

/**
 * Hook to fetch consumer details with bills and usage history
 */
export function useConsumerDetails(consumerNumber: string | null) {
  const [consumer, setConsumer] = useState<Consumer | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);
  const [usageHistory, setUsageHistory] = useState<UsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!consumerNumber) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getConsumerBillsAndUsage(consumerNumber);
        
        if (response.error) {
          setError(response.error);
        } else {
          setConsumer(response.data?.consumer || null);
          setBills(response.data?.bills || []);
          setUsageHistory(response.data?.usageHistory || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch consumer details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [consumerNumber]);

  return { consumer, bills, usageHistory, loading, error };
}

/**
 * Hook to fetch announcements
 */
export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await announcementApi.getAnnouncements();
      
      if (response.error) {
        setError(response.error);
        setAnnouncements([]);
      } else {
        setAnnouncements(response.data?.announcements || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch announcements');
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return { announcements, loading, error, refetch: fetchAnnouncements };
}

/**
 * Hook to fetch user profile with all data
 */
export function useUserProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getUserProfileWithConsumers();
      
      if (response.error) {
        setError(response.error);
      } else {
        setProfile(response.data?.profile || null);
        setConsumers(response.data?.consumers || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, consumers, loading, error, refetch: fetchProfile };
}

/**
 * Helper function to format month names for display
 */
export function formatMonthName(month: string, language: 'en' | 'mr'): string {
  const date = new Date(month);
  const monthNumber = date.getMonth();

  const monthNames = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    mr: ['जाने', 'फेब्रु', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑग', 'सप्टें', 'ऑक्टो', 'नोव्हें', 'डिसें']
  };

  return monthNames[language][monthNumber];
}

/**
 * Helper function to format currency in INR
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Helper function to validate consumer number (configurable length)
 */
export function validateConsumerNumber(number: string): boolean {
  return config.consumerNumber.pattern.test(number);
}
