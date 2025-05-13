// Test script for authentication endpoints
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

async function testEndpoints() {
  const BASE_URL = 'http://localhost:3000/api/auth';
  
  // Test Registration
  console.log('\n1. Testing Registration...');
  try {
    const registerResponse = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    const registerData = await registerResponse.json();
    console.log('Status:', registerResponse.status);
    console.log('Response:', registerData);
  } catch (error) {
    console.error('Registration failed:', error);
  }

  // Test Login
  console.log('\n2. Testing Login...');
  try {
    const loginResponse = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Status:', loginResponse.status);
    console.log('Response:', loginData);

    if (loginData.token) {
      console.log('\nAuthentication successful!');
      console.log('JWT Token:', loginData.token);
      console.log('\nTo use this token for protected routes:');
      console.log('Add this header to your requests:');
      console.log(`Authorization: Bearer ${loginData.token}`);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
}

// Run the tests
console.log('Starting API tests...');
console.log('Make sure your Next.js server is running (npm run dev)');
testEndpoints().catch(console.error); 