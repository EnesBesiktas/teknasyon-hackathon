// Service identifiers for dependency injection
export const SERVICE_IDENTIFIERS = {
  ApiService: Symbol.for('ApiService'),
  AuthService: Symbol.for('AuthService'),
  LocalStorageService: Symbol.for('LocalStorageService'),
  HttpInterceptorService: Symbol.for('HttpInterceptorService'),
} as const;

export type ServiceIdentifier = typeof SERVICE_IDENTIFIERS[keyof typeof SERVICE_IDENTIFIERS];
