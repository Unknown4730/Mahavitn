import { projectId, publicAnonKey } from './supabase/info';

// CRITICAL FIX: Use the prefix from your server file: /make-server-6d937304/
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-6d937304`;

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

// Helper function to get the current session token from localStorage
function getAuthToken(): string | null {
  const sessionData = localStorage.getItem(`sb-${projectId}-auth-token`);
  if (sessionData) {
    try {
      const session = JSON.parse(sessionData);
      return session.access_token || null;
    } catch (e) {
      console.error('Error parsing auth token:', e);
      return null;
    }
  }
  return null;
}


// Helper function to make authenticated requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth = true, // Default to true for most API calls
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (requiresAuth) {
      const token = getAuthToken();
      if (!token) {
        return { error: 'Not authenticated. Please log in.' };
      }
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      headers['Authorization'] = `Bearer ${publicAnonKey}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData =
        (await response.json().catch(() => ({ error: 'Request failed' }))) ||
        {};
      return { error: errorData.error || `HTTP ${response.status}` };
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : { success: true };
    
    return { data };
  } catch (error) {
    console.error('API request error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// ============ AUTH API ============
export const authApi = {
  // This /signup endpoint is for the backend to create the user *profile* in the KV store
  // It must be called *after* Supabase Auth creates the user.
  signUp: async (
    email: string,
    name: string,
    phone?: string,
  ) => {
    return apiRequest(
      '/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify({ email, name, phone }),
      },
      true, // Requires auth from the newly signed-up user
    );
  },

  getProfile: async () => {
    return apiRequest('/auth/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (name: string, phone: string) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, phone }),
    });
  },
};

// ============ CONSUMER API ============
export const consumerApi = {
  addConsumer: async (
    consumerNumber: string,
    name: string,
    address: string,
    category: string,
  ) => {
    return apiRequest('/consumers', {
      method: 'POST',
      body: JSON.stringify({ consumerNumber, name, address, category }),
    });
  },

  getConsumers: async () => {
    return apiRequest('/consumers', {
      method: 'GET',
    });
  },

  getConsumerDetails: async (consumerNumber: string) => {
    return apiRequest(`/consumers/${consumerNumber}`, {
      method: 'GET',
    });
  },
  
  removeConsumer: async (consumerNumber: string) => {
    return apiRequest(`/consumers/${consumerNumber}`, {
      method: 'DELETE',
    });
  },
};

// ============ BILL API ============
export const billApi = {
  // ADMIN function for the external system to push bills
  createBill: async (billData: {
    consumerNumber: string;
    month: number;
    year: number;
    previousReading: number;
    currentReading: number;
    unitsConsumed: number;
    amount: number;
    dueDate: string;
  }) => {
    return apiRequest(
      '/bills',
      {
        method: 'POST',
        body: JSON.stringify(billData),
      },
      true, // This should be secured with an admin/service key
    );
  },

  payBill: async (
    billId: string,
    paymentMethod: string,
    transactionId?: string,
  ) => {
    return apiRequest(`/bills/${billId}/pay`, {
      method: 'POST',
      body: JSON.stringify({ paymentMethod, transactionId }),
    });
  },
};

// ============ SERVICE REQUEST API ============
export const serviceRequestApi = {
  createRequest: async (data: {
    type: string;
    consumerNumber?: string;
    description: string;
    priority?: string;
  }) => {
    return apiRequest('/service-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getRequests: async () => {
    return apiRequest('/service-requests', {
      method: 'GET',
    });
  },
};

// ============ ANNOUNCEMENTS API ============
export const announcementApi = {
  getAnnouncements: async () => {
    return apiRequest('/announcements', {
      method: 'GET',
    }, false); // Public route
  },

  // ADMIN function
  createAnnouncement: async (data: {
    title: string;
    titleMr: string;
    description: string;
    descriptionMr: string;
    type: string;
    priority: string;
  }) => {
    return apiRequest(
      '/announcements',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      true, // This should be secured with an admin/service key
    );
  },
};

// --- COMBINED DATA FUNCTIONS (from BUILD_FIX_SUMMARY.md) ---
// These combine multiple API calls for the hooks

export const authApi_ext = {
  ...authApi,
  getProfileWithConsumers: async (): Promise<ApiResponse> => {
    try {
      const profileResponse = await authApi.getProfile();
      if (profileResponse.error) return profileResponse;

      const consumersResponse = await consumerApi.getConsumers();
      if (consumersResponse.error) {
        console.warn("Could not fetch consumers, returning profile only.", consumersResponse.error);
        return {
          data: {
            profile: profileResponse.data?.profile || null,
            consumers: [], // Return empty array on error
          },
        };
      }

      return {
        data: {
          profile: profileResponse.data?.profile || null,
          consumers: consumersResponse.data?.consumers || [],
        },
      };
    } catch (error: any) {
      return {
        error: error.message || 'Failed to fetch profile and consumers',
      };
    }
  },
};
// Re-export with the combined function
export { authApi_ext as authApi };


export const consumerApi_ext = {
  ...consumerApi,
  getConsumerBillsAndUsage: async (consumerNumber: string): Promise<ApiResponse> => {
    try {
      const response = await consumerApi.getConsumerDetails(consumerNumber);
      if (response.error) return response;

      return {
        data: {
          consumer: response.data?.consumer || null,
          bills: response.data?.bills || [],
          usageHistory: response.data?.usageHistory || [],
        },
      };
    } catch (error: any) {
      return {
        error:
          error.message || 'Failed to fetch consumer details, bills, and usage',
      };
    }
  },
};
// Re-export with the combined function
export { consumerApi_ext as consumerApi };