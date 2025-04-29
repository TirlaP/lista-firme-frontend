import { useMobile } from "@/atoms/mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import {
  BarChart2,
  Building2,
  Calendar,
  ChevronRight,
  FileText,
  Globe,
  Mail,
  Phone,
  Search,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Sidebar NavLink component
const NavLink = ({ to, icon: Icon, children, exact = false, count }) => {
  const location = useLocation();
  const { toggleSidebar, isMobile } = useMobile();

  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);

  const handleClick = () => {
    // Close sidebar on mobile when link is clicked
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-blue-50 text-blue-700"
          : "text-gray-700 hover:text-blue-700 hover:bg-blue-50",
      )}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        <span>{children}</span>
      </div>
      {count && (
        <span className="ml-auto bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};

export const SidebarComponent = () => {
  return (
    <div className="flex flex-col h-full bg-white shadow-lg border-r border-gray-200">
      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="relative w-full mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Caută nume, cui, website, etc."
            className="w-full pl-10 pr-4 py-2"
          />
        </div>

        <nav className="space-y-6">
          <div>
            <div className="font-medium text-sm text-gray-700 mb-2">
              Servicii
            </div>
            <div className="space-y-1">
              <NavLink to="/firme/latest" icon={Building2} exact>
                Bază de date cu firme
              </NavLink>
            </div>
          </div>

          <div>
            <div className="font-medium text-sm text-gray-700 mb-2">
              Caută firme
            </div>
            <div className="space-y-1">
              <NavLink to="/firme/caen" icon={FileText}>
                Firme după CAEN, Județ, Profit, etc.
              </NavLink>
              <NavLink to="/firme/telefon" icon={Phone}>
                Firme cu număr de telefon
              </NavLink>
              <NavLink to="/firme/email" icon={Mail}>
                Firme cu adresă de email
              </NavLink>
              <NavLink to="/firme/website" icon={Globe}>
                Firme cu website
              </NavLink>
              <NavLink to="/firme/admin" icon={Users}>
                Firme cu administrator
              </NavLink>
            </div>
          </div>

          <div>
            <div className="font-medium text-sm text-gray-700 mb-2">
              Liste cu firme
            </div>
            <div className="space-y-1">
              <NavLink to="/topuri/industrii" icon={BarChart2}>
                Top Industrii România
              </NavLink>
              <NavLink to="/topuri/judete" icon={BarChart2}>
                Top firme pe județe
              </NavLink>
              <NavLink to="/firme/noi" icon={Calendar} count="119495">
                Firme nou înființate
              </NavLink>
            </div>
          </div>

          <div>
            <div className="font-medium text-sm text-gray-700 mb-2">
              Aplicații utile
            </div>
            <div className="space-y-1">
              <NavLink to="/liste" icon={FileText}>
                Operații cu liste
              </NavLink>
              <NavLink to="/blog" icon={FileText}>
                Blog
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      {/* CTA Button at bottom */}
      <div className="p-4 mt-auto border-t border-gray-100">
        <Button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md flex items-center justify-center">
          <span>Dorești o ofertă personalizată?</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
