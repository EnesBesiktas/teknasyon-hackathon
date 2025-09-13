import { useMemo } from 'react';
import { serviceContainer } from '../app/core/config/service-container';
import type { 
  IApiService, 
  IAuthService, 
  ILocalStorageService 
} from '../types';

/**
 * React hook to get LocalStorage service
 */
export function useLocalStorageService(): ILocalStorageService {
  return useMemo(() => serviceContainer.getLocalStorageService(), []);
}

/**
 * React hook to get API service
 */
export function useApiService(): IApiService {
  return useMemo(() => serviceContainer.getApiService(), []);
}

/**
 * React hook to get Auth service
 */
export function useAuthService(): IAuthService {
  return useMemo(() => serviceContainer.getAuthService(), []);
}

/**
 * Generic service getter for outside React components
 */
export function getService<T>(serviceKey: string): T {
  return serviceContainer.get<T>(serviceKey);
}
