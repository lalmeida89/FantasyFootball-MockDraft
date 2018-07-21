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
          counter = myTeam+1;
          console.log(allTeams, 'butt')
          return
        }
        if (getState().counterReducer.counter === allTeams.length-1){
          dispatch({
            type: DECREASING
          })
          dispatch ({
            type: ADD_TO_TEAM,
            player: player[x],
            team: getState().counterReducer.counter,
            playersUsed: playersDrafted,
            counter: getState().counterReducer.counter
          })
          dispatch(addPlayerToTeamDown(allTeams.length-1, -1))
        }
        else {
        dispatch ({
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
  for (let i = counter; i >= 0 && i<=allTeams.length; i += direction) {
    setTimeout(function(x) { return function() {
      playersDrafted.push(player[x*-1])
      console.log(player[x*-1], playersDrafted, myTeam, counter, getState().counterReducer.counter)
      if (getState().counterReducer.counter === myTeam){
        counter = myTeam-1;
        console.log(allTeams, 'butt')
        return
      }
      if (getState().counterReducer.counter === 0){
        console.log(player[getState().counterReducer.counter])
        dispatch({
          type: INCREASING
        })
        dispatch ({
          type: ADD_TO_TEAM,
          player: player[x*-1],
          team: getState().counterReducer.counter,
          playersUsed: playersDrafted,
          counter: getState().counterReducer.counter
        })
        dispatch(addPlayerToTeamUp(0, 1))
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
  }; }(i-counter), 1000*(i-counter));
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
  if (getState().counterReducer.currentDirection === 1){
    console.log(dir, 'plum', getState().counterReducer.counter)
    dispatch ({
      type: ADD_TO_MY_TEAM,
      player,
      playersUsed: playersDrafted,
      count: myTeam + 1
    })
    console.log('going up', count, getState().counterReducer.counter)
  }
  if (getState().counterReducer.currentDirection === -1){
    dispatch ({
      type: ADD_TO_MY_TEAM,
      player,
      playersUsed: playersDrafted,
      count : myTeam-1
    })
  }
}

export const choosingMyPlayer =  (player, direction) => (dispatch, getState) => {
  let allTeams = getState().draftPreferencesReducer.teams
  if (getState().counterReducer.currentDirection === 1){
    dispatch(addPlayerToMyTeam(player))
    console.log('shoot')
    dispatch(addPlayerToTeamUp(getState().counterReducer.counter, getState().counterReducer.currentDirection))
  }
  else if (getState().counterReducer.currentDirection === -1){
    dispatch(addPlayerToMyTeam(player))
    console.log('shoot')
    dispatch(addPlayerToTeamDown(getState().counterReducer.counter, getState().counterReducer.currentDirection))
  }
}


/*
export const addPlayerToTeam = (counter, direction) => (dispatch, getState) => {
  let playersDrafted = getState().draftPreferencesReducer.playersUsed
  let myTeam = getState().draftPreferencesReducer.draftPos - 1
  let player = getState().playersReducer.players
  let allTeams = getState().draftPreferencesReducer.teams
  let count = getState().counterReducer.counter
  let dir = getState().counterReducer.currentDirection
  let turns = getState().counterReducer.turns
  console.log(player, getState().draftPreferencesReducer.draftPos)
  player.sort(sort_by('rank', true, parseInt))
  //if (turns <= 3){
    //if (dir == 1) {
    for (let j = 1; j < 4; j++){
      for (let i = counter; i < allTeams.length; i+= 1) {
        if (i === myTeam){
          console.log(j)
          if(j % 2 !== 0){
          counter = myTeam+1;
          console.log(allTeams, 'butt', count)
          return
          }
          else {
            console.log('else statement')
            counter = allTeams.length - myTeam+1
            console.log(counter)
            return
          }
        }
        setTimeout(function(x) { return function() {
          playersDrafted.push(player[i])
          dispatch ({
            type: ADD_TO_TEAM,
            player: player[i],
            team: i,
            playersUsed: playersDrafted,
            count: i
          })
        }; }(i-count), 200*(i-count));
        }
        counter = 0
        dispatch({
          type: REVERSE_TEAMS
        })
      }
    }



      /*if (i >= allTeams.length -1 ){
        console.log(i, 'see if this works +', allTeams.length-1, 'DECREASING')
        return dispatch({
          type: DECREASING,
          direction: -1
        })
      */
    //}
    /*if (dir == -1) {
      for (let i = counter; i >= 0 ; i += direction) {
        console.log(counter)
        if (i === myTeam){
          counter = myTeam-1;
          console.log(allTeams, 'butt', count)
          return
        }
        setTimeout(function(x) { return function() {
          playersDrafted.push(player[i-count])
          return dispatch ({
            type: ADD_TO_TEAM,
            player: player[i-count],
            team: i,
            playersUsed: playersDrafted,
            count: i
          })
        }; }(i-count), 200*(i-count));
        if (i == 0){
          console.log('see if this works + INCREASING')
          return dispatch({
            type: INCREASING,
            direction: 1
          })
        }
      }
    }
  /*/











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
