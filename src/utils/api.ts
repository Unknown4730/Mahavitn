import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-6d937304`;

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

// Helper function to make authenticated requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth = false
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return { error: 'Not authenticated' };
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
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      return { error: errorData.error || `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API request error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// ============ AUTH API ============

export const authApi = {
  signUp: async (email: string, password: string, name: string, phone?: string) => {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, phone }),
    });
  },

  getProfile: async () => {
    return apiRequest('/auth/profile', {
      method: 'GET',
    }, true);
  },

  updateProfile: async (name: string, phone: string) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, phone }),
    }, true);
  },
};

// ============ CONSUMER API ============

export const consumerApi = {
  addConsumer: async (consumerNumber: string, name: string, address: string, category: string) => {
    return apiRequest('/consumers', {
      method: 'POST',
      body: JSON.stringify({ consumerNumber, name, address, category }),
    }, true);
  },

  getConsumers: async () => {
    return apiRequest('/consumers', {
      method: 'GET',
    }, true);
  },

  getConsumerDetails: async (consumerNumber: string) => {
    return apiRequest(`/consumers/${consumerNumber}`, {
      method: 'GET',
    }, true);
  },

  removeConsumer: async (consumerNumber: string) => {
    return apiRequest(`/consumers/${consumerNumber}`, {
      method: 'DELETE',
    }, true);
  },
};

// ============ BILL API ============

export const billApi = {
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
    return apiRequest('/bills', {
      method: 'POST',
      body: JSON.stringify(billData),
    }, true);
  },

  payBill: async (billId: string, paymentMethod: string, transactionId?: string) => {
    return apiRequest(`/bills/${billId}/pay`, {
      method: 'POST',
      body: JSON.stringify({ paymentMethod, transactionId }),
    }, true);
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
    }, true);
  },

  getRequests: async () => {
    return apiRequest('/service-requests', {
      method: 'GET',
    }, true);
  },
};

// ============ ANNOUNCEMENTS API ============

export const announcementApi = {
  getAnnouncements: async () => {
    return apiRequest('/announcements', {
      method: 'GET',
    });
  },

  createAnnouncement: async (data: {
    title: string;
    titleMr: string;
    description: string;
    descriptionMr: string;
    type: string;
    priority: string;
  }) => {
    return apiRequest('/announcements', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
  },
};

// ============ COMBINED DATA FUNCTIONS ============

/**
 * Get user profile with all consumers
 */
export async function getUserProfileWithConsumers(): Promise<ApiResponse> {
  try {
    // Get profile
    const profileResponse = await authApi.getProfile();
    if (profileResponse.error) {
      return profileResponse;
    }

    // Get consumers
    const consumersResponse = await consumerApi.getConsumers();
    if (consumersResponse.error) {
      return consumersResponse;
    }

    return {
      data: {
        profile: profileResponse.data?.profile || null,
        consumers: consumersResponse.data?.consumers || []
      }
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch profile'
    };
  }
}

/**
 * Get consumer details with bills and usage history
 */
export async function getConsumerBillsAndUsage(consumerNumber: string): Promise<ApiResponse> {
  try {
    const response = await consumerApi.getConsumerDetails(consumerNumber);
    
    if (response.error) {
      return response;
    }

    return {
      data: {
        consumer: response.data?.consumer || null,
        bills: response.data?.bills || [],
        usageHistory: response.data?.usageHistory || []
      }
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch consumer details'
    };
  }
}
