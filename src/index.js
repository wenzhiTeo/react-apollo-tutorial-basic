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
  useMutation,
} from "@apollo/client";

const MUTATION_URI = "https://sxewr.sse.codesandbox.io/";

const client = new ApolloClient({
  uri: MUTATION_URI,
  cache: new InMemoryCache(),
});

const GET_TODOS = gql`
  {
    todos {
      id
      type
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo, 
    { 
      loading: mutationLoading, 
      error: mutationError 
    }] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.todos.map(({ id, type }) => {
    let input;
    return (
      <div key={id}>
        <p>{type}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTodo({variables:{id,type:input.value}});
            input.value=""
          }}
        >
          <input
            ref={(node) => {
              input = node;
            }}
          ></input>

          <button type="submit">Update Todo</button>
        </form>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
      </div>
    );
  });
}

function AddTodo() {
  let input; // the input variable which will hold reference to the input element
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
    //refetchQueries: [
    //  GET_TODOS, // DocumentNode object parsed with gql
    //],
    //Using above the mutation will trigger refetch on query mentioned

    update(cache, { data: { addTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });
  if (loading) return "Submitting...";
  if (error) return `Submission error : ${error.message}`;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node; // assign the node reference to the input variable
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div>
      <h2> First Apollo App</h2>
      <h3>Add New Todo</h3>
      <AddTodo></AddTodo>

      <h3>Todo List</h3>
      <Todos></Todos>
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
