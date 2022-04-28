const express = require("express");

const PORT = process.env.PORT || 6969;
const cors = require('cors')
const app = express();

const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/index");

app.use(cors())
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Server running");
});
