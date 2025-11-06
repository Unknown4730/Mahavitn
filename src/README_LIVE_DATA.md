# 🔥 Live Data System - Quick Reference

**Status**: ✅ READY  
**Consumer Numbers**: 12 Digits (Configurable)  
**Example**: 266511869340

---

## ⚡ Ultra Quick Start

```bash
# 1. Navigate to data initializer
http://localhost:5173/#data-init

# 2. Click "Initialize Test Data" button

# 3. Login with:
Email: kolhapur.user@mahavitaran.com
Password: Kolhapur@123

# 4. Done! ✅
```

---

## 📊 What You Get

```
1 User (Kolhapur)
├── Consumer 1: 266511869340 (Residential)
│   ├── 6 Bills (May-Oct 2025)
│   └── Usage: 285-342 units/month
│
└── Consumer 2: 266511870125 (Commercial)
    ├── 6 Bills (May-Oct 2025)
    └── Usage: 650-780 units/month

+ 5 System Announcements
```

---

## 🔧 Configuration

**Consumer Number Length** (default: 12 digits)

```typescript
// /utils/config.ts
consumerNumber: {
  length: 12,  // Change this: 10, 12, 14, etc.
  pattern: /^\d{12}$/
}
```

---

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `/utils/config.ts` | Configuration |
| `/components/hooks/useLiveData.ts` | React hooks |
| `/components/DataInitializer.tsx` | UI for seeding |
| `/utils/liveDataSeed.ts` | Seed functions |
| `/supabase/functions/server/index.tsx` | Backend API |

---

## 🪝 React Hooks

```typescript
// Get all consumers
const { consumers, loading, error } = useConsumers();

// Get consumer details
const { consumer, bills, usageHistory } = useConsumerDetails('266511869340');

// Get announcements
const { announcements } = useAnnouncements();

// Get user profile
const { profile, consumers } = useUserProfile();
```

---

## 🌐 API Endpoints

```
POST   /auth/signup           - Register
GET    /auth/profile          - Get profile
POST   /consumers             - Add consumer
GET    /consumers             - List all
GET    /consumers/:number     - Get details
POST   /bills                 - Create bill
POST   /bills/:id/pay         - Pay bill
GET    /announcements         - List all
POST   /service-requests      - Create request
```

---

## 📚 Documentation

1. **[LIVE_DATA_SETUP_GUIDE.md](./LIVE_DATA_SETUP_GUIDE.md)** - Complete guide
2. **[QUICK_START_LIVE_DATA.md](./QUICK_START_LIVE_DATA.md)** - 3-minute setup
3. **[API_REFERENCE.md](./API_REFERENCE.md)** - Full API docs
4. **[IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)** - Summary

---

## ✅ Checklist

- [x] Mock data removed
- [x] Live database connected
- [x] Consumer numbers configurable (12 digits)
- [x] Kolhapur user created
- [x] 2 consumers added
- [x] 12 bills generated
- [x] 5 announcements created
- [x] Documentation complete

---

## 🎉 Result

**Production-ready live database system with:**
- Real-time data from Supabase
- Configurable consumer numbers
- Multi-user & multi-consumer support
- Complete API
- Full documentation

**Ready to deploy! 🚀**

---

**Need help?** Check [LIVE_DATA_SETUP_GUIDE.md](./LIVE_DATA_SETUP_GUIDE.md)
