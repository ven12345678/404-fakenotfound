// Test script for authentication endpoints
async function testAuth() {
  const BASE_URL = 'http://localhost:3000/api';
  
  // Test registration
  console.log('Testing registration...');
  const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    })
  });
  
  const registerData = await registerResponse.json();
  console.log('Register response:', registerData);
  
  // Test login
  console.log('\nTesting login...');
  const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'password123'
    })
  });
  
  const loginData = await loginResponse.json();
  console.log('Login response:', loginData);
  
  if (loginData.token) {
    console.log('\nSuccessfully got authentication token!');
    console.log('Use this token in the Authorization header for protected routes:');
    console.log(`Authorization: Bearer ${loginData.token}`);
  }
}

// Run the test
testAuth().catch(console.error); 