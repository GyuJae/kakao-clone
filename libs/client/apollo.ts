import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
//import { WebSocketLink } from "apollo-link-ws";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

export const LOCALSTORAGE_TOKEN = "TOKEN";

const token =
  typeof window !== "undefined" ? localStorage.getItem(LOCALSTORAGE_TOKEN) : "";
export const authTokenVar = makeVar(token);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
  })
);

// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: `ws://localhost:4000/graphql`,
//       options: {
//         reconnect: true,
//         connectionParams: {
//           "x-jwt": authTokenVar() || "",
//         },
//       },
//     })
//   : null;

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://localhost:4000/graphql",
//     connectionParams: {
//       "x-jwt": authTokenVar() || "",
//     },
//   })
// );

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
