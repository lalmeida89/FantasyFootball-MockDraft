import React, { Component } from 'react';
import {connect} from 'react-redux';
import './styles/App.css';
import Intro from './components/Intro'
import LandingPage from './components/Landing-Page'
import AnalysisPage from './components/Analysis-Page'
import PlayerProfile from './components/Player-Profile'
import Footer from './components/Footer'
import RightSide from './components/Right-Side-Display'
import LoadingScreen from './components/Pre-Draft-Loading-Screen'


class App extends Component {
  render() {
    const {finalPage} = this.props

    return (
      <div className='App'>
        { !finalPage ?
          <div>
            <LandingPage />
            <LoadingScreen />
            <PlayerProfile />
            <Intro />
            <RightSide />
            <Footer />
          </div>
          : <div><AnalysisPage /></div>
        }
      </div>
    )
  }
}

export const mapStateToProps=({analysisReducer, renderReducer})=>{
  return({
    finalPage: analysisReducer.finalPage
  })
}
export default connect (mapStateToProps)(App);
