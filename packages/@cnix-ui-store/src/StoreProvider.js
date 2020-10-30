import React from 'react';
import { ApolloProvider } from '@apollo/client';
import createClient from './createClient';

const client = createClient();

const StoreProvider = ({
  children,
}) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default StoreProvider;
