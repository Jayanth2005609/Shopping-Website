const USERS_KEY = "ecommerce_users";
const CURRENT_USER_KEY = "ecommerce_current_user";

export function getStoredUsers() {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function register(email, password, name) {
  const users = getStoredUsers();

  if (users[email]) {
    return { success: false, error: "Email already registered" };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }

  users[email] = { email, password, name };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return { success: true };
}

export function login(email, password) {
  const users = getStoredUsers();
  const user = users[email];

  if (!user || user.password !== password) {
    return { success: false, error: "Invalid email or password" };
  }

  const authUser = {
    id: email.split("@")[0] + Date.now(),
    email,
    name: user.name,
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
  return { success: true, user: authUser };
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
}
