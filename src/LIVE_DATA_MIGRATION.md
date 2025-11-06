# Live Data Migration Guide
## Connecting Mahavitaran to Supabase with Live Database

**Date**: November 4, 2025  
**Consumer Number Format**: 12 digits (e.g., 266511869340)  
**Test User**: Kolhapur user with 2 consumer accounts

---

## Overview

This migration removes all mock/example data and connects the application to Supabase for real-time data management.

---

## Database Schema

### User Profile
```typescript
{
  userId: string;          // Supabase Auth User ID
  email: string;
  name: string;
  phone: string;
  consumers: string[];     // Array of 12-digit consumer numbers
  createdAt: string;
  updatedAt?: string;
}
```

### Consumer Account
```typescript
{
  consumerNumber: string;  // 12 digits (e.g., "266511869340")
  userId: string;          // Owner's user ID
  name: string;            // Consumer name
  address: string;         // Full address
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Agricultural';
  status: 'Active' | 'Inactive' | 'Suspended';
  createdAt: string;
}
```

### Bill
```typescript
{
  billId: string;              // Format: {consumerNumber}:{YYYY-MM}
  consumerNumber: string;      // 12 digits
  month: number;               // 1-12
  year: number;
  previousReading: number;
  currentReading: number;
  unitsConsumed: number;
  amount: number;
  dueDate: string;            // ISO date
  billDate: string;           // ISO date
  status: 'Paid' | 'Unpaid' | 'Overdue';
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
}
```

### Usage History
```typescript
{
  consumerNumber: string;  // 12 digits
  month: string;           // Format: YYYY-MM-01
  units: number;
  amount: number;
}
```

### Service Request
```typescript
{
  requestId: string;          // Format: REQ{timestamp}
  userId: string;
  consumerNumber?: string;    // Optional
  type: string;              // 'outage', 'new_connection', 'meter_issue', etc.
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
}
```

### Announcement
```typescript
{
  id: string;                // Format: ANN{timestamp}
  title: string;
  titleMr: string;           // Marathi title
  description: string;
  descriptionMr: string;     // Marathi description
  type: 'info' | 'warning' | 'maintenance' | 'important';
  priority: 'high' | 'medium' | 'low';
  date: string;              // ISO date
  createdAt: string;
}
```

---

## Test Data Created

### Kolhapur User
- **Email**: kolhapur.user@mahavitaran.com
- **Password**: Kolhapur@123
- **Name**: संजय पाटील
- **Phone**: +91 9876501234

### Consumer Account 1 (Residential)
- **Number**: 266511869340
- **Name**: संजय पाटील
- **Address**: प्लॉट नं. १२३, शिवाजी रोड, कोल्हापूर - ४१६००२
- **Category**: Residential
- **Bills**: Last 6 months (May-Oct 2025)
- **Current Reading**: 14045
- **Monthly Average**: 308 units

### Consumer Account 2 (Commercial)
- **Number**: 266511870125
- **Name**: पाटील ट्रेडर्स
- **Address**: दुकान क्र. ४५, लक्ष्मी मार्केट, रंकाळा चौक, कोल्हापूर - ४१६०१२
- **Category**: Commercial
- **Bills**: Last 6 months (May-Oct 2025)
- **Current Reading**: 49485
- **Monthly Average**: 714 units

---

## API Endpoints (Already Implemented)

### Authentication
- `POST /auth/signup` - Create new user
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

### Consumers
- `POST /consumers` - Add consumer to user account
- `GET /consumers` - Get all user's consumers with latest bills
- `GET /consumers/:consumerNumber` - Get consumer details with bill/usage history

### Bills
- `POST /bills` - Create bill (admin/system)
- `POST /bills/:billId/pay` - Pay a bill

### Service Requests
- `POST /service-requests` - Create service request
- `GET /service-requests` - Get user's service requests

### Announcements
- `GET /announcements` - Get all announcements (public)
- `POST /announcements` - Create announcement (admin)

---

## Components to Update

### 1. Dashboard.tsx ✅ Needs Update
**Current**: Uses mockConsumers, mockUsageData, mockAnnouncements
**Update to**:
- Fetch consumers from API on mount
- Fetch announcements from API
- Calculate usage data from bill history
- Handle loading/error states
- Support consumer switching

### 2. ProfilePage.tsx ✅ Needs Update
**Current**: Uses mockUserProfile, mockConsumers
**Update to**:
- Fetch user profile from API
- Fetch user's consumers from API
- Update profile via API
- Add/remove consumers via API

### 3. PaymentPage.tsx ✅ Needs Update
**Current**: Uses mockConsumers
**Update to**:
- Fetch consumer's unpaid bills
- Submit payment via API
- Show payment confirmation

### 4. ServicesPage.tsx ✅ Needs Update
**Current**: No backend integration
**Update to**:
- Submit service requests via API
- Show request confirmation
- Track request status

