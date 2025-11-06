/**
 * Application Configuration
 * Centralized configuration for the Mahavitaran application
 */

export const config = {
  /**
   * Consumer Number Configuration
   * 266511869340 is an example consumer number (12 digits)
   */
  consumerNumber: {
    // Number of digits for consumer number validation
    length: 12,
    
    // Pattern for validation (12 digits)
    pattern: /^\d{12}$/,
    
    // Example consumer numbers for reference
    examples: [
      '266511869340', // Residential - Kolhapur (संजय पाटील)
      '266511870125', // Commercial - Kolhapur (पाटील ट्रेडर्स)
    ],
    
    // Prefix format
    prefixInfo: {
      area: '2665',      // Kolhapur area code
      subDivision: '11', // Sub-division code
      sequence: '869340' // Sequence number
    }
  },
  
  /**
   * Bill Configuration
   */
  billing: {
    // Cost per unit (in INR)
    costPerUnit: {
      residential: 10,
      commercial: 15,
      industrial: 12,
      agricultural: 7
    },
    
    // Fixed charges per category
    fixedCharges: {
      residential: 150,
      commercial: 300,
      industrial: 500,
      agricultural: 100
    },
    
    // Tax percentage
    taxPercentage: 10,
    
    // Due date days from bill date
    dueDateDays: 15
  },
  
  /**
   * Data Display Configuration
   */
  display: {
    // Number of months to show in usage history
    usageHistoryMonths: 6,
    
    // Number of announcements to show
    maxAnnouncements: 5,
    
    // Currency settings
    currency: {
      code: 'INR',
      locale: 'en-IN',
      symbol: '₹'
    }
  },
  
  /**
   * Validation Rules
   */
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+91)?[6-9]\d{9}$/,
    password: {
      minLength: 8,
      requireUppercase: false,
      requireLowercase: false,
      requireNumber: false,
      requireSpecial: false
    }
  }
};

/**
 * Helper function to validate consumer number
 */
export function validateConsumerNumber(number: string): boolean {
  return config.consumerNumber.pattern.test(number);
}

/**
 * Helper function to format consumer number for display
 */
export function formatConsumerNumber(number: string): string {
  // Format as: 2665-11-869340
  if (number.length !== config.consumerNumber.length) {
    return number;
  }
  
  return `${number.slice(0, 4)}-${number.slice(4, 6)}-${number.slice(6)}`;
}

/**
 * Helper function to get consumer number length
 */
export function getConsumerNumberLength(): number {
  return config.consumerNumber.length;
}

/**
 * Helper function to get consumer number error message
 */
export function getConsumerNumberErrorMessage(language: 'en' | 'mr'): string {
  const length = config.consumerNumber.length;
  
  if (language === 'mr') {
    return `ग्राहक क्रमांक ${length} अंकी असावा`;
  }
  
  return `Consumer number must be exactly ${length} digits`;
}
