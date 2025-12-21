/**
 * Test script to check if /user/auth/me endpoint works correctly
 * Run this after logging in to see if the endpoint is causing the logout issue
 */

const API_BASE = 'https://api.learnlabz.com/api';

// Test the /me endpoint with a mock token
async function testMeEndpoint() {
  console.log('\n🔍 Testing /user/auth/me endpoint...\n');

  // You'll need to replace this with a real access token from your login
  const mockToken = 'YOUR_ACCESS_TOKEN_HERE';

  try {
    const response = await fetch(`${API_BASE}/user/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${mockToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    });

    console.log('Status:', response.status, response.statusText);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('\nResponse data:');
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error('\n❌ /user/auth/me endpoint returned an error!');
      console.error('This is why cookies are being cleared on refresh.');
    } else {
      console.log('\n✅ /user/auth/me endpoint works correctly');
    }
  } catch (error) {
    console.error('\n❌ Error calling /user/auth/me:');
    console.error(error.message);
    console.error('\nThis error is causing cookies to be cleared on page refresh.');
  }
}

// Instructions
console.log('='.repeat(60));
console.log('INSTRUCTIONS:');
console.log('='.repeat(60));
console.log('1. Login to your app at http://localhost:9002/login');
console.log('2. Open browser DevTools → Application → Cookies');
console.log('3. Copy the value of the "accessToken" cookie');
console.log('4. Replace YOUR_ACCESS_TOKEN_HERE in this script');
console.log('5. Run: node test-me-endpoint.js');
console.log('='.repeat(60));
console.log('\nOr check your backend logs to see if /user/auth/me endpoint exists');
console.log('and what response structure it returns.\n');

// Uncomment to run the test (after adding token)
// testMeEndpoint();
