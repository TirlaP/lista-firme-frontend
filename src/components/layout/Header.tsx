// src/components/layout/Header.tsx
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
	const { user, logout } = useAuth();

	return (
		<header className="bg-white border-b border-gray-200">
			<div className="px-4 h-16 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<h1 className="text-xl font-semibold text-gray-900">
						Company Directory
					</h1>
				</div>
				<div className="flex items-center space-x-4">
					<span className="text-sm text-gray-600">{user?.email}</span>
					<Button onClick={logout} variant="ghost" size="sm">
						Logout
					</Button>
				</div>
			</div>
		</header>
	);
};

