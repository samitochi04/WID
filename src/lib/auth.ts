export interface User {
  id: string;
  email: string;
}

const API_BASE_URL = "http://localhost:3000";

// Sign up a new user
export async function signUp(email: string, password: string): Promise<{ user: User; token: string }> {
  console.log("Sending signup request:", { email, password });

  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Signup error response:", errorText);
    throw new Error(errorText);
  }

  return await response.json();
}


// Sign in an existing user
export async function signIn(email: string, password: string): Promise<{ user: User; token: string }> {
  const response = await fetch(`${API_BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return await response.json();
}

// Verify JWT token
export async function verifyToken(token: string): Promise<User | null> {
  const response = await fetch(`${API_BASE_URL}/verify-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
