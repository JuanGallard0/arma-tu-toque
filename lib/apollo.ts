import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const URL = `${process.env.AUTH0_BASE_URL}/api/graphql`.replace("undefined","");

export const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          links: relayStylePagination(),
        },
      },
    },
  }),
});