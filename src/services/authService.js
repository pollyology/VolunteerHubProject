// ==========================================
// Authentication Service (Template)
// This is just a template based off tutorials.
// Using as a placeholder before actual implementation
// ==========================================


// ------------------------------------------
// LOGIN
// ------------------------------------------
export const login = async (email, password) => {
  // TODO:
  // - Send login request to backend API
  // - Validate user credentials
  // - Receive and store authentication token (JWT/session)
  // - Handle login errors

  console.log("Login attempt:", email, password);

  // Placeholder response
  return {
    user: { email },
    token: null
  };
};


// ------------------------------------------
// SIGNUP / REGISTER
// ------------------------------------------
export const signup = async (name, email, password) => {
  // TODO:
  // - Send signup request to backend API
  // - Create new user account in database
  // - Handle duplicate emails and validation
  // - Optionally log user in after signup

  console.log("Signup attempt:", name, email, password);

  // Placeholder response
  return {
    user: { name, email },
    token: null
  };
};


// ------------------------------------------
// LOGOUT
// ------------------------------------------
export const logout = () => {
  // TODO:
  // - Clear authentication token from storage
  // - Notify backend (if required)
  // - Redirect user to login page

  console.log("User logged out");
};


// ------------------------------------------
// GET CURRENT USER
// ------------------------------------------
export const getCurrentUser = () => {
  // TODO:
  // - Retrieve user info from local storage or API
  // - Validate session/token

  console.log("Fetching current user");

  return null;
};


// ------------------------------------------
// AUTH CHECK
// ------------------------------------------
export const isAuthenticated = () => {
  // TODO:
  // - Check if user has a valid session/token

  console.log("Checking authentication status");

  return false;
};