import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

import { Header } from './stories/Header/Header';
import { Footer } from './stories/Footer/Footer';
import FeedPage from './FeedPage';
import { ApolloProvider } from '@apollo/client';
import graphQLClient from './GraphQLClient';


function App() {
  // TODO token parser from window - for oauth
  // const token = (window.location.href.match(/\?code=(.*)/)) && (window.location.href.match(/\?code=(.*)/) ?? [1]);
  return (
    <ApolloProvider client={graphQLClient}>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/home">
          <FeedPage pageTitle="2021" />
        </Route>
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
