// src/services/auth.service.ts

import { AuthResponse, LoginCredentials, User } from "@/types/auth.types";
import { apiClient } from "@/utils/axios";

export const authService = {
	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const { data } = await apiClient.post<AuthResponse>(
			"/auth/login",
			credentials
		);
		localStorage.setItem("accessToken", data.tokens.access.token);
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

		const { data } = await apiClient.post<{ token: string }>(
			"/auth/refresh-token",
			{
				refreshToken,
			}
		);

		localStorage.setItem("accessToken", data.token);
		return data.token;
	},
};
