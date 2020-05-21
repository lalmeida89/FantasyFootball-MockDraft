import React from 'react';
import {TeamAbbr} from '../../styledComponents/teamAbbr';
import {Position} from '../../styledComponents/position';
import '../../styles/playerCard.css';

export const ProfileHeader = (props) => {
  let style = {
    float:'right',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '0'
  }
  let borderStyle = {border: '1px solid'}
  const {player} = props
  return (
    <div className='playrHedr'>
      <h1> {player.displayName} </h1>
      <h3>
        <Position style = {borderStyle} position={player.position}> {player.position}</Position>
        <TeamAbbr team={player.team}> {player.team} </TeamAbbr>
        <p> ADP : {player.nerdRank} </p>
        <p> Overall Rank : {player.overallRank} </p>
        <p> {player.position} Rank : {player.positionRank} </p>
        <p> Bye Week : {player.byeWeek} </p>
      </h3>
    </div>
  )
}
