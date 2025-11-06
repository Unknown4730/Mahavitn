import { useState, useEffect, useCallback } from 'react';
import {
  authApi,
  consumerApi,
  announcementApi,
  ApiResponse,
} from '../../utils/api';
// We can re-use the types from your existing mockData file
import { Consumer, UsageData, UserProfile, Announcement } from '../mockData'; 
import { useLanguage } from '../LanguageContext';

/**
 * A re-usable hook for making API calls.
 * @param apiCall The API function to call (e.g., `() => consumerApi.getConsumers()`).
 * @param dependencies The dependencies for the useCallback hook (e.g., [consumerNumber]).
 * @param enabled A flag to prevent the API call from running (e.g., if user is not logged in).
 */
function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = [],
  enabled: boolean = true,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return; // Don't fetch if not enabled
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      if (response.error) {
        // Don't set error for "Not authenticated" on initial load
        if (response.error.includes('Not authenticated')) {
           console.warn('API call failed: Not authenticated');
        } else {
          setError(response.error);
        }
        setData(null);
      } else {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [...dependencies, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Fetches the logged-in user's profile AND their associated consumer list.
 * Only runs if `isLoggedIn` is true.
 */
export function useUserProfile(isLoggedIn: boolean) {
  const {
    data,
    loading,
    error,
    refetch,
  } = useApi<any>(
    () => authApi.getProfileWithConsumers(), // This combined function is in api.ts
    [],
    isLoggedIn, // Only run this hook if the user is logged in
  );

  return {
    profile: data?.profile as UserProfile | null,
    consumers: data?.consumers as Consumer[] | null,
    loading,
    error,
    refetch,
  };
}

/**
 * Fetches *only* the list of consumers for the logged-in user.
 * Only runs if `isLoggedIn` is true.
 */
export function useConsumers(isLoggedIn: boolean) {
  return useApi<{ consumers: Consumer[] }>(
    () => consumerApi.getConsumers(),
    [],
    isLoggedIn, // Only run this hook if the user is logged in
  );
}

/**
 * Fetches the detailed info for a *single* consumer, including bills and usage.
 * Only runs if `consumerNumber` is not null.
 */
export function useConsumerDetails(consumerNumber: string | null) {
  const { data, loading, error, refetch } = useApi<any>(
    () => consumerApi.getConsumerBillsAndUsage(consumerNumber!), // This combined function is in api.ts
    [consumerNumber],
    !!consumerNumber, // Only run if consumerNumber is not null
  );

  return {
    consumer: data?.consumer as Consumer | null,
    bills: data?.bills as any[] | null, // You can create a Bill type
    usageHistory: data?.usageHistory as UsageData[] | null,
    loading,
    error,
    refetch,
  };
}

/**
 * Fetches public announcements. Always runs.
 */
export function useAnnouncements() {
  const { language } = useLanguage();
  const {
    data,
    loading,
    error,
    refetch,
  } = useApi<{ announcements: Announcement[] }>(
    () => announcementApi.getAnnouncements(),
    [],
    true, // Always enabled, it's public
  );

  // Sort by date
  const sortedData = data?.announcements
    ? [...data.announcements].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
    : [];

  return { announcements: sortedData, loading, error, refetch, language };
}