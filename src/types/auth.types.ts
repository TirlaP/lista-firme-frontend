export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  subscriptionInfo?: {
    currentPlan: string;
    status: string;
    expiresAt?: Date;
    usage?: {
      companiesViewed: number;
      exportsCount: number;
      lastResetDate: Date;
    };
  };
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterRequest extends SignupFormData {
  confirmPassword: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}