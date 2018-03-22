import React from 'react'
import { render } from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </ApolloProvider>
  , document.getElementById('root')
);

registerServiceWorker();
