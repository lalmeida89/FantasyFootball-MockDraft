import React from 'react';
import { TeamAbbr } from '../../styledComponents/teamAbbr';
import { Position } from '../../styledComponents/position';
import '../../styles/playerCard.css';

export const ProfileHeader = (props) => {
  let style = {
    float: 'right',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '0'
  }
  let borderStyle = { border: '1px solid' }
  const { player } = props
  return (
    <div className='playerHeader'>
      <div className='playerNameAndPos'>
        <h1> {player.displayName} </h1>
        <Position style={borderStyle} position={player.position}> {player.position}</Position>
        <TeamAbbr team={player.team}> {player.team} </TeamAbbr>
      </div>
      <div className='playerStats'>
        <p> ADP </p>
        <p> Overall Rank </p>
        <p> {player.position} <br /> Rank </p>
        <p> Bye Week </p>
        <p> {player.nerdRank} </p>
        <p> {player.overallRank} </p>
        <p> {player.positionRank} </p>
        <p> {player.byeWeek} </p>
      </div>
    </div>
  )
}
