import ApolloClient from 'apollo-boost';
import resolvers from './resolvers';
import defaults from './defaults';
import typeDefs from './typeDefs';

export default (uri) => new ApolloClient({
  uri: uri || 'https://nx9zvp49q7.lp.gql.zone/graphql',
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
});
