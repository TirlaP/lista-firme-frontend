import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

// Type for the error response from your API
interface ApiErrorResponse {
	code?: number;
	message: string;
}

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/v1";

export const apiClient = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000, // 10 seconds timeout
});

// Request interceptor with TypeScript
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// Response interceptor with TypeScript
apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<ApiErrorResponse>) => {
		if (error.response?.status === 401) {
			// Clear auth state
			localStorage.removeItem("accessToken");
			localStorage.removeItem("user");

			// Only redirect if we're not already on the login page
			if (!window.location.pathname.includes("/login")) {
				window.location.href = "/login";
			}
		}

		// Handle network errors
		if (!error.response) {
			toast.error("Network error. Please check your connection.");
			return Promise.reject(error);
		}

		// Handle API errors
		const message =
			error.response?.data?.message || "An unexpected error occurred";
		toast.error(message);

		return Promise.reject(error);
	}
);

export default apiClient;
