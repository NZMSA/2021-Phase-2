import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";

import { Header } from "./stories/Header/Header";
import { Footer } from "./stories/Footer/Footer";
import FeedPage from "./FeedPage";
import { useQuery } from "@apollo/client";
import { SELF } from "./api/queries";
import { Self } from "./api/__generated__/Self";

function App() {
  const { loading, error, data } = useQuery<Self>(SELF);

  return (
    <div className="App">
      <Header user={data?.self} />
      <Switch>
        <Route
          path="/home"
          render={(props) => <FeedPage pageTitle="MSA Projects 2021" />}
        />
        <Route path="/submit">
          {/* TODO
            Render submit page here*/}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
