import * as ReactDOM from "react-dom";
import Apollo_Graphql_Usecases from "./Components/apollo_graphql_usecases";
import { Component } from "react";
import ApolloMutation from "./Components/apollo_mutation";
import ApolloQuery from "./Components/apollo_query";
import ApolloQuickstart from "./Components/apollo_quickstart";

//<Apollo_Graphql_Usecases></Apollo_Graphql_Usecases>
//<ApolloMutation></ApolloMutation>
//<ApolloQuery></ApolloQuery>

class DisplayArea extends Component {
  render() {
    return (
      <>
        <ApolloQuickstart></ApolloQuickstart>
      </>
    );
  }
}

ReactDOM.render(<DisplayArea />, document.getElementById("root"));

