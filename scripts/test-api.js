import fetch from 'node-fetch';

const API_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
let authToken = '';
let verificationToken = '';
let resetToken = '';

async function testAPI() {
  try {
    console.log('Starting API tests...\n');

    // Test registration
    console.log('Testing registration...');
    const registerRes = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPassword123!'
      })
    });
    const registerData = await registerRes.json();
    console.log('Registration response:', registerData);
    console.log('Registration test complete\n');

    // Test login
    console.log('Testing login...');
    const loginRes = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'TestPassword123!'
      })
    });
    const loginData = await loginRes.json();
    authToken = loginData.token;
    console.log('Login response:', loginData);
    console.log('Login test complete\n');

    // Test profile fetch
    console.log('Testing profile fetch...');
    const profileRes = await fetch(`${API_URL}/api/user/profile`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const profileData = await profileRes.json();
    console.log('Profile response:', profileData);
    console.log('Profile fetch test complete\n');

    // Test profile update
    console.log('Testing profile update...');
    const updateRes = await fetch(`${API_URL}/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Updated Test User'
      })
    });
    const updateData = await updateRes.json();
    console.log('Profile update response:', updateData);
    console.log('Profile update test complete\n');

    // Test stats fetch
    console.log('Testing stats fetch...');
    const statsRes = await fetch(`${API_URL}/api/user/stats`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const statsData = await statsRes.json();
    console.log('Stats response:', statsData);
    console.log('Stats fetch test complete\n');

    // Test password reset request
    console.log('Testing password reset request...');
    const resetReqRes = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    });
    const resetReqData = await resetReqRes.json();
    console.log('Password reset request response:', resetReqData);
    console.log('Password reset request test complete\n');

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAPI(); 