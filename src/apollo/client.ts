import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    if ("statusCode" in networkError && networkError.statusCode === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }
});

// For Apollo Client, we'll use minimal caching since React Query
// will be our primary caching layer
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        companies: {
          // We need to keep pagination merging for direct Apollo client calls
          keyArgs: ["input"],
          merge(existing, incoming, { args }) {
            if (!existing) return incoming;
            if (args?.input?.after) {
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              };
            }
            return incoming;
          },
        },
        latestCompanies: {
          keyArgs: ["input"],
          merge(existing, incoming, { args }) {
            if (!existing) return incoming;
            if (args?.input?.after) {
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              };
            }
            return incoming;
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      // Using network-only by default since React Query handles caching
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});