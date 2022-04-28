import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const EXCHANGE_RATES_URI = "https://48p1r2roz4.sse.codesandbox.io";

const client = new ApolloClient({
  uri: EXCHANGE_RATES_URI,
  cache: new InMemoryCache(),
});

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...Please Wait</p>;
  if (error) return <p>Error : </p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}:{rate}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div>
      <h2> First Apollo App</h2>
      <ExchangeRates></ExchangeRates>
    </div>
  );
}

function ApolloQuickstart() {
  return (
    <>
      <ApolloProvider client={client}>
        <App></App>
      </ApolloProvider>
    </>
  );
}

export default ApolloQuickstart;
