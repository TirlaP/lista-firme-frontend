// src/components/auth/LoginForm.tsx

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login(data.email, data.password);
			navigate("/companies");
			toast.success("Successfully logged in!");
		} catch (error) {
			toast.error("Login failed. Please check your credentials.");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
			<div className="rounded-md shadow-sm space-y-4">
				<Input
					label="Email address"
					type="email"
					autoComplete="email"
					required
					{...register("email")}
					error={errors.email?.message}
				/>
				<Input
					label="Password"
					type="password"
					autoComplete="current-password"
					required
					{...register("password")}
					error={errors.password?.message}
				/>
			</div>

			<Button
				type="submit"
				className="w-full"
				size="lg"
				isLoading={isSubmitting}
			>
				Sign in
			</Button>
		</form>
	);
};
