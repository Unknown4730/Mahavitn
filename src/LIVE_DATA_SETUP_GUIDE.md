# Live Data Setup Guide
## Complete Migration to Supabase Live Database

**Date**: November 4, 2025  
**Version**: 1.0  
**Status**: Production Ready

---

## 📋 Overview

This guide covers the complete setup and usage of the live Supabase database for the Mahavitaran application. All mock data has been removed and replaced with real-time database integration.

---

## 🎯 Key Features

### 1. **Live Database Integration**
- ✅ All user data stored in Supabase
- ✅ Real-time consumer account management
- ✅ Dynamic bill generation and tracking
- ✅ Live usage history and analytics
- ✅ Announcement system

### 2. **Configurable Consumer Numbers**
- **Length**: 12 digits (configurable in `/utils/config.ts`)
- **Example**: 266511869340
- **Format**: Area code (4) + Sub-division (2) + Sequence (6)
- **Validation**: Automatic validation using pattern matching

### 3. **Multi-Consumer Support**
- Users can have multiple consumer accounts
- Each consumer can have different categories (Residential, Commercial, Industrial, Agricultural)
- Separate billing for each consumer
- Individual usage tracking

---

## 🚀 Quick Start

### Step 1: Initialize Database

Access the data initializer to create test data:

```
Navigate to: http://localhost:3000 (or your domain)
```

Add `#data-init` to the URL:
```
http://localhost:3000#data-init
```

Or programmatically:
```javascript
// In App.tsx, navigate to 'data-init' page
onPageChange('data-init')
```

### Step 2: Create Test Data

Click **"Initialize Test Data"** button. This will create:

1. **Test User**:
   - Name: संजय पाटील (Sanjay Patil)
   - Email: kolhapur.user@mahavitaran.com
   - Password: Kolhapur@123
   - Location: Kolhapur, Maharashtra

2. **Consumer Account 1** (Residential):
   - Number: 266511869340
   - Address: प्लॉट नं. १२३, शिवाजी रोड, कोल्हापूर - ४१६००२
   - Category: Residential
   - 6 months of bill history

3. **Consumer Account 2** (Commercial):
   - Number: 266511870125
   - Address: दुकान क्र. ४५, लक्ष्मी मार्केट, रंकाळा चौक, कोल्हापूर - ४१६०१२
   - Category: Commercial
   - 6 months of bill history

4. **5 System Announcements**:
   - Scheduled maintenance
   - Solar policy
   - Diwali special
   - Energy conservation
   - Mobile number update

### Step 3: Login

Use the credentials:
- **Email**: kolhapur.user@mahavitaran.com
- **Password**: Kolhapur@123

### Step 4: Explore Dashboard

You'll see:
- Both consumer accounts
- Real-time bill data
- Usage charts (last 6 months)
- Current bill status
- Announcements

---

## 🔧 Configuration

### Consumer Number Settings

Edit `/utils/config.ts`:

```typescript
export const config = {
  consumerNumber: {
    // Change this to modify digit length
    length: 12,
    
    // Pattern is auto-generated based on length
    pattern: /^\d{12}$/,
    
    // Examples for reference
    examples: [
      '266511869340',
      '266511870125',
    ]
  }
}
```

**To change to 10 digits**:
```typescript
consumerNumber: {
  length: 10,
  pattern: /^\d{10}$/,
}
```

**To change to 14 digits**:
```typescript
consumerNumber: {
  length: 14,
  pattern: /^\d{14}$/,
}
```

### Billing Configuration

```typescript
billing: {
  costPerUnit: {
    residential: 10,    // ₹10 per unit
    commercial: 15,     // ₹15 per unit
    industrial: 12,     // ₹12 per unit
    agricultural: 7     // ₹7 per unit
  },
  
  fixedCharges: {
    residential: 150,   // ₹150 fixed charge
    commercial: 300,
    industrial: 500,
    agricultural: 100
  },
  
  taxPercentage: 10,    // 10% tax
  dueDateDays: 15       // 15 days to pay
}
```

---

## 📊 Database Schema

