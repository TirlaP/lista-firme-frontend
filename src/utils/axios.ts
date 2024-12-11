import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/v1";

export const apiClient = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			// Handle token refresh or logout
			localStorage.removeItem("accessToken");
			window.location.href = "/login";
		}
		const message = error.response?.data?.message || "An error occurred";
		toast.error(message);
		return Promise.reject(error);
	}
);
