# CORS Troubleshooting Guide

## Problem: CORS Error When Calling Backend API

CORS (Cross-Origin Resource Sharing) errors occur when the browser blocks requests from your frontend (`http://localhost:9002`) to your backend (`https://api.learnlabz.com`).

---

## ✅ Solution 1: Fix Backend CORS Configuration (Recommended)

Since you mentioned CORS is enabled on the backend, verify these settings on your backend API:

### Required CORS Headers from Backend:

```http
Access-Control-Allow-Origin: http://localhost:9002
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Accept
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

### Backend CORS Configuration (Example for Express/NestJS):

```javascript
// Allow specific origin
app.use(cors({
  origin: [
    'http://localhost:9002',
    'http://192.168.8.102:9002', // Your network IP
    'https://your-production-domain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
```

### Important Notes:
- **DO NOT use** `Access-Control-Allow-Origin: *` with `credentials: true`
- Must specify exact origins: `http://localhost:9002`
- Ensure OPTIONS (preflight) requests are handled

---

## ✅ Solution 2: Use Next.js API Proxy (Development Workaround)

I've created a proxy route that forwards requests through Next.js to bypass CORS.

### How to Use the Proxy:

**Option A: Update Environment Variable**

Change in `.env`:
```env
# Use Next.js proxy instead of direct API
NEXT_PUBLIC_API_URL=http://localhost:9002/api/proxy
```

**Option B: Update Auth Service Directly**

In `src/services/auth.service.ts`, change the endpoint:
```typescript
const AUTH_ENDPOINTS = {
  login: '/proxy/user/auth/login',  // Uses Next.js proxy
  // ... other endpoints
};
```

The proxy will forward all requests to `https://api.learnlabz.com/api/...`

**Pros:**
- ✅ Bypasses CORS completely
- ✅ Works immediately
- ✅ No backend changes needed

**Cons:**
- ⚠️ Only for development
- ⚠️ Adds extra hop (Next.js → Backend)
- ⚠️ Won't work in production (needs different approach)

---

## ✅ Solution 3: Updated API Client (Already Done)

I've updated `src/lib/api-client.ts` to include proper CORS configuration:

```typescript
const response = await fetch(url, {
  mode: 'cors',              // Enable CORS
  credentials: 'include',    // Include cookies
  // ... other config
});
```

This tells the browser to:
- ✅ Make CORS requests properly
- ✅ Include cookies in cross-origin requests
- ✅ Handle preflight OPTIONS requests

---

## 🔍 Debugging CORS Issues

### Step 1: Check Browser Console

Open DevTools (F12) and look for errors like:
```
Access to fetch at 'https://api.learnlabz.com/api/user/auth/login'
from origin 'http://localhost:9002' has been blocked by CORS policy
```

### Step 2: Check Network Tab

1. Open DevTools → Network tab
2. Try to login
3. Look for:
   - **OPTIONS request** (preflight) - Should return 200
   - **POST request** (actual login) - Should return 201

### Step 3: Check Response Headers

In Network tab, click on the failed request:
- **Response Headers** should include:
  ```
  access-control-allow-origin: http://localhost:9002
  access-control-allow-credentials: true
  ```

---

## 🛠️ Quick Fixes to Try

### Fix 1: Add Allowed Origins to Backend

Ensure your backend API allows `http://localhost:9002`:

```typescript
// Backend CORS config
const allowedOrigins = [
  'http://localhost:9002',
  'http://192.168.8.102:9002',
  process.env.FRONTEND_URL
];
```

### Fix 2: Use Proxy (Immediate Solution)

Update `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:9002/api/proxy
```

Restart dev server:
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Fix 3: Disable Browser CORS (Development Only)

**Chrome:**
```bash
# macOS
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

# Linux
google-chrome --disable-web-security --user-data-dir="/tmp/chrome_dev_test"

# Windows
chrome.exe --disable-web-security --user-data-dir="C:\tmp\chrome_dev_test"
```

**⚠️ WARNING: Only for development testing!**

---

## ✅ Recommended Approach

### For Development:
1. **First**: Verify backend CORS is configured correctly
2. **If backend is correct**: Use direct API calls (current setup)
3. **If CORS still fails**: Use Next.js proxy as workaround

### For Production:
1. Backend CORS must allow your production domain
2. Use direct API calls (not proxy)
3. Ensure HTTPS is used for both frontend and backend

---

## 📋 Checklist: Is Backend CORS Configured?

Check your backend has these:

- [ ] CORS middleware enabled
- [ ] `http://localhost:9002` in allowed origins
- [ ] `POST, GET, PUT, DELETE, PATCH, OPTIONS` methods allowed
- [ ] `Content-Type, Authorization` headers allowed
- [ ] `credentials: true` enabled
- [ ] OPTIONS preflight handler working

---

## 🧪 Test CORS Configuration

### Test with cURL:

```bash
# Test OPTIONS (preflight)
curl -X OPTIONS https://api.learnlabz.com/api/user/auth/login \
  -H "Origin: http://localhost:9002" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v

# Should return:
# Access-Control-Allow-Origin: http://localhost:9002
# Access-Control-Allow-Methods: POST, GET, ...
```

### Test with Our Script:

```bash
node test-login.js
```

If this works but browser fails → CORS issue
If this fails too → Backend API issue

---

## 🚀 Quick Start: Using the Proxy

If you want to use the proxy right now:

1. **Update `.env`**:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:9002/api/proxy
   ```

2. **Restart dev server**:
   ```bash
   npm run dev
   ```

3. **Test login** - CORS error should be gone!

The proxy route automatically forwards to `https://api.learnlabz.com/api`

---

## 📞 Backend Team Communication

Send this to your backend team:

```
Hi Team,

We're getting CORS errors from frontend. Can you verify these settings?

Required CORS headers:
- Access-Control-Allow-Origin: http://localhost:9002
- Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
- Access-Control-Allow-Headers: Content-Type, Authorization
- Access-Control-Allow-Credentials: true

Also ensure:
1. OPTIONS requests return 200 (not 404)
2. All endpoints include CORS headers (not just /login)
3. No middleware blocking CORS headers

Test command:
curl -X OPTIONS https://api.learnlabz.com/api/user/auth/login \
  -H "Origin: http://localhost:9002" \
  -H "Access-Control-Request-Method: POST" \
  -v

Should see CORS headers in response.

Thanks!
```

---

## Summary

**Immediate Solution**: Use the proxy
**Long-term Solution**: Fix backend CORS configuration
**Production**: Backend CORS must be properly configured

Choose the approach that works best for your situation!
