import React from 'react';
import {connect} from 'react-redux';

const ShowDraftedPlayers = props => {
  console.log(props);
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
        <ShowDraftedPlayers draftedPlayers={this.props.playersUsed} />
      </div>
    )
  }
}


export const mapStateToProps = ({teamReducer}) => {
  return ({
    playersUsed: teamReducer.playersUsed
  })
}
export default connect (mapStateToProps)(PlayersDrafted)
