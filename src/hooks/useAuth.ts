// src/hooks/useAuth.ts

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
	const navigate = useNavigate();
	const { user, login, logout, restoreSession } = useAuthStore();

	useEffect(() => {
		const initAuth = async () => {
			if (!user && localStorage.getItem("accessToken")) {
				await restoreSession();
			}
		};

		initAuth();
	}, [user, restoreSession]);

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return {
		user,
		login,
		logout: handleLogout,
		isAuthenticated: !!user,
	};
};
