import React from 'react';

export const ProjectedStats = props => {
  console.log(props);
  const {projectedPlayerStats, player} = props;
  switch(player.position){
    case 'QB':
      return (
        <div>
          <p> Attempts: {projectedPlayerStats.attempts} </p>
          <p> Completions: {projectedPlayerStats.completions} </p>
          <p> Fantasy Points: {projectedPlayerStats.fantasyPoints} </p>
          <p> Interceptions: {projectedPlayerStats.passingInt} </p>
          <p> Passing Yards: {projectedPlayerStats.passingYards} </p>
          <p> Passing TDs: {projectedPlayerStats.passingTD} </p>
          <p> Rushing TDs: {projectedPlayerStats.rushTD} </p>
          <p> Rushing Yards: {projectedPlayerStats.rushYards} </p>
        </div>
      )
    case 'RB' :
      return (
        <div> this is a rb </div>
      )
    case 'WR' :
      return (
        <div> this is a wr </div>
      )
    case 'TE' :
      return (
        <div> this is a te </div>
      )
    case 'K' :
      return (
        <div> this a kicker </div>
      )
    case 'DEF':
      return (
        <div> this a defense </div>
      )
    default:
      return (
        <div> this is a nobody </div>
      )
  }
}

/*

QB stats -
attempts: "640"
completions: "422"
displayName: "Drew Brees"
fantasyPoints: "335"
passingInt: "17"
passingTD: "40"
passingYards: "4992"
playerId: "14"
rushTD: "1"
rushYards: "28"

WR stats -
fantasyPoints: "212"
fumbles: "0"
playerId: "454"
rec: "98"
recTD: "11"
recYards: "1461"
rushAtt: "0"
rushTD: "0"
rushYards: "0"

RB stats -
fantasyPoints: "273"
fumbles: "2"
playerId: "259"
rec: "39"
recTD: "1"
recYards: "318"
rushAtt: "342"
rushTD:
rushYards:

TE stats -
fantasyPoints: "172"
fumbles: "0"
playerId: "1187"
rec: "91"
recTD: "10"
recYards: "1122"
rushAtt: "0"
rushTD: "0"
rushYards: "0"

DEF stats -
fantasyPoints: "135"
fumbleRec: "14"
interceptions: "19"
playerId: "1056"
sacks: "39"
specialTeamTD: "1"

K stats -
fantasyPoints: "126"
fg: "25"
playerId: "752"
team: "NE"
xp: "51"
*/
