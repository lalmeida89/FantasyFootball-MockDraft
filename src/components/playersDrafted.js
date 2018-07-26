import React from 'react';
import {connect} from 'react-redux';

const ShowDraftedPlayers = props => {
  console.log(props)
  //will update soon, currently maps through list of players that have been drafted and displays them.
  /*let playerPick = (index) => {
    if (index < props.allProps.teamCount)
    {
       for(let i=index; i<props.allProps.teamCount; i++){
         return i+1
         console.log(i)
       }
    }
    if (index >= props.allProps.teamCount){
       for(let i=index; i; i--){
         return i+1
         console.log(i)
       }
    }
  }*/
  let style = {fontSize: '13px', lineHeight: '8px'}
  let playersDraftedList = props.draftedPlayers.map((player, index) => (
    <div key={index} style={style} className='drafted'>
      <p> 1.{index+1} {player.firstName} {player.lastName} {player.position} </p>
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


export const mapStateToProps = ({draftPreferencesReducer, counterReducer}) => {
  return ({
    playersUsed: draftPreferencesReducer.playersUsed,
    counter: counterReducer.counter,
    teamCount: draftPreferencesReducer.teamCount

  })
}
export default connect (mapStateToProps)(PlayersDrafted)
