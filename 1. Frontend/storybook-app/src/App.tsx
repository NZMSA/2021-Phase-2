import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

import { Header } from './stories/Header/Header';
import { Footer } from './stories/Footer/Footer';
import FeedPage from './FeedPage';
import { ApolloProvider } from '@apollo/client';
import graphQLClient from './GraphQLClient';


function App() {
  return (
    <ApolloProvider client={graphQLClient}>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/home" render={(props) => (
          <FeedPage pageTitle="MSA Projects 2021" />
        )}/>
        <Route path="/submit">
          {/* TODO
          Render submit page here*/}
        </Route>
      </Switch>
      <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
