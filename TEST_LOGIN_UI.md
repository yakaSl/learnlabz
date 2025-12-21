# Login UI Test Guide

## Current Status

✅ **Backend API**: Working correctly (verified with curl and test-login.js)
✅ **CORS Headers**: Backend returning proper CORS headers
✅ **API Client**: Updated with CORS configuration (`mode: 'cors'`, `credentials: 'include'`)
✅ **Dev Server**: Running at http://localhost:9002

## Quick Test Steps

### Option 1: Clear Browser Cache and Test

The CORS error you experienced might be cached by the browser. Follow these steps:

1. **Open Browser DevTools** (F12)

2. **Hard Refresh** to clear cache:
   - **Chrome/Edge**: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
   - **Firefox**: `Ctrl + F5` (Windows/Linux) or `Cmd + Shift + R` (Mac)

3. **Clear Application Cache**:
   - Open DevTools → Application tab → Clear storage → Click "Clear site data"
   - Or: DevTools → Network tab → Check "Disable cache"

4. **Navigate to Login Page**:
   ```
   http://localhost:9002/login
   ```

5. **Enter Test Credentials**:
   ```
   Username: johndoe5
   Password: securePassword123
   ```

6. **Monitor in DevTools**:
   - **Console tab**: Look for API client logs (should show 📤 API Request and 📥 API Response)
   - **Network tab**:
     - Look for `login` request
     - Should see `200 OK` status
     - Check Response Headers for CORS headers
     - Check Response body for user data and tokens

### Option 2: Use Proxy (If Browser Cache Persists)

If clearing cache doesn't work, use the Next.js proxy to bypass CORS completely:

1. **Update `.env` file**:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:9002/api/proxy
   ```

2. **Restart dev server**:
   ```bash
   # Press Ctrl+C to stop current server
   npm run dev
   ```

3. **Test login** - CORS error should be completely gone!

## What to Look For

### ✅ Success Indicators

**Console Output**:
```
📤 API Request: POST https://api.learnlabz.com/api/user/auth/login
📥 API Response: 200 OK
🔐 [AUTH] User logged in successfully
```

**Network Tab**:
- Status: `200 OK`
- Response Headers contain:
  ```
  access-control-allow-origin: *
  access-control-allow-credentials: true
  ```
- Response body shows user data and tokens

**Browser Behavior**:
- Redirect to appropriate dashboard based on user role
- No error messages on login page

### ❌ Error Indicators

**CORS Error** (Browser Console):
```
Access to fetch at 'https://api.learnlabz.com/api/user/auth/login'
from origin 'http://localhost:9002' has been blocked by CORS policy
```
**Solution**: Clear browser cache or use proxy method

**Network Error**:
```
Failed to fetch
```
**Solution**: Check backend API is running at https://api.learnlabz.com

**401 Unauthorized**:
```
Invalid credentials
```
**Solution**: Verify username/password are correct

## Expected Login Flow

```
1. User enters credentials
   ↓
2. Frontend calls: POST /user/auth/login
   ↓
3. Backend validates with Keycloak
   ↓
4. Backend returns JWT tokens + user data
   ↓
5. Frontend stores tokens in HTTP-only cookies
   ↓
6. Frontend redirects to role-based dashboard
```

## Debugging Commands

### Test Backend API Directly
```bash
node test-login.js
```
**Expected**: Should show "✅ LOGIN SUCCESSFUL!"

### Test CORS Headers
```bash
curl -X OPTIONS https://api.learnlabz.com/api/user/auth/login \
  -H "Origin: http://localhost:9002" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```
**Expected**: Should see `access-control-allow-origin` in response

### Check Dev Server Status
```bash
lsof -ti:9002
```
**Expected**: Should show a process ID

## Verification Checklist

- [ ] Dev server running at http://localhost:9002
- [ ] Backend API accessible at https://api.learnlabz.com
- [ ] Browser cache cleared (hard refresh + disable cache)
- [ ] DevTools Network tab shows successful login request
- [ ] Console shows "User logged in successfully"
- [ ] Cookies stored in browser (check Application → Cookies)
- [ ] Redirected to dashboard after login

## Current Configuration

**Environment**:
```env
NEXT_PUBLIC_API_URL=https://api.learnlabz.com/api
```

**API Client CORS Config** (src/lib/api-client.ts:203-204):
```typescript
mode: 'cors',
credentials: 'include',
```

**Backend CORS Headers** (verified):
```
access-control-allow-origin: *
access-control-allow-methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
access-control-allow-headers: Content-Type, Authorization
```

## Next Steps

1. **Test with cleared cache** first (Option 1)
2. If CORS error persists, **switch to proxy** (Option 2)
3. Report back with:
   - Browser console output
   - Network tab screenshot
   - Whether login succeeded or failed

---

**Need Help?**
- Check [CORS_TROUBLESHOOTING.md](CORS_TROUBLESHOOTING.md) for detailed CORS solutions
- Verify backend team has properly configured CORS for `http://localhost:9002`
