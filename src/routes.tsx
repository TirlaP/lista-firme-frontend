// src/routes/AppRoutes.tsx

import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/auth/LoginPage";
import { CompaniesPage } from "@/pages/companies/CompaniesPage";
import { CompanyDetailsPage } from "@/pages/companies/CompanyDetailsPage";
import { LatestCompaniesPage } from "@/pages/companies/LatestCompaniesPage";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
};

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<MainLayout />
					</ProtectedRoute>
				}
			>
				<Route index element={<Navigate to="/companies" replace />} />
				<Route path="companies">
					<Route index element={<CompaniesPage />} />
					<Route path="latest" element={<LatestCompaniesPage />} />
					<Route path=":cui" element={<CompanyDetailsPage />} />
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};
