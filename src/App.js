import React, { Component } from 'react';
import {connect} from 'react-redux';
import './styles/App.css';
import Intro from './components/intro'
import TeamRosters from './components/teamRosters'
import PlayersDrafted from './components/playersDrafted'
import DraftPage from './components/draftPreferences'
import Favorites from './components/favorites'
import AnalysisPage from './components/analysisPage'
import PlayerProfile from './components/playerProfile'
import Footer from './components/footer'
import RightSide from './components/rightSide'


class App extends Component {
  render() {
    const {
      finalPage,
      showDraftedPlayers,
      showRosters,
      showFavorites
    } = this.props

    if(!finalPage){
      return (
        <div> <h1 className='mainHeader' style={{textAlign: 'center'}}> Mock Draft </h1>
        <div className="App">
          <PlayerProfile />
          <Intro />
          <RightSide />
          <div className="rightSite-App">
            <DraftPage />
            <TeamRosters />
            <Favorites />
          </div>
          <Footer />
        </div>
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

export const mapStateToProps=({analysisReducer, renderReducer})=>{
  return({
    finalPage: analysisReducer.finalPage,
    showDraftedPlayers: renderReducer.showDraftedPlayers,
    showFavorites: renderReducer.showFavorites,
    showRosters: renderReducer.showRosters
  })
}
export default connect (mapStateToProps)(App);
