// Simple service container without decorators
import { ApiService } from '../../../services/api/api.service';
import { AuthService } from '../../../services/auth/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import type { 
  IApiService, 
  IAuthService, 
  ILocalStorageService 
} from '../../../types';

class ServiceContainer {
  private services = new Map<string, any>();

  constructor() {
    this.initializeServices();
  }

  private initializeServices() {
    // Create service instances with proper dependencies
    const localStorageService = new LocalStorageService();
    const apiService = new ApiService(localStorageService);
    const authService = new AuthService(apiService, localStorageService);

    // Register services
    this.services.set('LocalStorageService', localStorageService);
    this.services.set('ApiService', apiService);
    this.services.set('AuthService', authService);
  }

  get<T>(serviceKey: string): T {
    const service = this.services.get(serviceKey);
    if (!service) {
      throw new Error(`Service ${serviceKey} not found`);
    }
    return service;
  }

  // Type-safe getters
  getLocalStorageService(): ILocalStorageService {
    return this.get<ILocalStorageService>('LocalStorageService');
  }

  getApiService(): IApiService {
    return this.get<IApiService>('ApiService');
  }

  getAuthService(): IAuthService {
    return this.get<IAuthService>('AuthService');
  }
}

// Singleton instance
export const serviceContainer = new ServiceContainer();
