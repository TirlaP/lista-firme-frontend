import {
  authInitializedAtom, // Add this import
  forgotPasswordAtom,
  isAuthenticatedAtom,
  loginAtom,
  logoutAtom,
  resendVerificationEmailAtom,
  resetPasswordAtom,
  restoreSessionAtom,
  sendVerificationEmailAtom,
  userAtom,
  verifyEmailAtom,
} from "@/atoms/auth";
import { authService } from "@/services/auth.service";
import type { SignupFormData } from "@/types/auth.types";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  // Get atoms
  const user = useAtomValue(userAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const isInitialized = useAtomValue(authInitializedAtom); // Add this line

  // Set atoms
  const setUser = useSetAtom(userAtom);
  const login = useSetAtom(loginAtom);
  const logout = useSetAtom(logoutAtom);
  const restoreSession = useSetAtom(restoreSessionAtom);
  const verifyEmailStore = useSetAtom(verifyEmailAtom);
  const sendVerificationEmail = useSetAtom(sendVerificationEmailAtom);
  const forgotPassword = useSetAtom(forgotPasswordAtom);
  const resetPassword = useSetAtom(resetPasswordAtom);
  const resendVerificationEmail = useSetAtom(resendVerificationEmailAtom);

  useEffect(() => {
    const initAuth = async () => {
      // Only attempt restoration if we're not initialized yet
      if (!isInitialized && !user && localStorage.getItem("accessToken")) {
        await restoreSession();
      }
    };

    initAuth();
  }, [user, restoreSession, isInitialized]); // Add isInitialized to dependency array

  const register = async (data: SignupFormData) => {
    try {
      const response = await authService.register(data);
      setUser(response.user);
      localStorage.setItem("accessToken", response.tokens.access.token);
      localStorage.setItem("refreshToken", response.tokens.refresh.token);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    await logout();
    console.log("Hmmmm");
    navigate("/login");
  };

  const verifyEmail = async (token: string) => {
    await verifyEmailStore(token);
    console.log("Hmmmm");
    navigate("/login?verified=true");
  };

  const handleForgotPassword = async (email: string) => {
    await forgotPassword(email);
  };

  const handleResetPassword = async (token: string, password: string) => {
    await resetPassword({ token, password });
    console.log("Hmmmm");
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
    isAuthenticated,
    isEmailVerified: user?.isEmailVerified ?? false,
    isInitialized, // Add this to the return value
  };
};