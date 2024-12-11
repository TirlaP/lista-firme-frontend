import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
	const navigate = useNavigate();
	const { user, login, logout } = useAuthStore();

	useEffect(() => {
		if (!user && localStorage.getItem("accessToken")) {
			// Try to restore session
		}
	}, [user]);

	return { user, login, logout, isAuthenticated: !!user };
};

