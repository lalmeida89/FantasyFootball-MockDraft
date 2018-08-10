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

    return (
      <div className='App'>
        <h1 className='mainHeader' style={{textAlign: 'center'}}> Build-A-Champion Workshop 2018 </h1>
        { !finalPage ?
          <div>
            <PlayerProfile />
            <Intro />
            <RightSide />
            <DraftPage />
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
