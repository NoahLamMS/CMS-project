/**
 * @file authApi.ts
 * @description Auth API for ecommerce-nodejs backend
 */

import { apiClient } from '@/services/axios.instance';
import { API_ENDPOINTS } from '@/constants/api-routes';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNIN,
      credentials
    );
    return data;
  },

  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP,
      registerData
    );
    return data;
  },
};
