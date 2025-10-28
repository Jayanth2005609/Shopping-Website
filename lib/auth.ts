export interface AuthUser {
  id: string
  email: string
  name: string
}

const USERS_KEY = "ecommerce_users"
const CURRENT_USER_KEY = "ecommerce_current_user"

export function getStoredUsers(): Record<string, { email: string; password: string; name: string }> {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem(USERS_KEY)
  return stored ? JSON.parse(stored) : {}
}

export function register(email: string, password: string, name: string): { success: boolean; error?: string } {
  const users = getStoredUsers()

  if (users[email]) {
    return { success: false, error: "Email already registered" }
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" }
  }

  users[email] = { email, password, name }
  localStorage.setItem(USERS_KEY, JSON.stringify(users))

  return { success: true }
}

export function login(email: string, password: string): { success: boolean; user?: AuthUser; error?: string } {
  const users = getStoredUsers()
  const user = users[email]

  if (!user || user.password !== password) {
    return { success: false, error: "Invalid email or password" }
  }

  const authUser: AuthUser = {
    id: email.split("@")[0] + Date.now(),
    email,
    name: user.name,
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser))
  return { success: true, user: authUser }
}

export function logout(): void {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(CURRENT_USER_KEY)
  return stored ? JSON.parse(stored) : null
}
