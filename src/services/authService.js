// ==========================================
// Authentication Service
// Integrated with Django REST Framework JWT
// ==========================================

const API_URL = 'http://127.0.0.1:8000/api';

// ------------------------------------------
// LOGIN
// ------------------------------------------
// ------------------------------------------
// LOGIN
// ------------------------------------------
export const login = async (email, password, isAdminLogin = false) => {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid email or password');
  }

  const data = await response.json();

  localStorage.setItem('accessToken', data.access);
  localStorage.setItem('refreshToken', data.refresh);

  // Only save the staff flag if they used the admin login page
  // AND the backend actually confirms they have staff privileges
  if (isAdminLogin && data.is_staff) {
    localStorage.setItem('isStaff', 'true');
  } else {
    // Make sure we clear any old staff flags if a regular student logs in
    localStorage.removeItem('isStaff');
  }

  return data;
};

// ------------------------------------------
// SIGNUP / REGISTER
// ------------------------------------------
export const signup = async (name, email, password) => {
  const response = await fetch(`${API_URL}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: name, email, password }), 
  });

  if (!response.ok) {
    throw new Error('Registration failed. Please check your details.');
  }

  // Once registration succeeds, automatically log them in
  return await login(email, password);
};

// ------------------------------------------
// LOGOUT
// ------------------------------------------
export const logout = async () => {
  const access = localStorage.getItem('accessToken');
  const refresh = localStorage.getItem('refreshToken');

  // If we have the tokens, tell the backend to blacklist them
  if (access && refresh) {
    try {
      await fetch(`${API_URL}/auth/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify({ refresh })
      });
    } catch (error) {
      console.error("Backend logout request failed", error);
    }
  }

  // Always clear local storage regardless of backend success
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('isStaff');
};

// ------------------------------------------
// GET CURRENT USER
// ------------------------------------------
export const getCurrentUser = async () => {
  const access = localStorage.getItem('accessToken');

  if (!access) return null;

  try {
    const response = await fetch(`${API_URL}/users/me/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`
      }
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch user profile", error);
  }

  return null;
};

// ------------------------------------------
// AUTH CHECK
// ------------------------------------------
export const isAuthenticated = () => {
  // A quick synchronous check to see if an access token exists
  return !!localStorage.getItem('accessToken');
};