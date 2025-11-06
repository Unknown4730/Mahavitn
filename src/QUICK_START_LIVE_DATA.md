# Quick Start: Live Data Setup
## Get Started in 3 Minutes

---

## 🚀 Super Quick Setup

### Step 1: Access Data Initializer (30 seconds)

Open your browser and navigate to your application. Then manually change the URL hash:

```
http://localhost:5173/#data-init
```

Or if deployed:
```
https://yourdomain.com/#data-init
```

**Alternative**: Add a temporary button to your Landing Page:
```tsx
<Button onClick={() => window.location.hash = 'data-init'}>
  Initialize Database
</Button>
```

---

### Step 2: Initialize Data (1 minute)

1. Click the **"Initialize Test Data"** button
2. Wait for success message (takes ~10-15 seconds)
3. Copy the credentials shown:

```
Email: kolhapur.user@mahavitaran.com
Password: Kolhapur@123
```

---

### Step 3: Login & Explore (1 minute)

1. Click "Back to Home" or navigate to login page
2. Enter the credentials
3. You'll see the Dashboard with:
   - ✅ 2 Consumer Accounts
   - ✅ 6 Months of Bills Each
   - ✅ Usage Charts
   - ✅ 5 Announcements

---

## 🎯 What You'll See

### Consumer Account 1 (Residential)
**Number**: 266511869340  
**Name**: संजय पाटील  
**Address**: प्लॉट नं. १२३, शिवाजी रोड, कोल्हापूर - ४१६००२  
**Bills**: May-Oct 2025 (285-342 units/month)

### Consumer Account 2 (Commercial)
**Number**: 266511870125  
**Name**: पाटील ट्रेडर्स  
**Address**: दुकान क्र. ४५, लक्ष्मी मार्केट, रंकाळा चौक, कोल्हापूर - ४१६०१२  
**Bills**: May-Oct 2025 (650-780 units/month)

---

## ⚙️ Consumer Number Configuration

Current: **12 digits** (example: 266511869340)

To change the length, edit `/utils/config.ts`:

```typescript
export const config = {
  consumerNumber: {
    length: 10,  // Change this number (10, 12, 14, etc.)
    // Pattern auto-updates based on length
  }
}
```

---

## 🔧 Manual Access to Data Initializer

If the URL hash doesn't work, you can:

### Option 1: Add to App.tsx temporarily
```typescript
// In App.tsx, add a console command
window.initData = () => {
  window.location.hash = 'data-init';
  window.location.reload();
};
```

Then in browser console:
```javascript
window.initData();
```

### Option 2: Direct API Call
```javascript
import { initializeLiveData } from './utils/liveDataSeed';

// In browser console or component
await initializeLiveData();
```

---

## 📊 Test the Database

### Check if data was created:

```javascript
// In browser console
const response = await fetch('https://YOUR_PROJECT.supabase.co/functions/v1/make-server-ee8e359e/announcements');
const data = await response.json();
console.log(data); // Should show 5 announcements
```

---

## ✅ Verification Checklist

After initialization, verify:

- [ ] Can login with kolhapur.user@mahavitaran.com
- [ ] Dashboard shows 2 consumers
- [ ] Consumer 1 shows 6 bills
- [ ] Consumer 2 shows 6 bills
- [ ] Usage chart displays data
- [ ] 5 announcements visible
- [ ] Can switch between consumers
- [ ] Charts update when switching

---

## 🚨 Troubleshooting

### "User already exists"
✅ This is fine! Just login with the existing credentials.

### Can't access `/data-init`
Try: `window.location.hash = 'data-init'; window.location.reload();`

### No data showing
1. Check browser console for errors
2. Verify Supabase backend is running
3. Re-run initialization
4. Clear browser cache and reload

### Login fails
- Ensure exact email (kolhapur.user@mahavitaran.com)
- Ensure exact password (Kolhapur@123)
- Case-sensitive!

---

## 📝 Default Test Credentials

**After initialization, you'll have:**

```
Email:    kolhapur.user@mahavitaran.com
Password: Kolhapur@123
Name:     संजय पाटील
Phone:    +91 9876501234

Consumer 1: 266511869340 (Residential)
Consumer 2: 266511870125 (Commercial)
```

---

## 🎯 Next Steps

1. ✅ Initialize database (you just did this!)
2. ✅ Login and explore
3. ➡️ Try adding a new consumer
4. ➡️ View bill details
5. ➡️ Test bill payment flow
6. ➡️ Create service requests
7. ➡️ Update profile

---

## 💡 Pro Tips

### Reinitialize Data
If data gets corrupted, just run the initializer again. It will:
- Create user if doesn't exist
- Skip if user exists
- Create bills for consumers

### Add More Consumers
```typescript
// Use the consumerApi
import { consumerApi } from './utils/api';

await consumerApi.addConsumer({
  consumerNumber: '266511999999',
  name: 'New Consumer',
  address: 'New Address',
  category: 'Residential'
});
```

### Check Database Directly
```javascript
// Get all consumers for logged-in user
const response = await fetch(
  'https://YOUR_PROJECT.supabase.co/functions/v1/make-server-ee8e359e/consumers',
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }
);
const data = await response.json();
console.log(data.consumers);
```

---

## 🎉 That's It!

You now have a fully functional live database with:
- ✅ Real user authentication
- ✅ 2 consumer accounts
- ✅ 12 bills (6 each)
- ✅ Usage history
- ✅ System announcements

**Enjoy building! 🚀**

---

For more details, see:
- **LIVE_DATA_SETUP_GUIDE.md** - Full documentation
- **LIVE_DATA_MIGRATION_SUMMARY.md** - Technical details
- **BACKEND_SETUP.md** - API documentation
