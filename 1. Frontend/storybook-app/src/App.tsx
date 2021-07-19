import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { Header } from './stories/Header/Header';

function App() {
  // TODO token parser from window - for oauth
  // const token = (window.location.href.match(/\?code=(.*)/)) && (window.location.href.match(/\?code=(.*)/) ?? [1]);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/home">
          {/* Render cards here */}
        </Route>
        <Route path="/submit">
          {/* Render submit page here*/}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
