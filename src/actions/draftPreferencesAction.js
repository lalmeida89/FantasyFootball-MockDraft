export const TEAM_COUNT_CHANGE = 'TEAM_COUNT_CHANGE';
export const teamCountChange = teamCount => {
  return {
    type: TEAM_COUNT_CHANGE,
    teamCount
  }
}


export const DRAFT_PAGE_SUBMIT = 'DRAFT_PAGE_SUBMIT';
export const draftPageSubmit = (
  teamCount, draftPos, numberOfQBs, numberOfRBs,
  numberOfWRs, numberOfTEs, numberOfWRsRBs, numberOfWRsTEs,
  numberOfRBsTEs, numberOfRBsWRsTEs, numberOfQBsWRsRBsTEs,
  numberOfDST, numberOfKickers, benchCount, myTeam) => {
  let teams = [];
  for (let i=0; i<(teamCount-1); i++){
    teams[i] = new Array('team' + i);
  }
  teams.splice(draftPos, 0, myTeam);
  console.log(teams)
  return {
    type: DRAFT_PAGE_SUBMIT,
    teamCount,
    draftPos,
    numberOfQBs,
    numberOfRBs,
    numberOfWRs,
    numberOfTEs,
    numberOfWRsRBs,
    numberOfWRsTEs,
    numberOfRBsTEs,
    numberOfRBsWRsTEs,
    numberOfQBsWRsRBsTEs,
    numberOfDST,
    numberOfKickers,
    benchCount,
    teamArrays: teams
  }
}
