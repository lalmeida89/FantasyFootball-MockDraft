import React from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

export const ProjectedStats = props => {
  const {projectedPlayerStats, player} = props;
  if(!projectedPlayerStats.fantasyPoints){
    return (
      <SkeletonTheme color="#a9bfde" highlightColor="#c8d1de">
        <Skeleton count={7} height={30} duration={1.5}/>
      </SkeletonTheme>
    )
  } else {
    switch(player.position){
      case 'QB':
          return (
            <div>
              <p> Passing Attempts: {projectedPlayerStats.attempts} </p>
              <p> Passing Completions: {projectedPlayerStats.completions} </p>
              <p> Passing Yards: {projectedPlayerStats.passingYards} </p>
              <p> Passing TDs: {projectedPlayerStats.passingTD} </p>
              <p> Interceptions: {projectedPlayerStats.passingInt} </p>
              <p> Rushing Yards: {projectedPlayerStats.rushYards} </p>
              <p> Rushing TDs: {projectedPlayerStats.rushTD} </p>
              <p> Fantasy Points: {projectedPlayerStats.fantasyPoints} </p>
            </div>
        )
      case 'RB' :
        return (
          <div>
            <p> Rushing Attempts: {projectedPlayerStats.rushAtt} </p>
            <p> Rushing Yards : {projectedPlayerStats.rushYards} </p>
            <p> Ruhsing TDs : {projectedPlayerStats.rushTD} </p>
            <p> Receptions : {projectedPlayerStats.rec} </p>
            <p> Receiving Yards : {projectedPlayerStats.recYards} </p>
            <p> Receiving TDs : {projectedPlayerStats.recTD} </p>
            <p> Fumbles : {projectedPlayerStats.fumbles} </p>
            <p> Fantasy Points : {projectedPlayerStats.fantasyPoints} </p>
          </div>
        )
      case 'WR' :
        return (
          <div>
            <p> Receptions : {projectedPlayerStats.rec} </p>
            <p> Receiving Yards : {projectedPlayerStats.recYards} </p>
            <p> Receiving TDs : {projectedPlayerStats.recTD} </p>
            <p> Rushing Attempts: {projectedPlayerStats.rushAtt} </p>
            <p> Rushing Yards : {projectedPlayerStats.rushYards} </p>
            <p> Ruhsing TDs : {projectedPlayerStats.rushTD} </p>
            <p> Fumbles : {projectedPlayerStats.fumbles} </p>
            <p> Fantasy Points : {projectedPlayerStats.fantasyPoints} </p>
          </div>
        )
      case 'TE' :
        return (
          <div>
            <p> Receptions : {projectedPlayerStats.rec} </p>
            <p> Receiving Yards : {projectedPlayerStats.recYards} </p>
            <p> Receiving TDs : {projectedPlayerStats.recTD} </p>
            <p> Rushing Attempts: {projectedPlayerStats.rushAtt} </p>
            <p> Rushing Yards : {projectedPlayerStats.rushYards} </p>
            <p> Ruhsing TDs : {projectedPlayerStats.rushTD} </p>
            <p> Fumbles : {projectedPlayerStats.fumbles} </p>
            <p> Fantasy Points : {projectedPlayerStats.fantasyPoints} </p>
          </div>
        )
      case 'K' :
        return (
          <div>
            <p> Field Goals : {projectedPlayerStats.fg} </p>
            <p> Extra Points : {projectedPlayerStats.xp} </p>
            <p> Fantasy Points : {projectedPlayerStats.fantasyPoints} </p>
          </div>
        )
      case 'DEF':
        return (
          <div>
              <p> Fumbles Recovered : {projectedPlayerStats.fumbleRec} </p>
              <p> Interceptions : {projectedPlayerStats.interceptions} </p>
              <p> Sacks : {projectedPlayerStats.sacks} </p>
              <p> Special Teams TDs : {projectedPlayerStats.specialTeamTD} </p>
              <p> Fantasy Points : {projectedPlayerStats.fantasyPoints} </p>
          </div>
        )
      default:
        return (
          <div>
            <p> No Data available for the current player </p>
          </div>
        )
    }
  }
}
