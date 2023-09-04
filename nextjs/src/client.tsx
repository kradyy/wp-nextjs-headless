import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";

const noCache: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: process.env.WP_GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: process.env.NODE_ENV !== "production" ? noCache : undefined,
});

export default client;
