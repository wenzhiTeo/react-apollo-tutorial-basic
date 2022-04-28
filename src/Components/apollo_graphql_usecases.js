import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import ReactDOM from "react-dom/client";
import { onError } from "@apollo/client/link/error";
import GetUsers from "./GetUsers";
import Form from "./Form";

// This usecase applied the GraphQL Folder things and the localhost database

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql Error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:6969/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function Apollo_Graphql_Usecases() {
  return (
    <ApolloProvider client={client}>
      <Form></Form>
    </ApolloProvider>
  );
}

export default Apollo_Graphql_Usecases;
