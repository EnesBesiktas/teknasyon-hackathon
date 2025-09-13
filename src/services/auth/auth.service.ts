import type { 
  IAuthService, 
  IApiService, 
  ILocalStorageService,
  LoginCredentials,
  AuthResponse,
  User 
} from '../../types';

export class AuthService implements IAuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  constructor(
    private apiService: IApiService,
    private localStorageService: ILocalStorageService
  ) {}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.apiService.post<AuthResponse>('/auth/login', credentials);
      
      // Store token and user info
      this.localStorageService.setItem(this.TOKEN_KEY, response.token);
      this.localStorageService.setItem(this.USER_KEY, response.user);
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint if needed
      // await this.apiService.post('/auth/logout');
      
      // Clear local storage
      this.localStorageService.removeItem(this.TOKEN_KEY);
      this.localStorageService.removeItem(this.USER_KEY);
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear local storage
      this.localStorageService.removeItem(this.TOKEN_KEY);
      this.localStorageService.removeItem(this.USER_KEY);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const storedUser = this.localStorageService.getItem<User>(this.USER_KEY);
      if (storedUser && this.isAuthenticated()) {
        return storedUser;
      }

      // If no stored user but has token, fetch from API
      if (this.isAuthenticated()) {
        const user = await this.apiService.get<User>('/auth/me');
        this.localStorageService.setItem(this.USER_KEY, user);
        return user;
      }

      return null;
    } catch (error) {
      console.error('Get current user failed:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.getItem<string>(this.TOKEN_KEY);
    return !!token;
  }

  getToken(): string | null {
    return this.localStorageService.getItem<string>(this.TOKEN_KEY);
  }
}
