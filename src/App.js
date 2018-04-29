import React, { Component } from 'react';
import './App.css';
import Intro from './components/intro'
import PlayerProfile from './components/playerProfile'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerProfile />
        <Intro />
      </div>
    );
  }
}

export default App;
