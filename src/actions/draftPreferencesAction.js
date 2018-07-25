import {showCurrentTeam} from './showActions'

export const ADD_TO_MY_TEAM = 'ADD_TO_MY_TEAM'
export const DRAFT_PAGE_SUBMIT = 'DRAFT_PAGE_SUBMIT';
export const TEAM_COUNT_CHANGE = 'TEAM_COUNT_CHANGE';
export const INCREASING = 'INCREASING';
export const DECREASING = 'DECREASING';
export const ADD_TO_TEAM = 'ADD_TO_TEAM';


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
export const draftPageSubmit = (values) => (dispatch, getState) => {
  let myTeam = [];
  let teams = [];
  for (let i=0; i<(values.numberOfTeams-1); i++){
    teams[i] = []
  }
  teams.splice(values.draftOrder-1, 0, myTeam);
  dispatch({
    type: DRAFT_PAGE_SUBMIT,
    values,
    teamArrays: teams
  })
  dispatch(showCurrentTeam(myTeam, values.draftOrder))
  if (values.draftOrder !== 1){
    return dispatch(addPlayerToTeamUp(0, 1))
  }
}

//QuickSort method
const sort_by = (field, reverse, primer) => {
  var key = primer ?
  function(x) {return primer(x[field])} :
  function(x) {return x[field]};

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a < b) - (b < a));
  }
}

//loop through team arrays and push the best player Available to each team, stop when it reaches
//the user's array. adding to the counter by one for each time to keep track of whose
//pick it is.
export const addPlayerToTeamUp = (counter, direction) => (dispatch, getState) => {
  console.log('beggining of going up')
  const state = getState()
  let playersDrafted = state.draftPreferencesReducer.playersUsed
  let myTeam = state.draftPreferencesReducer.draftPos - 1
  let player = state.playersReducer.players
  let allTeams = state.draftPreferencesReducer.teams
  player.sort(sort_by('rank', true, parseInt))
  for (let i = counter; i < allTeams.length; i+= direction) {
      setTimeout(function(x) { return function() {
        playersDrafted.push(player[x])
        if (getState().counterReducer.counter === myTeam){
          return
        }
        //if we reach the end of the arrays and the users team is not picking last, add player
        //change direction to go down and dispatch the other action which loops in reverse order
        if (getState().counterReducer.counter === allTeams.length-1 && myTeam !== allTeams.length-1){
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
        //otherwise just add player to team and add to counter
        else {
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

//pretty much the same as the action above, but dispatches when the above loop reaches the end
//then this dispatches the action above once it reaches the end
export const addPlayerToTeamDown = (counter, direction) => (dispatch, getState) => {
  const state = getState()
  let playersDrafted = state.draftPreferencesReducer.playersUsed
  let myTeam = state.draftPreferencesReducer.draftPos - 1
  let player = state.playersReducer.players
  let allTeams = state.draftPreferencesReducer.teams
  player.sort(sort_by('rank', true, parseInt))
  for (let i = counter; i>=0; i += direction) {
    setTimeout(function(x) { return function() {
      playersDrafted.push(player[x*-1])
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

//this action runs when the player clicks to draft a player.
export const addPlayerToMyTeam = (player) => (dispatch, getState) => {
  let myTeam = getState().draftPreferencesReducer.draftPos -1
  let playersDrafted = getState().draftPreferencesReducer.playersUsed
  let allTeams = getState().draftPreferencesReducer.teams
  allTeams[myTeam].push(player)
  playersDrafted.push(player)
  if (myTeam === 0) {
    //if the user is picking first and the direction is coming down, meaning its looping down,
    //we add the player to the team and then it is the user's pick again to begin the next round.
    //it also dispatches increasing which simply sets the direction to 1 instead of -1
    if (getState().counterReducer.currentDirection === -1){
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player,
        playersUsed: playersDrafted,
        counter: 0
      })
      return dispatch(increasing())
    }
    else {
      //if the direction isnt negative, we just add the player and dispatch addPlayerToTeamUp starting
      //at the next player
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
    //if we're picking last, we pretty much do the same as above, letting the user pick again
    //to start the next round and reverse the direction.
    if (getState().counterReducer.currentDirection === 1){
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player,
        playersUsed: playersDrafted,
        counter: allTeams.length-1
      })
      return dispatch(decreasing())
    }
    else {
      //similar to above, except if it's coming down we dispatch addPlayerToTeamDown with the
      //index of the team before it
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player,
        playersUsed: playersDrafted,
        counter: myTeam-1
      })
      return dispatch(addPlayerToTeamDown(myTeam-1, -1))
    }
  }
  //if we're not picking first or last then we just add the player to our team and move
  //on to the next team based on the direction we're going
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
