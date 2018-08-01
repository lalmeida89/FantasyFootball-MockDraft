import React, { Component } from 'react';
import {connect} from 'react-redux';
import './styles/App.css';
import Intro from './components/intro'
import DraftPage from './components/draftPreferences'
import AnalysisPage from './components/analysisPage'
import PlayerProfile from './components/playerProfile'
import Footer from './components/footer'
import RightSide from './components/rightSide'


class App extends Component {
  render() {
    const {finalPage} = this.props

    if(!finalPage){
      return (
        <div> <h1 className='mainHeader' style={{textAlign: 'center'}}> Mock Draft </h1>
        <div className="App">
            <PlayerProfile />
          <Intro />
          <RightSide />
          <DraftPage />
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
    finalPage: analysisReducer.finalPage
  })
}
export default connect (mapStateToProps)(App);
