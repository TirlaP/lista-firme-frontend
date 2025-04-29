import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as JotaiProvider } from "jotai";
import { type ReactNode, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "@/apollo/client";
import { updateIsMobileAtom } from "@/atoms/mobile";
import { ApolloProvider } from "@apollo/client";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useSetAtom } from "jotai";
import { initializeCAENAtom } from "@/atoms/caen";

// Create an optimized query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't refetch on window focus - data doesn't change that often
      refetchOnWindowFocus: false,
      // Don't retry failed queries automatically
      retry: false,
      // Default stale time of 5 minutes for all queries unless specified
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
    },
  },
});

// Component to initialize application state
const AppInitializer = ({ children }: { children: ReactNode }) => {
  const initializeCAEN = useSetAtom(initializeCAENAtom);
  const updateIsMobile = useSetAtom(updateIsMobileAtom);

  // Initialize CAEN store on app startup
  useEffect(() => {
    console.log("App startup: Initializing CAEN store");
    initializeCAEN();
  }, [initializeCAEN]);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      updateIsMobile(window.innerWidth < 1024);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateIsMobile]);

  return <>{children}</>;
};

// Main app provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <TooltipProvider>
            <AppInitializer>
              <Router>
                {children}
                <ToastContainer />
              </Router>
            </AppInitializer>
          </TooltipProvider>
        </ApolloProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </JotaiProvider>
  );
};