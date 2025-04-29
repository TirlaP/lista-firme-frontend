import { logoutAtom, userAtom } from "@/atoms/auth";
import { useMobile } from "@/atoms/mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAtomValue, useSetAtom } from "jotai";
import { ChevronLeft, Menu, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const user = useAtomValue(userAtom);
  const logout = useSetAtom(logoutAtom);
  const { sidebarOpen, toggleSidebar } = useMobile();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Left section with menu toggle and logo */}
        <div className="flex items-center">
          <Button
            id="sidebar-toggle"
            variant="ghost"
            size="icon"
            className="mr-4 p-0 h-10 w-10 hover:bg-gray-100 hover:text-gray-900"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Logo always visible in header */}
          <Link to={'/'}>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-red-500"></div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-red-600 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Targetare.ro
              </h1>
            </div>
          </Link>
        </div>

        {/* Search field - hidden on small mobile, visible on medium screens and up */}
        <div className="hidden md:flex relative w-full max-w-md mx-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Caută nume, cui, website, telefon, etc."
            className="w-full pl-10 pr-4 py-2"
          />
        </div>

        {/* User section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <span className="text-sm text-gray-600 hidden md:inline-block">
            {user?.email || "admin@example.com"}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => logout()}
          >
            <User className="h-4 w-4" />
            <span className="hidden md:inline-block">Deconectare</span>
          </Button>
        </div>
      </div>

      {/* Mobile search - only visible on small screens */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Caută nume, cui, website, telefon, etc."
            className="w-full pl-10 pr-4 py-2"
          />
        </div>
      </div>
    </header>
  );
};
