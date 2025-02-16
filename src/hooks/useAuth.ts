import { useAuthStore } from "@/store/authStore";
import { SignupFormData } from "@/types/auth.types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";

export const useAuth = () => {
  const navigate = useNavigate();
  const { 
    user, 
    login, 
    logout, 
    setUser, 
    restoreSession,
    verifyEmail: verifyEmailStore,
    sendVerificationEmail,
    forgotPassword,
    resetPassword,
    resendVerificationEmail,
  } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      if (!user && localStorage.getItem("accessToken")) {
        await restoreSession();
      }
    };

    initAuth();
  }, [user, restoreSession]);

  const register = async (data: SignupFormData) => {
    const response = await authService.register(data);
    setUser(response.user);
    localStorage.setItem("accessToken", response.tokens.access.token);
    localStorage.setItem("refreshToken", response.tokens.refresh.token);
    return response;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const verifyEmail = async (token: string) => {
    await verifyEmailStore(token);
    navigate("/login?verified=true");
  };

  const handleForgotPassword = async (email: string) => {
    await forgotPassword(email);
  };

  const handleResetPassword = async (token: string, password: string) => {
    await resetPassword(token, password);
    navigate("/login?reset=true");
  };

  const handleResendVerification = async () => {
    await resendVerificationEmail();
  };

  return {
    user,
    login,
    register,
    logout: handleLogout,
    verifyEmail,
    sendVerificationEmail,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    resendVerificationEmail: handleResendVerification,
    isAuthenticated: !!user,
    isEmailVerified: user?.isEmailVerified ?? false,
  };
};