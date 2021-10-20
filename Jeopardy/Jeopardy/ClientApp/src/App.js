import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './Home/Home.component';
import Game from './Game/game';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <div>
            <Route exact path='/' component={Home} />
            <Route path='/game' component={Game} />
        </div>
    );
  }
}
