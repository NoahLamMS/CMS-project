/**
 * @file auth.types.ts
 * @description Auth types matching ecommerce-nodejs backend
 */

export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age?: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}
