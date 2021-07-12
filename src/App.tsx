import React from 'react';
import { Switch, Route } from "react-router-dom"
import Favorites from './components/Favorites';

import Header from "./components/Header"
import Main from './pages/Main';
import Movie from './pages/Movie';

import DefaultRedirect from './routing/DefaultRedirect';

const App: React.FC = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Header/>
      <Switch>

        <Route exact path="/movies">
          <Main/>
        </Route>

        <Route exact path={"/movie/:id"}>
          <Movie/>
        </Route>

        <DefaultRedirect/>

      </Switch>
      <Favorites/>
    </React.Fragment>
  );
}

export default App;
