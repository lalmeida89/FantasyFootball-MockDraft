
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
export const draftPageSubmit = (values) => {
  let myTeam = [];
  let teams = [];
  for (let i=0; i<(values.numberOfTeams-1); i++){
    teams[i] = []
  }
  teams.splice(values.draftOrder-1, 0, myTeam);
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


export const INCREASING = 'INCREASING';
export const DECREASING = 'DECREASING';
export const ADD_TO_TEAM = 'ADD_TO_TEAM';
export const addPlayerToTeam = (counter) => (dispatch, getState) => {
  let playersDrafted = getState().draftPreferencesReducer.playersUsed
  let myTeam = getState().draftPreferencesReducer.draftPos - 1
  let player = getState().playersReducer.players
  let allTeams = getState().draftPreferencesReducer.teams
  let count = getState().counterReducer.counter
  let dir = getState().counterReducer.currentDirection
  let turns = getState().counterReducer.turns
  console.log(player, getState().draftPreferencesReducer.draftPos)
  player.sort(sort_by('rank', true, parseInt))
  for (let i = counter; i >= 0; i+= dir) {
    if (i === myTeam && dir === 1){
        counter = myTeam+1;
        console.log(allTeams, 'butt', count)
        return
      }
      if (i === myTeam && dir === -1){
        counter = myTeam-1
        console.log(allTeams, 'butt', count)
        return
      }

    setTimeout(function(x) { return function() {
        playersDrafted.push(player[x])
        console.log(x, 'butt', count, allTeams.length-1)
          return dispatch ({
            type: ADD_TO_TEAM,
            player: player[x],
            team: x,
            playersUsed: playersDrafted,
            count: i
          })
      }; }(i), 200*i);
  }
}

export const ADD_TO_MY_TEAM = 'ADD_TO_MY_TEAM'
export const addPlayerToMyTeam = (player, team) => (dispatch, getState) => {
  let myTeam = getState().draftPreferencesReducer.draftPos
  let playersDrafted = getState().draftPreferencesReducer.playersUsed
  let allTeams = getState().draftPreferencesReducer.teams
  let count = getState().counterReducer.counter
  let dir = getState().counterReducer.currentDirection
  allTeams[myTeam-1].push(player)
  playersDrafted.push(player)
  if (dir === 1){
    return dispatch ({
      type: ADD_TO_MY_TEAM,
      player,
      playersUsed: playersDrafted,
      count: count + dir
    })
    console.log('going up', count)
  }
  if (dir === -1){

    return dispatch ({
      type: ADD_TO_MY_TEAM,
      player,
      playersUsed: playersDrafted,
      count : count + dir
    })
  }

  console.log('going down', count)
  dispatch(addPlayerToTeam(count));
}












/*  if (i === myTeam && dir === 1){
    count = myTeam+1;
    console.log(allTeams, 'butt', count)
    return
  }
  if (i === myTeam && dir === -1){
    count = myTeam-1
    console.log(allTeams, 'butt', count)
    return
  }
  if (i === allTeams.length-1){
    return dispatch ({
      type: DECREASING,
      dir: -1,
      count: allTeams.length -1
    })
  }*/
