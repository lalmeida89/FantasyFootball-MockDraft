import React from 'react';
import {connect} from 'react-redux';
import { Transition } from 'react-transition-group'

import '../styles/finalPage.css'

const duration = 1000

const playerNamesStyle = {
  transition: `opacity ${duration}ms`
}

const playerNamesTransitionStyles = {
  entering: {opacity: 0},
  entered: {opacity: '1'},
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
  return <div className='mappedTeam-div'>{thisTeam} </div>
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
      {mappedTeam(team)}
    </div>
  ))
  return (
    <Transition in={showPlayers} timeout={duration}>
    {(state) => (
    <div className='teamResults-div' style={{
      ...playerNamesStyle,
      ...playerNamesTransitionStyles[state]}}>
      {teamNames}
    </div>
  )}
  </Transition>
  )
}

class AnalysisPage extends React.Component{
  constructor(props){
    super(props);
    this.state={isOpen : false}
  }

  componentDidMount(){
    this.setState({isOpen : true})
  }

  render(){
    const {teams, draftPos, finalPage} = this.props
    return (
      <div className='analysisPage'>
        <div className='teams-container'>
          <ShowAllTeams teams={teams} draftPos={draftPos} finalPage={this.state.isOpen}/>
        </div>
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
