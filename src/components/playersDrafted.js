import React from 'react';
import {connect} from 'react-redux';

import PlayerProfile from './playerProfile'
import {getPlayerProfile} from '../actions/setCurrentPlayerAction'

const ShowDraftedPlayers = props => {
  let style = {fontSize: '13px', lineHeight: '8px'}
  let playersDraftedList = props.draftedPlayers.map((player, index) => (
    <div key={index} style={style} className='drafted'>
      <p className='draftedPlayer' onClick={()=>props.allProps.dispatch(getPlayerProfile(player.id))}>
        {player.round}.{player.pickedAt}  {player.name} {player.position}
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
    return (
      <div className='draftedPlayersList'>
        <h2> Players Taken </h2>
        <ShowDraftedPlayers draftedPlayers={this.props.playersUsed} allProps={this.props}/>
      </div>
    )
  }
}


export const mapStateToProps = ({draftPreferencesReducer, counterReducer, playersReducer}) => {
  return ({
    playersUsed: draftPreferencesReducer.playersUsed,
    counter: counterReducer.counter,
    teamCount: draftPreferencesReducer.teamCount,
    currentPlayer: playersReducer.currentPlayer,

  })
}
export default connect (mapStateToProps)(PlayersDrafted)
