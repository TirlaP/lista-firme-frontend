import { authService } from "@/services/auth.service";
import { User } from "@/types/auth.types";
import { create } from "zustand";

interface AuthState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isLoading: false,
	error: null,
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await authService.login({ email, password });
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
}));

