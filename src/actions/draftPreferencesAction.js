//the teamCount happens onChange. Users selecting their draft position will only be able
//to choose up to the teamCount value

export const TEAM_COUNT_CHANGE = 'TEAM_COUNT_CHANGE';
export const teamCountChange = teamCount => {
  return {
    type: TEAM_COUNT_CHANGE,
    teamCount
  }
}

//sets the values of the form into the state to be stored. We create objects with empty arrays
//to represent the other teams. teamCount - 1 is to leave room for the User's team which we
//then insert based on draft position (see splice method).
export const DRAFT_PAGE_SUBMIT = 'DRAFT_PAGE_SUBMIT';
export const draftPageSubmit = (
  teamCount, draftPos, numberOfQBs, numberOfRBs,
  numberOfWRs, numberOfTEs, numberOfWRsRBs, numberOfWRsTEs,
  numberOfRBsTEs, numberOfRBsWRsTEs, numberOfQBsWRsRBsTEs,
  numberOfDST, numberOfKickers, benchCount, myTeam) => {
  let teams = [];
  for (let i=0; i<(teamCount-1); i++){
    teams[i] = {'cpu team' :[]};
  }
  console.log('dill', myTeam)
  teams.splice(draftPos, 0, myTeam);
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
