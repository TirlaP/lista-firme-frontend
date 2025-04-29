import { AuthLayout } from "@/components/layout/AuthLayout";
import { MainLayout } from "@/components/layout/MainLayout";
import { SubscriptionGuard } from "@/components/subscription/SubscriptionGuard";
import { useAuth } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { CompaniesPage } from "@/pages/companies/CompaniesPage";
import { CompanyDetailsPage } from "@/pages/companies/CompanyDetailsPage";
import { LatestCompaniesPage } from "@/pages/companies/LatestCompaniesPage";
import { OnboardingPage } from "@/pages/onboarding/OnboardingPage";
import { PaymentReturnPage } from "@/pages/payment/PaymentReturnPage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SubscriptionPlansPage } from "./pages/payment/SubscriptionPlanPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();
  
  // Show loading state while auth is initializing
  if (!isInitialized) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Only redirect once we know for sure the user isn't authenticated
  if (!isAuthenticated) {
    // Save the location they were trying to go to for redirecting after login
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return <>{children}</>;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/subscription/plans" element={<SubscriptionPlansPage />} />
        <Route path="/payment/return" element={<PaymentReturnPage />} />
      </Route>

      {/* Main App Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/firme" replace />} />
        <Route path="firme">
          <Route
            index
            element={
              <SubscriptionGuard>
                <CompaniesPage />
              </SubscriptionGuard>
            }
          />
          <Route
            path="latest"
            element={
              <SubscriptionGuard requiredFeature={null}>
                <LatestCompaniesPage />
              </SubscriptionGuard>
            }
          />
          <Route
            path=":cui"
            element={
              <SubscriptionGuard>
                <CompanyDetailsPage />
              </SubscriptionGuard>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};