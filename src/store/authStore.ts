import { authService } from "@/services/auth.service";
import { User } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	setUser: (user: User | null) => void;
	restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			isLoading: false,
			error: null,
			login: async (email, password) => {
				set({ isLoading: true, error: null });
				try {
					const response = await authService.login({ email, password });
					localStorage.setItem("refreshToken", response.tokens.refresh.token);
					set({ user: response.user, isLoading: false });
				} catch (error) {
					set({ error: "Login failed", isLoading: false });
					throw error;
				}
			},
			logout: async () => {
				set({ isLoading: true });
				try {
					await authService.logout();
					set({ user: null, isLoading: false });
				} catch (error) {
					set({ error: "Logout failed", isLoading: false });
				}
			},
			setUser: (user) => set({ user }),
			restoreSession: async () => {
				const accessToken = localStorage.getItem("accessToken");
				if (accessToken && !get().user) {
					set({ isLoading: true });
					try {
						const user = await authService.getCurrentUser();
						set({ user, isLoading: false });
					} catch (error) {
						set({ isLoading: false });
					}
				}
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({ user: state.user }),
		}
	)
);

