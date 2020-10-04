// import { split } from 'apollo-link';
// import { HttpLink } from 'apollo-link-http';
// import { ApolloClient } from 'apollo-client';
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';
// import { InMemoryCache } from 'apollo-boost';

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:5000/graphql`,
//   options: {
//     reconnect: false,
//   },
// });

// const httpLink = new HttpLink({
//   uri: '"https://e-taqreeb-api.herokuapp.com"/graphql',
// });

// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

// export default new ApolloClient({
//   cache: new InMemoryCache(),
//   link
// });



import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true,
  },
});

export default new ApolloClient({
  link,
  uri: ""https://e-taqreeb-api.herokuapp.com"/graphql",
  cache: new InMemoryCache(),
});
