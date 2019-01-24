import React from 'react';
import {Transition} from 'react-transition-group';

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

export const ShowAllTeams = props => {
  let showPlayers = props.finalPage, teams = props.teams,
    draftPosition = props.draftPos, userIcon = <i className="fas fa-user"></i>
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

export default ShowAllTeams
