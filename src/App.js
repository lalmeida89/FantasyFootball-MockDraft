import React, { Component } from 'react';
import {connect} from 'react-redux';
import './styles/App.css';
import Intro from './components/Intro'
import DraftPage from './components/Draft-Preferences'
import AnalysisPage from './components/Analysis-Page'
import PlayerProfile from './components/Player-Profile'
//import Footer from './components/Footer'
import RightSide from './components/Right-Side-Display'
import LoadingScreen from './components/Pre-Draft-Loading-Screen'


class App extends Component {
  render() {
    const {finalPage} = this.props

    return (
      <div className='App'>
        <h1 className='mainHeader' style={{textAlign: 'center'}}> Build-A-Champion Workshop 2018 </h1>
        { !finalPage ?
          <div>
            <LoadingScreen />
            <PlayerProfile />
            <Intro />
            <RightSide />
            <DraftPage />
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
