export const AUTH_KEY = "hbw_auth";

export type AuthSession = {
  username: string;
  jwt: string;
  expireAt: number;
  message: string;
};

export function setSession(session: AuthSession) {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function clearSession() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function getSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!getSession();
}
