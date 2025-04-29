import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};