### 5. RegistrationPage.tsx ✅ Already Updated
- Uses Supabase auth API ✅
- Creates user profile ✅

### 6. LoginPage.tsx ✅ Already Updated
- Uses Supabase auth ✅
- Stores access token ✅

---

## Migration Steps

### Step 1: Initialize Live Data ✅ Created
File: `/utils/liveDataSeed.ts`
- Creates Kolhapur user
- Adds 2 consumer accounts
- Creates 6 months of bills for each
- Seeds announcements

### Step 2: Update Dashboard Component
- Remove mockData imports
- Add useEffect to fetch data on mount
- Add loading skeleton
- Add error handling
- Update consumer selector
- Fetch announcements from API

### Step 3: Update ProfilePage Component
- Fetch user profile from API
- Display real consumer accounts
- Enable profile editing
- Add consumer management

### Step 4: Update PaymentPage Component
- Fetch consumer bills from API
- Enable bill payment
- Show payment history

### Step 5: Update ServicesPage Component
- Connect service request form to API
- Show submission confirmation
- Add request tracking

### Step 6: Remove Mock Data File
- Delete or deprecate mockData.ts
- Ensure no components import it

---

## Consumer Number Validation

All consumer numbers must be **exactly 12 digits**.

**Valid Examples**:
- 266511869340
- 266511870125
- 123456789012

**Invalid Examples**:
- MH123456789 (contains letters)
- 12345678901 (only 11 digits)
- 1234567890123 (13 digits)

**Validation Function** (already in API):
```typescript
if (!/^\d{12}$/.test(consumerNumber)) {
  return { error: 'Consumer number must be exactly 12 digits' };
}
```

---

## Running the Migration

### 1. Seed Live Data
```typescript
import { initializeLiveData } from './utils/liveDataSeed';

// Run once to create test data
await initializeLiveData();
```

### 2. Login with Test User
```
Email: kolhapur.user@mahavitaran.com
Password: Kolhapur@123
```

### 3. Verify Data
- Dashboard shows 2 consumer accounts
- Bills display correctly
- Usage charts show 6 months of data
- Announcements loaded from database

---

## Benefits of Live Data

### Data Persistence ✅
- User data survives page refreshes
- Bills and payments tracked in database
- Service requests stored permanently

### Multi-User Support ✅
- Multiple users can register
- Each user has their own consumers
- Data isolation per user

### Real-time Updates ✅
- Changes reflect immediately
- Bill payments update status
- New consumers appear in list

### Scalability ✅
- Supports unlimited users
- Supports unlimited consumers per user
- Efficient data queries

### Production Ready ✅
- No mock data in production
- Real authentication
- Secure data storage
- API-driven architecture

---

## Testing Checklist

### User Registration
- [ ] New user can register
- [ ] User profile created in database
- [ ] Can login after registration

### Consumer Management
- [ ] Can add consumer (12 digits)
- [ ] Consumer appears in dashboard
- [ ] Can view consumer details
- [ ] Can switch between consumers

### Bills & Payments
- [ ] Bills display correctly
- [ ] Usage history shows 6 months
- [ ] Can pay bill
- [ ] Bill status updates to "Paid"

### Service Requests
- [ ] Can submit outage report
- [ ] Can submit new connection request
- [ ] Request saved to database
- [ ] Can view request history

### Announcements
- [ ] Announcements display on dashboard
- [ ] Both English and Marathi content shown
- [ ] Sorted by date (newest first)

---

## Rollback Plan

If issues arise, rollback by:

1. Keep mockData.ts file
2. Revert component imports to use mockData
3. Disable API calls in components
4. Test with mock data

```typescript
// Rollback example for Dashboard
import { mockConsumers, mockUsageData } from './mockData';

// Instead of:
// const consumers = await fetchConsumersFromAPI();
const consumers = mockConsumers;
```

---

## Production Deployment

### Pre-deployment
1. Test all API endpoints
2. Verify data persistence
3. Test with multiple users
4. Check error handling
5. Verify loading states

### Deployment
1. Deploy server functions to Supabase
2. Update environment variables
3. Run seed script for initial announcements
4. Create admin user if needed

### Post-deployment
1. Monitor error logs
2. Check API response times
3. Verify user registrations
4. Test bill payments
5. Monitor database usage

---

## Next Steps

1. ✅ Create liveDataSeed.ts
2. ✅ Update API helper functions
3. ⏳ Update Dashboard component
4. ⏳ Update ProfilePage component
5. ⏳ Update PaymentPage component
6. ⏳ Update ServicesPage component
7. ⏳ Test end-to-end flow
8. ⏳ Remove/deprecate mockData.ts

---

**Status**: In Progress  
**Priority**: High  
**Est. Completion**: 2-3 hours
