import React from 'react';
import {connect} from 'react-redux';

import {getPlayerProfile} from '../actions/setCurrentPlayerAction'


const ShowDraftedPlayers = props => {
  let playersDraftedList = props.draftedPlayers.map((player, index) => (
    <div key={index} className='drafted'
      onClick={()=>props.allProps.dispatch(getPlayerProfile(player.id))}>
      <p style={{fontSize: '9px', fontStyle:'italic'}}>TEAM {player.pickedAt} </p>
      <p className='draftedPlayer'>
        {player.round}.{index+1}  {player.name.substr(0,player.name.indexOf(' '))}
        <b className='player-lastName'> {player.name.substr(player.name.indexOf(' ')+1)} </b>
         {player.position}
      </p>

    </div>
  ))
  return (
    <div>
    {playersDraftedList}
    </div>
  )
}

class PlayersDrafted extends React.Component {
  render(){
    const{showDraftedPlayers} = this.props
    return (
      <div className='draftedPlayersList'>
        <h2 className='drafted-header'> Players Taken </h2>
        <ShowDraftedPlayers draftedPlayers={this.props.playersUsed} allProps={this.props} teamsTotal={this.props.teamCount}/>
      </div>
    )
  }
}


export const mapStateToProps = ({draftPreferencesReducer, counterReducer, playersReducer, renderReducer}) => {
  return ({
    playersUsed: draftPreferencesReducer.playersUsed,
    counter: counterReducer.counter,
    teamCount: draftPreferencesReducer.teamCount,
    currentPlayer: playersReducer.currentPlayer,
    showDraftedPlayers: renderReducer.showDraftedPlayers

  })
}
export default connect (mapStateToProps)(PlayersDrafted)