### Collections in KV Store

#### 1. Users
**Key**: `user:{userId}`
```typescript
{
  userId: string;
  email: string;
  name: string;
  phone: string;
  consumers: string[];        // Array of consumer numbers
  createdAt: string;
  updatedAt?: string;
}
```

#### 2. Consumers
**Key**: `consumer:{consumerNumber}`
```typescript
{
  consumerNumber: string;     // 12-digit number
  userId: string;             // Owner's user ID
  name: string;               // Consumer name
  address: string;            // Full address
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Agricultural';
  status: 'Active' | 'Inactive';
  createdAt: string;
}
```

#### 3. Bills
**Key**: `bill:{consumerNumber}:{year}-{month}`
```typescript
{
  billId: string;             // Format: {consumerNumber}:{year}-{month}
  consumerNumber: string;
  month: number;              // 1-12
  year: number;               // e.g., 2025
  previousReading: number;    // Meter reading start
  currentReading: number;     // Meter reading end
  unitsConsumed: number;      // Difference
  amount: number;             // Total bill amount
  dueDate: string;            // ISO date
  billDate: string;           // ISO date
  status: 'Paid' | 'Unpaid' | 'Overdue';
  paymentDate?: string;       // If paid
  paymentMethod?: string;     // If paid
  transactionId?: string;     // If paid
  createdAt: string;
}
```

#### 4. Usage History
**Key**: `usage:{consumerNumber}:{year}-{month}`
```typescript
{
  consumerNumber: string;
  month: string;              // Format: YYYY-MM-01
  units: number;
  amount: number;
}
```

#### 5. Announcements
**Key**: `announcement:{announcementId}`
```typescript
{
  id: string;
  title: string;
  titleMr: string;            // Marathi translation
  description: string;
  descriptionMr: string;
  type: 'info' | 'warning' | 'maintenance' | 'important';
  priority: 'high' | 'medium' | 'low';
  date: string;
  createdAt: string;
}
```

#### 6. Service Requests
**Key**: `service-request:{requestId}`
```typescript
{
  requestId: string;
  userId: string;
  consumerNumber?: string;
  type: 'outage' | 'new_connection' | 'meter_issue' | 'billing_query' | 'other';
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
}
```

#### 7. Payments
**Key**: `payment:{paymentId}`
```typescript
{
  paymentId: string;
  billId: string;
  consumerNumber: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  userId: string;
}
```

---

## 🔌 API Endpoints

### Authentication

#### Sign Up
```
POST /make-server-ee8e359e/auth/signup
```
**Body**:
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "name": "User Name",
  "phone": "+91 9876543210"
}
```

#### Get Profile
```
GET /make-server-ee8e359e/auth/profile
Headers: Authorization: Bearer {access_token}
```

#### Update Profile
```
PUT /make-server-ee8e359e/auth/profile
Headers: Authorization: Bearer {access_token}
```
**Body**:
```json
{
  "name": "Updated Name",
  "phone": "+91 9876543210"
}
```

### Consumer Management

#### Add Consumer
```
POST /make-server-ee8e359e/consumers
Headers: Authorization: Bearer {access_token}
```
**Body**:
```json
{
  "consumerNumber": "266511869340",
  "name": "Consumer Name",
  "address": "Full Address",
  "category": "Residential"
}
```

#### Get All Consumers
```
GET /make-server-ee8e359e/consumers
Headers: Authorization: Bearer {access_token}
```

#### Get Consumer Details
```
GET /make-server-ee8e359e/consumers/{consumerNumber}
Headers: Authorization: Bearer {access_token}
```

### Billing

#### Create Bill (Admin/System)
```
POST /make-server-ee8e359e/bills
```
**Body**:
```json
{
  "consumerNumber": "266511869340",
  "month": 10,
  "year": 2025,
  "previousReading": 13747,
  "currentReading": 14045,
  "unitsConsumed": 298,
  "amount": 2980,
  "dueDate": "2025-11-25T00:00:00.000Z"
}
```

#### Pay Bill
```
POST /make-server-ee8e359e/bills/{billId}/pay
Headers: Authorization: Bearer {access_token}
```
**Body**:
```json
{
  "paymentMethod": "UPI",
  "transactionId": "TXN123456789"
}
```

### Service Requests

#### Create Service Request
```
POST /make-server-ee8e359e/service-requests
Headers: Authorization: Bearer {access_token}
```
**Body**:
```json
{
  "type": "outage",
  "consumerNumber": "266511869340",
  "description": "Power outage in my area",
  "priority": "high"
}
```

#### Get Service Requests
```
GET /make-server-ee8e359e/service-requests
Headers: Authorization: Bearer {access_token}
```

### Announcements

#### Get All Announcements
```
GET /make-server-ee8e359e/announcements
```

#### Create Announcement (Admin)
```
POST /make-server-ee8e359e/announcements
```
**Body**:
```json
{
  "title": "New Policy",
  "titleMr": "नवीन धोरण",
  "description": "Description here",
  "descriptionMr": "येथे वर्णन",
  "type": "info",
  "priority": "medium"
}
```

---

## 🎨 React Hooks for Live Data

### useConsumers()
Fetch all consumers for the logged-in user.

```typescript
import { useConsumers } from './hooks/useLiveData';

