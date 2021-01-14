import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import "../assets/scss/main.scss";
import MusiciansList from "./MusiciansList";
import NewMusicianForm from "./NewMusicianForm";

const App = props => {
  return (
    <div className="grid-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MusiciansList} />
          <Route exact path="/musicians" component={MusiciansList} />
          <Route exact path="/musicians/new" component={NewMusicianForm} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default hot(App);
