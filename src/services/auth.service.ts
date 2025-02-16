import { AuthResponse, LoginCredentials, SignupFormData, User } from "@/types/auth.types";
import { apiClient } from "@/utils/apiClient";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", credentials);
    localStorage.setItem("accessToken", data.tokens.access.token);
    localStorage.setItem("refreshToken", data.tokens.refresh.token);
    return data;
  },

  async register(userData: SignupFormData): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/auth/register", userData);
    return data;
  },

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await apiClient.post("/auth/logout", { refreshToken });
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await apiClient.get<User>("/auth/me");
    return data;
  },

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const { data } = await apiClient.post<{ token: string }>("/auth/refresh-tokens", {
      refreshToken,
    });

    localStorage.setItem("accessToken", data.token);
    return data.token;
  },

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post("/auth/verify-email", null, {
      params: { token },
    });
  },

  async sendVerificationEmail(): Promise<void> {
    await apiClient.post("/auth/send-verification-email");
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post("/auth/forgot-password", { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post("/auth/reset-password", 
      { password },
      { params: { token } }
    );
  },

  async resendVerificationEmail(): Promise<void> {
    await apiClient.post("/auth/send-verification-email");
  },
};