
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
export const draftPageSubmit = (values, myTeam) => {
  let teams = [];
  for (let i=0; i<(values.numberOfTeams-1); i++){
    teams[i] = []
  }
  teams.splice(values.draftOrder, 0, myTeam);
  return {
    type: DRAFT_PAGE_SUBMIT,
    values,
    teamArrays: teams
  }
}

const sort_by = (field, reverse, primer) => {
  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a < b) - (b < a));
    }
}

export const ADD_TO_TEAM = 'ADD_TO_TEAM';
export const addPlayerToTeam = (j) => (dispatch, getState) => {
  let playersDrafted = getState().draftPreferencesReducer.playersUsed
  let myTeam = getState().draftPreferencesReducer.draftPos
  let player = getState().playersReducer.players
  let allTeams = getState().draftPreferencesReducer.teams
  console.log(player, getState().draftPreferencesReducer.draftPos)
  player.sort(sort_by('rank', true, parseInt))
  if (j){ j = myTeam }
  else {j = 0}
  console.log(j, 'plum')
  for (let i = j, di=1; i >= 0; i+= di) {
    if (i === myTeam-1 && di === 1){
      j= myTeam;
      console.log(allTeams)
      return
    }
    if (i === myTeam-1 && di === -1){
      j=myTeam-2
      console.log(allTeams)
      return
    }
    if (i >= allTeams.length){ di = -1 }
      setTimeout(function(x) { return function() {
        playersDrafted.push(player[x])
        console.log(x, getState(), player[x]);
        return dispatch ({
          type: ADD_TO_TEAM,
          player: player[x],
          team: x,
          playersUsed: playersDrafted
        })
      }; }(i), 1000*i);
  }
}

export const ADD_TO_MY_TEAM = 'ADD_TO_MY_TEAM'
export const addPlayerToMyTeam = (player, team) => (dispatch, getState) => {
  console.log(player, team, getState())
  let myTeam = getState().draftPreferencesReducer.draftPos
  let playersDrafted = getState().draftPreferencesReducer.playersUsed
  let allTeams = getState().draftPreferencesReducer.teams
  allTeams[myTeam-1].push(player)
  playersDrafted.push(player)
  return dispatch ({
    type: ADD_TO_MY_TEAM,
    player,
    playersUsed: playersDrafted
  })
}
