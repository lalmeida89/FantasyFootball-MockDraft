import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import Intro from './components/intro'
import TeamRosters from './components/teamRosters'
import PlayersDrafted from './components/playersDrafted'
import DraftPage from './components/draftPreferences'
import Favorites from './components/favorites'
import AnalysisPage from './components/analysisPage'
import PlayerProfile from './components/playerProfile'

class App extends Component {
  render() {
    const {finalPage} = this.props

    if(!finalPage){
      return (
        <div className="App">
          <h1 style={{textAlign: 'center'}}> Mock Draft </h1><hr/>
          <PlayerProfile />
          <DraftPage />
          <PlayersDrafted />
          <Intro />
          <TeamRosters />
          <Favorites />
        </div>
    );}
    else if(finalPage){
      return (
        <div className='App'>
          <AnalysisPage />
        </div>
      )
    }
  }
}

export const mapStateToProps=({analysisReducer})=>{
  return({
    finalPage: analysisReducer.finalPage
  })
}
export default connect (mapStateToProps)(App);
