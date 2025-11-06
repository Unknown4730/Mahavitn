# Mahavitaran API Reference
## Complete Backend API Documentation

**Base URL**: `https://{projectId}.supabase.co/functions/v1/make-server-ee8e359e`  
**Version**: 1.0  
**Authentication**: Bearer Token

---

## 🔐 Authentication

### Sign Up
Create a new user account.

**Endpoint**: `POST /auth/signup`  
**Authentication**: None

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "User Name",
  "phone": "+91 9876543210"
}
```

**Response** (200 OK):
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Errors**:
- `400`: Email, password, or name missing
- `400`: Email already registered

---

### Get Profile
Retrieve the authenticated user's profile.

**Endpoint**: `GET /auth/profile`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer {access_token}
```

**Response** (200 OK):
```json
{
  "profile": {
    "userId": "uuid-here",
    "email": "user@example.com",
    "name": "User Name",
    "phone": "+91 9876543210",
    "consumers": ["266511869340", "266511870125"],
    "createdAt": "2025-11-04T10:00:00.000Z"
  }
}
```

**Errors**:
- `401`: Unauthorized (invalid or missing token)
- `404`: Profile not found

---

### Update Profile
Update user profile information.

**Endpoint**: `PUT /auth/profile`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer {access_token}
```

**Request Body**:
```json
{
  "name": "Updated Name",
  "phone": "+91 9999999999"
}
```

**Response** (200 OK):
```json
{
  "profile": {
    "userId": "uuid-here",
    "email": "user@example.com",
    "name": "Updated Name",
    "phone": "+91 9999999999",
    "consumers": ["266511869340"],
    "updatedAt": "2025-11-04T10:30:00.000Z"
  }
}
```

---

## 🏠 Consumer Management

### Add Consumer
Link a consumer account to your profile.

**Endpoint**: `POST /consumers`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer {access_token}
```

**Request Body**:
```json
{
  "consumerNumber": "266511869340",
  "name": "संजय पाटील",
  "address": "प्लॉट नं. १२३, शिवाजी रोड, कोल्हापूर - ४१६००२",
  "category": "Residential"
}
```

**Categories**: `Residential`, `Commercial`, `Industrial`, `Agricultural`

**Response** (200 OK):
```json
{
  "consumer": {
    "consumerNumber": "266511869340",
    "userId": "uuid-here",
    "name": "संजय पाटील",
    "address": "प्लॉट नं. १२३, शिवाजी रोड, कोल्हापूर - ४१६००२",
    "category": "Residential",
    "status": "Active",
    "createdAt": "2025-11-04T10:00:00.000Z"
  }
}
```

**Errors**:
- `400`: Consumer number is required
- `400`: Consumer number already registered
- `401`: Unauthorized

---

### Get All Consumers
Get all consumers linked to your account.

**Endpoint**: `GET /consumers`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer {access_token}
```

**Response** (200 OK):
```json
{
  "consumers": [
    {
      "consumerNumber": "266511869340",
      "userId": "uuid-here",
      "name": "संजय पाटील",
      "address": "प्लॉट नं. १२३, शिवाजी रोड, कोल्हापूर - ४१६००२",
      "category": "Residential",
      "status": "Active",
      "createdAt": "2025-11-04T10:00:00.000Z",
      "currentBill": {
        "billId": "266511869340:2025-10",
        "unitsConsumed": 298,
        "amount": 2980,
        "dueDate": "2025-11-25T00:00:00.000Z",
        "status": "Unpaid"
      }
    },
    {
      "consumerNumber": "266511870125",
      "userId": "uuid-here",
      "name": "पाटील ट्रेडर्स",
      "address": "दुकान क्र. ४५, लक्ष्मी मार्केट, रंकाळा चौक, कोल्हापूर - ४१६०१२",
      "category": "Commercial",
      "status": "Active",
      "createdAt": "2025-11-04T10:00:00.000Z",
      "currentBill": {
        "billId": "266511870125:2025-10",
        "unitsConsumed": 720,
        "amount": 10800,
        "dueDate": "2025-11-25T00:00:00.000Z",
        "status": "Unpaid"
      }
    }
  ]
}
```

**Empty Response**:
```json
{
  "consumers": []
}
```

---

### Get Consumer Details
Get detailed information for a specific consumer.

**Endpoint**: `GET /consumers/{consumerNumber}`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer {access_token}
```

**Example**: `GET /consumers/266511869340`

