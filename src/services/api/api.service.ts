import type { IApiService, ILocalStorageService } from '../../types';

export class ApiService implements IApiService {
  public readonly baseURL: string;

  constructor(private localStorageService: ILocalStorageService) {
    // FastAPI backend default is http://localhost:8000
    // Use VITE_API_BASE_URL if provided, otherwise fallback
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  }

  public getHeaders(includeContentType: boolean = true): Record<string, string> {
    const headers: Record<string, string> = {};

    if (includeContentType) {
      headers['Content-Type'] = 'application/json';
    }

    const token = this.localStorageService.getItem<string>('auth_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async request<T>(
    url: string, 
    method: string, 
    data?: any, 
    config?: any
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method,
        headers: {
          ...this.getHeaders(),
          ...config?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(url: string, config?: any): Promise<T> {
    return this.request<T>(url, 'GET', undefined, config);
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.request<T>(url, 'POST', data, config);
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.request<T>(url, 'PUT', data, config);
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    return this.request<T>(url, 'DELETE', undefined, config);
  }
}
