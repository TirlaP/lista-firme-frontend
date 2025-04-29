import { authService } from "@/services/auth.service";
import type { User } from "@/types/auth.types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Persistent user state
export const userAtom = atomWithStorage<User | null>("auth-user", null);

// Loading and error states
export const authLoadingAtom = atom(false);
export const authErrorAtom = atom<string | null>(null);

// Auth initialization state - NEW
export const authInitializedAtom = atom(false);

// Login action
export const loginAtom = atom(
  null,
  async (
    get,
    set,
    { email, password }: { email: string; password: string },
  ) => {
    set(authLoadingAtom, true);
    set(authErrorAtom, null);

    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("refreshToken", response.tokens.refresh.token);
      set(userAtom, response.user);
    } catch (error) {
      set(authErrorAtom, "Login failed");
      throw error;
    } finally {
      set(authLoadingAtom, false);
      set(authInitializedAtom, true); // Mark as initialized after login attempt
    }
  },
);

// Logout action
export const logoutAtom = atom(null, async (get, set) => {
  set(authLoadingAtom, true);

  try {
    await authService.logout();
    set(userAtom, null);
  } catch (error) {
    set(authErrorAtom, "Logout failed");
  } finally {
    set(authLoadingAtom, false);
  }
});

// Restore session action
export const restoreSessionAtom = atom(null, async (get, set) => {
  const accessToken = localStorage.getItem("accessToken");
  
  set(authLoadingAtom, true);
  
  try {
    if (accessToken && !get(userAtom)) {
      try {
        const user = await authService.getCurrentUser();
        set(userAtom, user);
      } catch (error) {
        // Session restoration failed silently
      }
    }
  } finally {
    set(authLoadingAtom, false);
    // Always mark auth as initialized, even if it failed
    set(authInitializedAtom, true);
  }
});

// Verify email action
export const verifyEmailAtom = atom(null, async (get, set, token: string) => {
  set(authLoadingAtom, true);
  set(authErrorAtom, null);

  try {
    await authService.verifyEmail(token);
    const user = get(userAtom);
    if (user) {
      set(userAtom, { ...user, isEmailVerified: true });
    }
  } catch (error) {
    set(authErrorAtom, "Email verification failed");
    throw error;
  } finally {
    set(authLoadingAtom, false);
  }
});

// Send verification email action
export const sendVerificationEmailAtom = atom(null, async (get, set) => {
  set(authLoadingAtom, true);
  set(authErrorAtom, null);

  try {
    await authService.sendVerificationEmail();
  } catch (error) {
    set(authErrorAtom, "Failed to send verification email");
    throw error;
  } finally {
    set(authLoadingAtom, false);
  }
});

// Forgot password action
export const forgotPasswordAtom = atom(
  null,
  async (get, set, email: string) => {
    set(authLoadingAtom, true);
    set(authErrorAtom, null);

    try {
      await authService.forgotPassword(email);
    } catch (error) {
      set(authErrorAtom, "Failed to process forgot password request");
      throw error;
    } finally {
      set(authLoadingAtom, false);
    }
  },
);

// Reset password action
export const resetPasswordAtom = atom(
  null,
  async (
    get,
    set,
    { token, password }: { token: string; password: string },
  ) => {
    set(authLoadingAtom, true);
    set(authErrorAtom, null);

    try {
      await authService.resetPassword(token, password);
    } catch (error) {
      set(authErrorAtom, "Failed to reset password");
      throw error;
    } finally {
      set(authLoadingAtom, false);
    }
  },
);

// Resend verification email action
export const resendVerificationEmailAtom = atom(null, async (get, set) => {
  set(authLoadingAtom, true);
  set(authErrorAtom, null);

  try {
    await authService.resendVerificationEmail();
  } catch (error) {
    set(authErrorAtom, "Failed to resend verification email");
    throw error;
  } finally {
    set(authLoadingAtom, false);
  }
});

// A convenience atom for checking if a user is authenticated
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));
