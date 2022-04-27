import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useLazyQuery,
} from "@apollo/client";

const DOG_URI = "https://71z1g.sse.codesandbox.io/";

const client = new ApolloClient({
  uri: DOG_URI,
  cache: new InMemoryCache(),
});

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return <p>Loading...Please Wait</p>;
  if (error) return <p>`Error : ${error.message}`</p>;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}

function DogPhoto({ breed }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
      // pollInterval: 500 //polling data every 0.5s
    }
  );

  //using 4 instead of networkStatus.refetch
  if (networkStatus === 4) return <p>Hello wait, refetching....</p>;
  if (loading) return <p>Loading...Please Wait</p>;
  if (error) return <p>`Error : ${error.message}`</p>;

  return (
    <>
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      <br></br>
      <button onClick={() => refetch()}> Refetch Button </button>
    </>
  );
}

function DelayedQuery() {
  const [getDog, { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO);
  if (loading) return <p>Loading...Please Wait</p>;
  if (error) return <p>`Error : ${error.message}`</p>;

  return (
    <div>
      <p>Delayed Query</p>
      {data?.dog && <img src={data.dog.displayImage} style={{ height: 100, width: 100 }}></img>}
      <br></br>
      <button onClick={() => getDog({ variables: { breed: "bulldog" } })}>
        {" "}
        DelayedQuery
      </button>
    </div>
  );
}

function App() {
  const [selectedDog, setSelectedDog] = useState(null);

  function onDogSelected({ target }) {
    setSelectedDog(target.value);
  }

  return (
    <div>
      <h2> First Apollo App</h2>
      <Dogs onDogSelected={onDogSelected}></Dogs>
      <br></br>
      {selectedDog && <DogPhoto breed={selectedDog} />}
      <br></br>
      <DelayedQuery></DelayedQuery>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ApolloProvider client={client}>
      <App></App>
    </ApolloProvider>
  </>
);
