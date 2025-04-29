import {
  isInitializedAtom,
  updateIsMobileAtom,
  useMobile,
} from "@/atoms/mobile";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SidebarComponent } from "./Sidebar";

export const MainLayout = () => {
  const updateIsMobile = useSetAtom(updateIsMobileAtom);
  const { sidebarOpen, isMobile, isInitialized } = useMobile();
  const [initialRender, setInitialRender] = useState(true);

  // Initialize immediately, then set up resize listener
  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 1024;
      updateIsMobile(currentIsMobile);
    };

    // Run once to set initial values, then mark initialization complete
    handleResize();
    // Wait a frame to avoid flicker
    window.requestAnimationFrame(() => {
      setInitialRender(false);
    });

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateIsMobile]);

  // Hide everything until initialized to prevent flicker
  if (initialRender) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Render just the header initially */}
        <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
          <Header />
          <main className="flex-grow overflow-auto p-4 lg:p-6">
            <div className="w-full mx-auto">
              <div className="h-10" /> {/* Placeholder */}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={() => useMobile().closeSidebar()}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Fixed on mobile, part of flex layout on desktop */}
      <aside
        className={`
          fixed lg:static z-30
          h-full
          ${
            isMobile
              ? `transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-[290px]`
              : `${sidebarOpen ? "w-[290px]" : "w-0 overflow-hidden"}`
          }
        `}
      >
        <SidebarComponent />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
        <Header />

        <main className="flex-grow overflow-auto p-4 lg:p-6">
          <div className="w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
