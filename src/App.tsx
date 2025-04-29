import { AppProvider } from "@/AppProvider";
import { AppRoutes } from "@/routes";

export const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
