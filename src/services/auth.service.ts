import { AuthResponse, LoginCredentials } from "@/types/auth.types";
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

	async getCurrentUser() {
		const { data } = await apiClient.get("/auth/me");
		return data;
	},
};

