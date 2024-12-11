// src/types/auth.types.ts
export interface User {
	id: string;
	name: string;
	email: string;
	role: "user" | "admin";
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
