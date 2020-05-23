import React from 'react';

let style = {
  fontSize: '9px',
  fontStyle:'italic'
}

export const ShowDraftedPlayers = props => {
  const {
    draftedPlayers,
    getPlayerProfile,
    teams,
    draftPos
  } = props;

  let playersDraftedList = draftedPlayers.map((player, index) => {
    let myTeam = teams[draftPos-1]
    return (
      <div key={index} className='drafted'
        id={myTeam.includes(player)?'myTeam-player' : null}
        onClick={()=>getPlayerProfile(player)}>
        <p style={style}>TEAM {player.teamDraftedBy} </p>
        <p className='draftedPlayer'>
          {player.round}.{player.pickedAt<10 ? '0'+player.pickedAt : player.pickedAt} {' '}
          {player.displayName.substr(0,player.displayName.indexOf(' '))}<br/>
          <b className='player-lastName'> {player.displayName.substr(player.displayName.indexOf(' ')+1)} </b>
           {player.position}
        </p>
      </div>
    )
  })

  return (
    <div className='draftedPlayers-container'>
      {playersDraftedList}
    </div>
  )
}
