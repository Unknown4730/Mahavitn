# Mahavitaran Backend Setup & Usage

## Overview
The Mahavitaran website now has a fully functional backend powered by Supabase. This enables real user authentication, data persistence, and dynamic content management.

## Features Implemented

### 1. **User Authentication**
- ✅ Sign up with email/password
- ✅ Login with existing credentials  
- ✅ Session management
- ✅ Automatic email confirmation (for prototyping)

### 2. **Consumer Management**
- ✅ Add multiple consumer numbers per user
- ✅ View consumer details
- ✅ Track bill history per consumer
- ✅ Usage statistics per consumer

### 3. **Bill Management**
- ✅ Create bills (admin/system function)
- ✅ View bill history
- ✅ Pay bills online
- ✅ Payment tracking

### 4. **Service Requests**
- ✅ Submit outage reports
- ✅ Request new connections
- ✅ Billing queries
- ✅ Meter issues
- ✅ Track request status

### 5. **Announcements**
- ✅ View system announcements
- ✅ Create announcements (admin)
- ✅ Bilingual support

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `GET /auth/profile` - Get user profile (requires auth)
- `PUT /auth/profile` - Update user profile (requires auth)

### Consumers
- `POST /consumers` - Add consumer (requires auth)
- `GET /consumers` - Get user's consumers (requires auth)
- `GET /consumers/:consumerNumber` - Get consumer details (requires auth)

### Bills
- `POST /bills` - Create bill (admin)
- `POST /bills/:billId/pay` - Pay bill (requires auth)

### Service Requests
- `POST /service-requests` - Create service request (requires auth)
- `GET /service-requests` - Get user's requests (requires auth)

### Announcements
- `GET /announcements` - Get all announcements (public)
- `POST /announcements` - Create announcement (admin)

## Usage Instructions

### For Users:

1. **Register**: Click "Register" and create an account with email/password
2. **Login**: Use your credentials to log in
3. **Add Consumers**: Add your consumer numbers in the dashboard
4. **View Bills**: See your bill history and current dues
5. **Make Payments**: Pay bills online (simulated for prototype)
6. **Submit Requests**: Report outages or request services
7. **Check Announcements**: View important updates from Mahavitaran

### For Testing:

#### Create Test User:
```javascript
// Use the registration page or API:
{
  "email": "test@example.com",
  "password": "test123",
  "name": "Test User",
  "phone": "+91 9876543210"
}
```

#### Add Test Consumer:
```javascript
{
  "consumerNumber": "MH123456789",
  "name": "Test Consumer",
  "address": "123 Test Street, Pune",
  "category": "Residential"
}
```

#### Create Test Bill (requires system access):
```javascript
{
  "consumerNumber": "MH123456789",
  "month": 10,
  "year": 2025,
  "previousReading": 12000,
  "currentReading": 12285,
  "unitsConsumed": 285,
  "amount": 2850,
  "dueDate": "2025-10-25"
}
```

#### Create Announcement:
```javascript
{
  "title": "Scheduled Maintenance",
  "titleMr": "नियोजित देखभाल",
  "description": "Power supply will be interrupted...",
  "descriptionMr": "वीज पुरवठा खंडित होईल...",
  "type": "maintenance",
  "priority": "high"
}
```

## Data Storage

All data is stored in Supabase's key-value store:
- `user:{userId}` - User profiles
- `consumer:{consumerNumber}` - Consumer details
- `bill:{billId}` - Bill records
- `usage:{consumerNumber}:{month}` - Usage history
- `service-request:{requestId}` - Service requests
- `payment:{paymentId}` - Payment records
- `announcement:{announcementId}` - Announcements

## Security

- All authenticated endpoints require a valid JWT token
- User ownership is verified for consumer/bill operations
- Passwords are hashed by Supabase Auth
- CORS is enabled for cross-origin requests
- Service role key is kept secure on the server

## Frontend Integration

The frontend uses:
- `/utils/api.ts` - API helper functions
- `/utils/supabase/client.ts` - Supabase client
- Local storage for session tokens

## Important Notes

⚠️ **For Prototyping Only**: This setup is for demonstration and prototyping. For production:
- Enable email verification with real email service
- Add proper error handling and validation
- Implement rate limiting
- Add payment gateway integration
- Set up proper admin authentication
- Configure RLS policies in Supabase
- Add data backup and recovery
- Implement audit logging

⚠️ **No Real Payments**: Payment processing is simulated. Do not use for real transactions.

⚠️ **Demo Data**: The system uses mock data for demonstration. In production, integrate with real meter reading systems and billing databases.

## Troubleshooting

### Login Issues:
- Check browser console for errors
- Verify email/password are correct
- Ensure cookies are enabled
- Check if session token exists in localStorage

### API Errors:
- Check network tab in browser dev tools
- Verify Authorization header is present
- Check server logs for detailed error messages
- Ensure Supabase project is properly configured

### Data Not Showing:
- Verify user is logged in
- Check if consumer numbers are added
- Ensure bills are created for consumers
- Refresh the page to reload data

## Future Enhancements

Potential additions:
- Real-time notifications via Supabase Realtime
- File upload for meter reading images
- Payment gateway integration
- SMS/email notifications
- Advanced analytics dashboard
- Admin panel for operations
- Mobile app with push notifications
- Load shedding schedule integration
- Prepaid meter balance checking