**Response** (200 OK):
```json
{
  "consumer": {
    "consumerNumber": "266511869340",
    "userId": "uuid-here",
    "name": "संजय पाटील",
    "address": "प्लॉट नं. १२३, शिवाजी रोड, कोल्हापूर - ४१६००२",
    "category": "Residential",
    "status": "Active",
    "createdAt": "2025-11-04T10:00:00.000Z"
  },
  "bills": [
    {
      "billId": "266511869340:2025-10",
      "consumerNumber": "266511869340",
      "month": 10,
      "year": 2025,
      "previousReading": 13747,
      "currentReading": 14045,
      "unitsConsumed": 298,
      "amount": 2980,
      "dueDate": "2025-11-25T00:00:00.000Z",
      "billDate": "2025-11-04T10:00:00.000Z",
      "status": "Unpaid",
      "createdAt": "2025-11-04T10:00:00.000Z"
    }
  ],
  "usageHistory": [
    {
      "consumerNumber": "266511869340",
      "month": "2025-10-01",
      "units": 298,
      "amount": 2980
    },
    {
      "consumerNumber": "266511869340",
      "month": "2025-09-01",
      "units": 320,
      "amount": 3200
    }
  ]
}
```

**Errors**:
- `404`: Consumer not found
- `403`: Access denied (not your consumer)

---

## 💰 Billing

### Create Bill
Create a new bill for a consumer (Admin/System function).

**Endpoint**: `POST /bills`  
**Authentication**: None (Public endpoint for system)

**Request Body**:
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

**Response** (200 OK):
```json
{
  "bill": {
    "billId": "266511869340:2025-10",
    "consumerNumber": "266511869340",
    "month": 10,
    "year": 2025,
    "previousReading": 13747,
    "currentReading": 14045,
    "unitsConsumed": 298,
    "amount": 2980,
    "dueDate": "2025-11-25T00:00:00.000Z",
    "billDate": "2025-11-04T10:00:00.000Z",
    "status": "Unpaid",
    "createdAt": "2025-11-04T10:00:00.000Z"
  }
}
```

**Auto-Generated**:
- `billId`: `{consumerNumber}:{year}-{month}`
- `billDate`: Current timestamp
- `status`: "Unpaid"

---

### Pay Bill
Mark a bill as paid.

**Endpoint**: `POST /bills/{billId}/pay`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer {access_token}
```

**Example**: `POST /bills/266511869340:2025-10/pay`

**Request Body**:
```json
{
  "paymentMethod": "UPI",
  "transactionId": "TXN1234567890"
}
```

**Payment Methods**: `UPI`, `Net Banking`, `Debit Card`, `Credit Card`, `Cash`

**Response** (200 OK):
```json
{
  "message": "Payment successful",
  "payment": {
    "paymentId": "PAY1730716800000",
    "billId": "266511869340:2025-10",
    "consumerNumber": "266511869340",
    "amount": 2980,
    "paymentMethod": "UPI",
    "transactionId": "TXN1234567890",
    "paymentDate": "2025-11-04T10:00:00.000Z",
    "userId": "uuid-here"
  },
  "bill": {
    "billId": "266511869340:2025-10",
    "consumerNumber": "266511869340",
    "status": "Paid",
    "paymentDate": "2025-11-04T10:00:00.000Z",
    "paymentMethod": "UPI",
    "transactionId": "TXN1234567890"
  }
}
```

**Errors**:
- `404`: Bill not found
- `403`: Access denied (not your consumer's bill)

---

## 🛠️ Service Requests

### Create Service Request
Submit a service request.

**Endpoint**: `POST /service-requests`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer {access_token}
```

**Request Body**:
```json
{
  "type": "outage",
  "consumerNumber": "266511869340",
  "description": "Power outage in my area since 2 hours",
  "priority": "high"
}
```

**Types**: 
- `outage` - Power outage
- `new_connection` - New connection request
- `meter_issue` - Meter problem
- `billing_query` - Billing question
- `other` - Other issues

**Priorities**: `high`, `medium`, `low`

**Response** (200 OK):
```json
{
  "message": "Service request created successfully",
  "serviceRequest": {
    "requestId": "REQ1730716800000",
    "userId": "uuid-here",
    "consumerNumber": "266511869340",
    "type": "outage",
    "description": "Power outage in my area since 2 hours",
    "priority": "high",
    "status": "pending",
    "createdAt": "2025-11-04T10:00:00.000Z",
    "updatedAt": "2025-11-04T10:00:00.000Z"
  }
}
```

**Auto-Generated**:
- `requestId`: `REQ{timestamp}`
- `status`: "pending"

---

### Get Service Requests
Get all your service requests.

**Endpoint**: `GET /service-requests`  
**Authentication**: Required

**Headers**:
```
Authorization: Bearer {access_token}
```

**Response** (200 OK):
```json
{
  "serviceRequests": [
    {
      "requestId": "REQ1730716800000",
      "userId": "uuid-here",
      "consumerNumber": "266511869340",
      "type": "outage",
      "description": "Power outage in my area since 2 hours",
      "priority": "high",
      "status": "pending",
      "createdAt": "2025-11-04T10:00:00.000Z",
      "updatedAt": "2025-11-04T10:00:00.000Z"
    }
  ]
}
```

