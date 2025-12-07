import { API_BASE_URL, IS_DEV } from '@/config/env';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginSuccessData {
  access_token: string;
  token_type: string;
}

export interface LoginResponse {
  code: number;
  msg: string;
  data: Partial<LoginSuccessData>;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const url = IS_DEV ? `/api/auth/login` : `${API_BASE_URL}/api/auth/login`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await resp.json();
  return json as LoginResponse;
}

export function setAuthToken(token: string, type?: string) {
  try {
    localStorage.setItem('auth_token', token);
    if (type) localStorage.setItem('auth_token_type', type);
  } catch {}
}

export function getAuthHeader(): string | undefined {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) return undefined;
    const type = localStorage.getItem('auth_token_type') || 'Bearer';
    return `${type} ${token}`;
  } catch {
    return undefined;
  }
}
