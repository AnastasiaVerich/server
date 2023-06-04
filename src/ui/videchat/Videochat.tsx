import Room from './Videochat_room';
import Main from './Videochat_dont_exist';
import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export const  Videochat=()=> {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/room/:id' component={Room}/>
        <Route exact path='/' component={Main}/>
      </Switch>
    </BrowserRouter>
  );
}


