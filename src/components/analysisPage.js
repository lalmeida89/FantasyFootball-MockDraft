import React from 'react';
import {connect} from 'react-redux';
import { Transition } from 'react-transition-group'

import '../styles/finalPage.css'

const duration = 10000

const playerNamesStyle = {
  transition: `opacity ${duration}ms`
}

const playerNamesTransitionStyles = {
  entering: {opacity: 0},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0}
}

const mappedTeam = currentTeam => {
  let thisTeam = currentTeam.map((player, i) => (
    <div key={i}>
      {player.name ?
        player.name
        : player.firstName + player.lastName}
      {' '} {player.round}.{player.pickedAt}
    </div>
  ))
  return <div>{thisTeam} </div>
}

const ShowAllTeams = props => {
  let showPlayers = props.finalPage
  let teams = props.teams
  let draftPosition = props.draftPos
  let userIcon = <i className="fas fa-user"></i>
  let teamNames = teams.map((team, index) => (
    <div key={index} className='teamResults'>
      <h3> Team {index+1}
        { index === draftPosition-1
        ? userIcon
        : null }
        </h3>
      <Transition in={showPlayers} timeout={duration}>
      {(state) => (
        <div className='trans-in' style={{
          ...playerNamesStyle,
          ...playerNamesTransitionStyles[state]}}>
          {mappedTeam(team)}
        </div>
      )}
      </Transition>
    </div>
  ))
  return (
    <div className='teamResults-div'>
      {teamNames}
    </div>
  )
}

class AnalysisPage extends React.Component{
  render(){
    const {teams, draftPos, finalPage} = this.props
    return (
      <div className='analysisPage'>
        <ShowAllTeams teams={teams} draftPos={draftPos} finalPage={finalPage}/>
      </div>
    )
  }
}

export const mapStateToProps =({draftPreferencesReducer, analysisReducer})=> {
  console.log(draftPreferencesReducer);
  return ({
    teams: draftPreferencesReducer.teams,
    draftPos: draftPreferencesReducer.draftPos,
    finalPage: analysisReducer.finalPage

  })
}

export default connect (mapStateToProps)(AnalysisPage)
