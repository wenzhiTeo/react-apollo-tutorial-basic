import Apollo_Graphql_Usecases from "./Components/apollo_graphql_usecases";
import { Component } from "react";
import ReactDOM from "react-dom/client";
import ApolloMutation from "./Components/apollo_mutation";
import ApolloQuery from "./Components/apollo_query";
import ApolloQuickstart from "./Components/apollo_quickstart";

//<Apollo_Graphql_Usecases></Apollo_Graphql_Usecases>
//<ApolloMutation></ApolloMutation>
//<ApolloQuery></ApolloQuery>
//<ApolloQuickstart></ApolloQuickstart>

class DisplayArea extends Component {
  render() {
    return (
      <>
        <Apollo_Graphql_Usecases></Apollo_Graphql_Usecases>
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <DisplayArea></DisplayArea>
  </>
);
