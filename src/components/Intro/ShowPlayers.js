import React from 'react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Button } from '../../styledComponents/dropdown';
import { PlayerSelector } from '../../styledComponents/playerSelector';
import { Position } from '../../styledComponents/position';
import { TeamAbbr } from '../../styledComponents/teamAbbr';

//sort function to sort players by their rank
const sort_by = (field, reverse, primer) => {
  var key = primer ?
    function (x) { return primer(x[field]) } :
    function (x) { return x[field] };
  reverse = !reverse ? 1 : -1;
  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a < b) - (b < a));
  }
}

export const ShowPlayers = props => {
  console.log(props);
  props.players.sort(sort_by('overallRank', true, parseInt));
  let playerNames = props.players.map((player, index) => (
    <PlayerSelector
      position={player.position}
      onClick={() => props.getPlayerProfile(player)}
      key={index}>
      <div className='playerName'
        style={!props.isOpen ? { gridTemplateColumns: '30px 30px 3fr 1fr 1fr 1fr' } : { gridTemplateColumns: '30px 30px 5fr 1fr' }}>
        <b><Position position={player.position}> {player.position === 'DEF' ? 'DS' : player.position}</Position></b>
        <TeamAbbr team={player.team}> {!player.team ? 'FA' : player.team} </TeamAbbr>
        <span className='player-name'>{player.displayName}</span>
        <span style={{ textAlign: 'right' }}>{player.overallRank}</span>
        {!props.isOpen ?
          <span style={{ textAlign: 'right' }}> {Math.round(player.nerdRank * 10) / 10}</span>
          : null}
        {!props.isOpen ?
          <span style={{ textAlign: 'right' }}>{player.byeWeek}</span>
          : null}
      </div>
    </PlayerSelector>
  )
  )
  return (
    <div className='playersDiv'>
      {props.loading ?
        <SkeletonTheme color="#a9bfde" highlightColor="#c8d1de" >
          <Skeleton count={30} height={50} />
        </SkeletonTheme>
        : playerNames}
    </div>
  )
}