---

## 📢 Announcements

### Get Announcements
Get all system announcements.

**Endpoint**: `GET /announcements`  
**Authentication**: None (Public)

**Response** (200 OK):
```json
{
  "announcements": [
    {
      "id": "ANN1730716800000",
      "title": "Scheduled Maintenance - Kolhapur Region",
      "titleMr": "नियोजित देखभाल - कोल्हापूर क्षेत्र",
      "description": "Power supply will be interrupted on Nov 15, 2025...",
      "descriptionMr": "देखभाल कामासाठी 15 नोव्हेंबर 2025 रोजी...",
      "type": "maintenance",
      "priority": "high",
      "date": "2025-11-04T10:00:00.000Z",
      "createdAt": "2025-11-04T10:00:00.000Z"
    }
  ]
}
```

**Types**: `info`, `warning`, `maintenance`, `important`  
**Priorities**: `high`, `medium`, `low`

---

### Create Announcement
Create a new announcement (Admin only).

**Endpoint**: `POST /announcements`  
**Authentication**: None (Should be protected in production)

**Request Body**:
```json
{
  "title": "New Solar Policy",
  "titleMr": "नवीन सौर धोरण",
  "description": "New benefits for rooftop solar installations",
  "descriptionMr": "छतावरील सौर प्रतिष्ठापनांसाठी नवीन फायदे",
  "type": "info",
  "priority": "medium"
}
```

**Response** (200 OK):
```json
{
  "announcement": {
    "id": "ANN1730716800000",
    "title": "New Solar Policy",
    "titleMr": "नवीन सौर धोरण",
    "description": "New benefits for rooftop solar installations",
    "descriptionMr": "छतावरील सौर प्रतिष्ठापनांसाठी नवीन फायदे",
    "type": "info",
    "priority": "medium",
    "date": "2025-11-04T10:00:00.000Z",
    "createdAt": "2025-11-04T10:00:00.000Z"
  }
}
```

---

## 🏥 Health Check

### Server Health
Check if the server is running.

**Endpoint**: `GET /health`  
**Authentication**: None

**Response** (200 OK):
```json
{
  "status": "ok",
  "timestamp": "2025-11-04T10:00:00.000Z"
}
```

---

## 🔑 Authentication Flow

### Complete Login Flow

```javascript
// 1. Sign Up
const signupResponse = await fetch(`${API_URL}/auth/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'Password123',
    name: 'User Name',
    phone: '+91 9876543210'
  })
});

// 2. Login with Supabase Auth
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'Password123'
});

const accessToken = data.session.access_token;

// 3. Use access token for API calls
const profileResponse = await fetch(`${API_URL}/auth/profile`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const profile = await profileResponse.json();
```

---

## 📊 Example Usage Scenarios

### Scenario 1: New User Registration

```javascript
// 1. Sign up
await fetch(`${API_URL}/auth/signup`, {
  method: 'POST',
  body: JSON.stringify({
    email: 'new.user@example.com',
    password: 'SecurePass123',
    name: 'राहुल शर्मा',
    phone: '+91 9998887776'
  })
});

// 2. Login
const { data } = await supabase.auth.signInWithPassword({
  email: 'new.user@example.com',
  password: 'SecurePass123'
});

// 3. Add consumer
await fetch(`${API_URL}/consumers`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${data.session.access_token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    consumerNumber: '266511999999',
    name: 'राहुल शर्मा',
    address: 'अपार्टमेंट ५०१, पुणे',
    category: 'Residential'
  })
});
```

---

### Scenario 2: View Bills

```javascript
// Get consumer details with bills
const response = await fetch(
  `${API_URL}/consumers/266511869340`,
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }
);

const { consumer, bills, usageHistory } = await response.json();

console.log('Latest Bill:', bills[0]);
console.log('Usage History:', usageHistory);
```

---

### Scenario 3: Pay Bill

```javascript
// Pay a bill
const paymentResponse = await fetch(
  `${API_URL}/bills/266511869340:2025-10/pay`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      paymentMethod: 'UPI',
      transactionId: 'UPI123456789'
    })
  }
);

const { payment, bill } = await paymentResponse.json();
console.log('Payment successful:', payment);
console.log('Bill status:', bill.status); // "Paid"
```

---

## 🚨 Error Responses

### Standard Error Format
```json
{
  "error": "Error message here"
}
```

### Common HTTP Status Codes
- `200` - Success
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (access denied)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔗 Base URL Configuration

**Development**:
```
https://{projectId}.supabase.co/functions/v1/make-server-ee8e359e
```

**Get Project ID**:
```javascript
import { projectId } from './utils/supabase/info';
const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ee8e359e`;
```

---

**Version**: 1.0  
**Last Updated**: November 4, 2025  
**Status**: Production Ready
