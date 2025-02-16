// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

export const App = () => {
	return (
    <ApolloProvider client={client}>
		<QueryClientProvider client={queryClient}>
			<Router>
				<AppRoutes />
				<ToastContainer />
			</Router>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
		</ApolloProvider>
	);
};

