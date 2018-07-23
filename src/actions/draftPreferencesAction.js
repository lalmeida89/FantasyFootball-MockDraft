export const ADD_TO_MY_TEAM = 'ADD_TO_MY_TEAM'
export const DRAFT_PAGE_SUBMIT = 'DRAFT_PAGE_SUBMIT';
export const TEAM_COUNT_CHANGE = 'TEAM_COUNT_CHANGE';
export const INCREASING = 'INCREASING';
export const DECREASING = 'DECREASING';
export const ADD_TO_TEAM = 'ADD_TO_TEAM';
export const REVERSE_TEAMS = 'REVERSE_TEAMS';

//the teamCount happens onChange. Users selecting their draft position will only be able
//to choose up to the teamCount value
export const teamCountChange = teamCount => {
  return {
    type: TEAM_COUNT_CHANGE,
    teamCount
  }
}

//sets the values of the form into the state to be stored. We create objects with empty arrays
//to represent the other teams. teamCount - 1 is to leave room for the User's team which we
//then insert based on draft position (see splice method).
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


export const addPlayerToTeamUp = (counter, direction) => (dispatch, getState) => {
  console.log('beggining of going up')
  const state = getState()
  let playersDrafted = state.draftPreferencesReducer.playersUsed
  let myTeam = state.draftPreferencesReducer.draftPos - 1
  let player = state.playersReducer.players
  let allTeams = state.draftPreferencesReducer.teams
  let count = state.counterReducer.counter
  //let dir = state.counterReducer.currentDirection
  //let turns = state.counterReducer.turns
  player.sort(sort_by('rank', true, parseInt))
  console.log(counter, direction)
  for (let i = counter; i < allTeams.length; i+= direction) {
      setTimeout(function(x) { return function() {
        playersDrafted.push(player[x])
        console.log('checking', getState().counterReducer.counter)
        if (getState().counterReducer.counter === myTeam){
          return
        }
        if (getState().counterReducer.counter === allTeams.length-1 && myTeam !== allTeams.length-1){
          console.log('how many times is this getting called?')
          dispatch ({
            type: ADD_TO_TEAM,
            player: player[x],
            team: getState().counterReducer.counter,
            playersUsed: playersDrafted,
            counter: getState().counterReducer.counter
          })
          dispatch(decreasing())
          return dispatch(addPlayerToTeamDown(allTeams.length-1, -1))
        }
        else {
          console.log('this counter is buggin', getState().counterReducer.counter)
        return dispatch ({
          type: ADD_TO_TEAM,
          player: player[x],
          team: getState().counterReducer.counter,
          playersUsed: playersDrafted,
          counter: getState().counterReducer.counter + 1
        })
      }
      };
    }(i-getState().counterReducer.counter), 200*(i-getState().counterReducer.counter));
  }
}

export const addPlayerToTeamDown = (counter, direction) => (dispatch, getState) => {
  console.log('beggining of going down')
  console.log(counter, direction)
  const state = getState()
  let playersDrafted = state.draftPreferencesReducer.playersUsed
  let myTeam = state.draftPreferencesReducer.draftPos - 1
  let player = state.playersReducer.players
  let allTeams = state.draftPreferencesReducer.teams
  let count = state.counterReducer.counter
  player.sort(sort_by('rank', true, parseInt))
  for (let i = counter; i>=0; i += direction) {
    setTimeout(function(x) { return function() {
      playersDrafted.push(player[x*-1])
      console.log(player[x*-1], playersDrafted, myTeam, counter, getState().counterReducer.counter)
      if (getState().counterReducer.counter === myTeam){
        return
      }
      if (getState().counterReducer.counter === 0 && myTeam !== 0){
        dispatch ({
          type: ADD_TO_TEAM,
          player: player[x*-1],
          team: getState().counterReducer.counter,
          playersUsed: playersDrafted,
          counter: getState().counterReducer.counter
        })
        dispatch(increasing())
        return dispatch(addPlayerToTeamUp(0, 1))
      }
      else {
      dispatch ({
        type: ADD_TO_TEAM,
        player: player[x*-1],
        team: getState().counterReducer.counter,
        playersUsed: playersDrafted,
        counter: getState().counterReducer.counter -1
      })
    }
  }; }(i-counter), 200*(i-counter));
  }
}

export const addPlayerToMyTeam = (player) => (dispatch, getState) => {
  let myTeam = getState().draftPreferencesReducer.draftPos -1
  let playersDrafted = getState().draftPreferencesReducer.playersUsed
  let allTeams = getState().draftPreferencesReducer.teams
  let count = getState().counterReducer.counter
  let dir = getState().counterReducer.currentDirection
  allTeams[myTeam].push(player)
  playersDrafted.push(player)
  if (myTeam === 0) {
    if (getState().counterReducer.currentDirection === -1){
      console.log('direction down')
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player,
        playersUsed: playersDrafted,
        counter: 0
      })
      return dispatch(increasing())
    }
    else {
      console.log('direction up')
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player,
        playersUsed: playersDrafted,
        counter: myTeam + 1
      })
      return dispatch(addPlayerToTeamUp(1, 1))
    }
  }
  if (myTeam === allTeams.length -1){
    if (getState().counterReducer.currentDirection === 1){
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player,
        playersUsed: playersDrafted,
        counter: allTeams.length-1
      })
      return dispatch(decreasing())
      console.log('now drecreasing')
    }
    else {
      console.log('lets see this bad boy')
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player,
        playersUsed: playersDrafted,
        counter: myTeam-1
      })
      return dispatch(addPlayerToTeamDown(myTeam-1, -1))
    }
  }
  else if (myTeam !== 0 && myTeam !== allTeams.length-1){
    if (getState().counterReducer.currentDirection === 1){
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player,
        playersUsed: playersDrafted,
        counter: myTeam + 1
      })
      dispatch(addPlayerToTeamUp(myTeam+1, 1))
    }
    if (getState().counterReducer.currentDirection === -1){
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player,
        playersUsed: playersDrafted,
        counter : myTeam-1
      })
      dispatch(addPlayerToTeamDown(myTeam-1, -1))
    }
  }
}

export const decreasing = () => {
  return {
    type: DECREASING
  }
}

export const increasing = () => {
  return {
    type: INCREASING
  }
}
