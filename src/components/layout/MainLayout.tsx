// src/components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<div className="flex" style={{ height: "calc(100vh - 4rem)" }}>
				<Sidebar />
				<main className="flex-1">
					<div className="h-full p-8">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