function MyComponent() {
  const { consumers, loading, error, refetch } = useConsumers();
  
  if (loading) return <Skeleton />;
  if (error) return <Alert>{error}</Alert>;
  
  return (
    <div>
      {consumers.map(consumer => (
        <ConsumerCard key={consumer.consumerNumber} consumer={consumer} />
      ))}
    </div>
  );
}
```

### useConsumerDetails(consumerNumber)
Fetch detailed information for a specific consumer.

```typescript
import { useConsumerDetails } from './hooks/useLiveData';

function ConsumerPage({ consumerNumber }) {
  const { consumer, bills, usageHistory, loading, error } = useConsumerDetails(consumerNumber);
  
  if (loading) return <Skeleton />;
  if (error) return <Alert>{error}</Alert>;
  
  return (
    <div>
      <h2>{consumer.name}</h2>
      <BillsList bills={bills} />
      <UsageChart data={usageHistory} />
    </div>
  );
}
```

### useAnnouncements()
Fetch system announcements.

```typescript
import { useAnnouncements } from './hooks/useLiveData';

function AnnouncementsSection() {
  const { announcements, loading, error, refetch } = useAnnouncements();
  
  return (
    <div>
      {announcements.map(announcement => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
}
```

### useUserProfile()
Fetch user profile with consumers.

```typescript
import { useUserProfile } from './hooks/useLiveData';

function ProfilePage() {
  const { profile, consumers, loading, error, refetch } = useUserProfile();
  
  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
      <ConsumersList consumers={consumers} />
    </div>
  );
}
```

---

## 💡 Helper Functions

### formatCurrency(amount)
```typescript
import { formatCurrency } from './hooks/useLiveData';

formatCurrency(2850); // "₹2,850"
```

### formatMonthName(month, language)
```typescript
import { formatMonthName } from './hooks/useLiveData';

formatMonthName('2025-10-01', 'en');  // "Oct"
formatMonthName('2025-10-01', 'mr');  // "ऑक्टो"
```

### validateConsumerNumber(number)
```typescript
import { validateConsumerNumber } from './utils/config';

validateConsumerNumber('266511869340');  // true
validateConsumerNumber('12345');         // false
```

### formatConsumerNumber(number)
```typescript
import { formatConsumerNumber } from './utils/config';

formatConsumerNumber('266511869340');  // "2665-11-869340"
```

---

## 🧪 Testing the Live Data

### 1. Test User Registration
```bash
# Register a new user
POST /make-server-ee8e359e/auth/signup
{
  "email": "test@example.com",
  "password": "TestPassword123",
  "name": "Test User",
  "phone": "+91 9876543210"
}
```

### 2. Test Adding Consumer
```bash
# Login first to get access token
# Then add consumer

POST /make-server-ee8e359e/consumers
Headers: Authorization: Bearer {token}
{
  "consumerNumber": "266511999999",
  "name": "Test Consumer",
  "address": "Test Address, Mumbai - 400001",
  "category": "Residential"
}
```

### 3. Test Bill Creation
```bash
POST /make-server-ee8e359e/bills
{
  "consumerNumber": "266511999999",
  "month": 11,
  "year": 2025,
  "previousReading": 10000,
  "currentReading": 10300,
  "unitsConsumed": 300,
  "amount": 3000,
  "dueDate": "2025-12-25T00:00:00.000Z"
}
```

---

## 📝 Example: Kolhapur User Setup

The seed script creates a complete test user:

```typescript
// User
Name: संजय पाटील
Email: kolhapur.user@mahavitaran.com
Password: Kolhapur@123
Phone: +91 9876501234

// Consumer 1 (Residential)
Number: 266511869340
Name: संजय पाटील
Address: प्लॉट नं. १२३, शिवाजी रोड, कोल्हापूर - ४१६००२
Bills: 6 months (May-Oct 2025)
  - May: 285 units, ₹2,850
  - Jun: 315 units, ₹3,150
  - Jul: 335 units, ₹3,350
  - Aug: 342 units, ₹3,420
  - Sep: 320 units, ₹3,200
  - Oct: 298 units, ₹2,980

// Consumer 2 (Commercial)
Number: 266511870125
Name: पाटील ट्रेडर्स
Address: दुकान क्र. ४५, लक्ष्मी मार्केट, रंकाळा चौक, कोल्हापूर - ४१६०१२
Bills: 6 months (May-Oct 2025)
  - May: 650 units, ₹9,750
  - Jun: 730 units, ₹10,950
  - Jul: 780 units, ₹11,700
  - Aug: 720 units, ₹10,800
  - Sep: 685 units, ₹10,275
  - Oct: 720 units, ₹10,800
```

---

## 🔐 Security Best Practices

1. **Authentication**:
   - All consumer and bill routes require authentication
   - Access tokens validated on every request
   - Users can only access their own data

2. **Data Validation**:
   - Consumer numbers validated for correct format
   - Input sanitization on all API requests
   - Type checking with TypeScript

3. **Row-Level Security**:
   - Users can only view/modify their own consumers
   - Bill payment requires ownership verification
   - Service requests tied to user ID

---

## 🚨 Troubleshooting

### Issue: "Consumer number already registered"
**Solution**: The consumer number is already linked to another user. Use a different number or check if you've already added it.

### Issue: "Unauthorized" error
**Solution**: Your session has expired. Logout and login again to get a new access token.

### Issue: "Failed to fetch consumers"
**Solution**: 
1. Check if you're logged in
2. Verify Supabase backend is running
3. Check network connection
4. Review browser console for errors

### Issue: No data showing in Dashboard
**Solution**:
1. Run the Data Initializer to create test data
2. Ensure you're logged in
3. Check if consumers are added to your account
4. Refresh the page

---

## 📈 Performance Optimization

### Caching Strategy
```typescript
// Hooks automatically cache data
// Manually refetch when needed
const { consumers, refetch } = useConsumers();

// After adding a consumer
await addConsumer(data);
refetch(); // Refresh the list
```

### Lazy Loading
```typescript
// Load consumer details only when selected
const [selected, setSelected] = useState(null);
const { consumer } = useConsumerDetails(selected);

// Details only loaded when consumer is selected
```

---

## 🎯 Next Steps

1. **Add More Users**: Create additional test users with different consumer profiles
2. **Generate More Bills**: Create historical data for analytics
3. **Test Bill Payment**: Try paying bills and verify payment records
4. **Service Requests**: Create and track service requests
5. **Announcements**: Add system-wide announcements

---

## 📚 Additional Resources

- **Supabase Documentation**: https://supabase.com/docs
- **React Hooks Guide**: https://react.dev/reference/react
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

**Prepared by**: Development Team  
**Last Updated**: November 4, 2025  
**Version**: 1.0  
**Status**: ✅ Production Ready
