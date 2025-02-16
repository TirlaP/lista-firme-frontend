import { MainLayout } from "@/components/layout/MainLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { OnboardingPage } from "@/pages/onboarding/OnboardingPage";
import { PaymentReturnPage } from "@/pages/payment/PaymentReturnPage";
import { CompaniesPage } from "@/pages/companies/CompaniesPage";
import { CompanyDetailsPage } from "@/pages/companies/CompanyDetailsPage";
import { LatestCompaniesPage } from "@/pages/companies/LatestCompaniesPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { SubscriptionPlansPage } from "./pages/payment/SubscriptionPlanPage";
import { SubscriptionGuard } from "@/components/subscription/SubscriptionGuard";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
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
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/companies" replace />} />
        <Route path="companies">
          <Route index element={<SubscriptionGuard><CompaniesPage /></SubscriptionGuard>} />
          <Route path="latest" element={<SubscriptionGuard><LatestCompaniesPage /></SubscriptionGuard>} />
          <Route path=":cui" element={<SubscriptionGuard><CompanyDetailsPage /></SubscriptionGuard>} />
        </Route>
      </Route>
    </Routes>
  );
};