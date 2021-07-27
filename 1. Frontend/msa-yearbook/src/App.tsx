import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { SubmitForm } from "./stories/SubmitForm/SubmitForm";
import FeedPage from "./FeedPage";
import { ApolloProvider } from "@apollo/client";
import graphQLClient from "./GraphQLClient";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  // TODO token parser from window - for oauth
  // const token = (window.location.href.match(/\?code=(.*)/)) && (window.location.href.match(/\?code=(.*)/) ?? [1]);
  return (
    <ApolloProvider client={graphQLClient}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/home">
              <FeedPage pageTitle="MSA Projects 2021" />
            </Route>
            <Route path="/submit">
              <SubmitForm />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
