import Room from './pages/Room';
import Main from './pages/Main';
import NotFound404 from './pages/NotFound404';
import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export function Videochat() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/room/:id' component={Room}/>
        <Route exact path='/' component={Main}/>
        <Route component={NotFound404}/>
      </Switch>
    </BrowserRouter>
  );
}


