import {showCurrentTeam} from './showActions';
//import {pickRandomPlayer} from './algorithm';

export const ADD_TO_MY_TEAM = 'ADD_TO_MY_TEAM';
export const DRAFT_PAGE_SUBMIT = 'DRAFT_PAGE_SUBMIT';
export const TEAM_COUNT_CHANGE = 'TEAM_COUNT_CHANGE';
export const INCREASING = 'INCREASING';
export const DECREASING = 'DECREASING';
export const ADD_TO_TEAM = 'ADD_TO_TEAM';
export const INCREASE_TURNS = 'INCREASE_TURNS';
export const RENDER_FINAL_PAGE = 'RENDER_FINAL_PAGE';
export const LOADING_SCREEN = 'LOADING_SCREEN'

//sets the values of the form into the state to be stored. We create objects with empty arrays
//to represent the other teams. teamCount - 1 is to leave room for the User's team which we
//then insert based on draft position (see splice method). And then, after a 2 second delay,
//if the user is not picking first, the drafting begins right away.
export const draftPageSubmit = (values) => (dispatch, getState) => {
  let teams = [];
  for (let i=0; i<values.numberOfTeams; i++){
    teams[i] = []
  };
  let flexCount = parseInt(values.wrRbFlexCount, 10) +
    parseInt(values.wrTeFlexCount, 10) +
    parseInt(values.rbTeFlexCount, 10) +
    parseInt(values.wrRbTeFlexCount, 10) +
    parseInt(values.qbWrRbTeFlexCount, 10);
  let startersCount = parseInt(values.wrCount, 10) +
    parseInt(values.dstCount, 10) +
    parseInt(values.kCount, 10) + parseInt(values.rbCount, 10) +
    parseInt(values.qbCount, 10) + parseInt(values.teCount, 10);
  let maxRounds = flexCount + startersCount + parseInt(values.benchCount, 10);
  dispatch({
    type: DRAFT_PAGE_SUBMIT,
    values,
    teamArrays: teams,
    flexPlayers: flexCount,
    maxTurns: maxRounds
  });
  dispatch(showCurrentTeam(teams[values.draftOrder-1], values.draftOrder))
  if (values.draftOrder > 1){
      dispatch(cycleThroughTeams());
  }
}

const addPlayerToTeam = (currentPick, direction) => (dispatch, getState) => {
  const allTeams = getState().draftPreferencesReducer.teams.length;
  let availablePlayers = getState().playersReducer.players.sort(sort_by('overallRank', true, parseInt));
  let playersUsed = getState().draftPreferencesReducer.playersUsed;
  let currentPlayer = pickRandomPlayer(availablePlayers.slice(0, 5));
  let pickedAt = {
    pickedAt: direction > 0 ? currentPick+1 : allTeams-currentPick,
    round: getState().counterReducer.turns,
    teamDraftedBy: currentPick+1
  }
  currentPlayer = {...currentPlayer, ...pickedAt};
    playersUsed.push(currentPlayer);
    dispatch({
      type: ADD_TO_TEAM,
      player: currentPlayer,
      team: currentPick,
      playersUsed: playersUsed,
      counter: currentPick+direction
    })
}

const cycleThroughTeams = () => (dispatch, getState) => {
  let currentPick = getState().counterReducer.counter;
  const maxTurns = getState().draftPreferencesReducer.maxTurns
  const allTeams = getState().draftPreferencesReducer.teams;
  const myTeamPick = getState().draftPreferencesReducer.draftPos-1;
  while (currentPick !== myTeamPick) {
    if (getState().counterReducer.turns > maxTurns) {
      dispatch(renderFinalPage);
      break;
    }
    if (getState().counterReducer.currentDirection > 0){
      if (currentPick !== allTeams.length-1) {
        dispatch(addPlayerToTeam(currentPick, 1));
        currentPick++
      }
      else if (currentPick === allTeams.length-1){
        dispatch(addPlayerToTeam(currentPick, 1))
        dispatch(increaseTurns())
        dispatch(decreasing());
      }
    }
    else if (getState().counterReducer.currentDirection < 0) {
      if (currentPick !== 0) {
        dispatch(addPlayerToTeam(currentPick, -1))
        currentPick--
      }
      else if (currentPick === 0){
        dispatch(addPlayerToTeam(currentPick, -1))
        dispatch(increaseTurns())
        dispatch(increasing());
      }
    }
  }
}

const pickRandomPlayer = top5availablePlayers => {
  let randomPlayer = top5availablePlayers[Math.floor(Math.random() * 5)];
  return randomPlayer
}


//this action runs when the player clicks to draft a player.
export const addPlayerToMyTeam = (player) => (dispatch, getState) => {
  const myTeam = getState().draftPreferencesReducer.draftPos -1
  const allTeams = getState().draftPreferencesReducer.teams
  const maxTurns = getState().draftPreferencesReducer.maxTurns
  let playersDrafted = getState().draftPreferencesReducer.playersUsed
  if (getState().counterReducer.turns <= maxTurns){
  let pickedAt = {
      pickedAt: getState().counterReducer.turns%2===0
        ? allTeams.length-getState().counterReducer.counter
        : getState().counterReducer.counter+1 ,
      round: getState().counterReducer.turns,
      teamDraftedBy: getState().counterReducer.counter+1
    }
    let currentPlayer = player
    currentPlayer = {...currentPlayer, ...pickedAt};
    allTeams[myTeam].push(currentPlayer)
    playersDrafted.push(currentPlayer)
    if (myTeam === 0) {
    //if the user is picking first and the direction is coming down, meaning its looping down,
    //we add the player to the team and then it is the user's pick again to begin the next round.
    //it also dispatches increasing which simply sets the direction to 1 instead of -1
      if (getState().counterReducer.currentDirection === -1){
        dispatch ({
          type: ADD_TO_MY_TEAM,
          player: currentPlayer,
          playersUsed: playersDrafted,
          counter: 0
        })
        dispatch(increaseTurns());
        dispatch(increasing());
        return dispatch(cycleThroughTeams());
      }
      else {
        //if the direction isnt negative, we just add the player and dispatch addPlayerToTeamUp starting
        //at the next player
        dispatch ({
          type: ADD_TO_MY_TEAM,
          player: currentPlayer,
          playersUsed: playersDrafted,
          counter: myTeam + 1
        })
        return dispatch(cycleThroughTeams());
      }
  }
  if (myTeam === allTeams.length -1){
    //if we're picking last, we pretty much do the same as above, letting the user pick again
    //to start the next round and reverse the direction.
    if (getState().counterReducer.currentDirection === 1){
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player: currentPlayer,
        playersUsed: playersDrafted,
        counter: allTeams.length-1
      })
      dispatch(decreasing());
      return dispatch(cycleThroughTeams());
    }
    else {
      //similar to above, except if it's coming down we dispatch addPlayerToTeamDown with the
      //index of the team before it
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player: currentPlayer,
        playersUsed: playersDrafted,
        counter: myTeam-1
      })
      return dispatch(cycleThroughTeams())
    }
  }
  //if we're not picking first or last then we just add the player to our team and move
  //on to the next team based on the direction we're going
  else if (myTeam !== 0 && myTeam !== allTeams.length-1){
    if (getState().counterReducer.currentDirection === 1){
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player: currentPlayer,
        playersUsed: playersDrafted,
        counter: myTeam + 1
      })
      return dispatch(cycleThroughTeams())
    }
    if (getState().counterReducer.currentDirection === -1){
      dispatch ({
        type: ADD_TO_MY_TEAM,
        player: currentPlayer,
        playersUsed: playersDrafted,
        counter : myTeam-1
      })
      return dispatch(cycleThroughTeams())
    }
  }}
  else {
    dispatch(renderFinalPage())
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
//the teamCount happens onChange. Users selecting their draft position will only be able
//to choose up to the teamCount value
export const teamCountChange = teamCount => {
  return {
    type: TEAM_COUNT_CHANGE,
    teamCount
  }
}
const renderLoadingScreen = () => {
  return {
    type: LOADING_SCREEN
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
export const increaseTurns = () => {
  return {
    type: INCREASE_TURNS
  }
}
export const renderFinalPage = () => {
  return {
    type: RENDER_FINAL_PAGE
  }
}















//loop through team arrays and push the best player Available to each team, stop when it reaches
//the user's array. adding to the counter by one for each time to keep track of whose
//pick it is.
/*export const addPlayerToTeamUp = (counter, direction) => (dispatch, getState) => {
  let state = getState();
  let playersDrafted = state.draftPreferencesReducer.playersUsed
  let myTeam = state.draftPreferencesReducer.draftPos - 1
  let player = state.playersReducer.players
  let allTeams = state.draftPreferencesReducer.teams
  let maxTurns = state.draftPreferencesReducer.maxTurns
  player.sort(sort_by('overallRank', true, parseInt))
  if (getState().counterReducer.turns <= maxTurns){
    for (let i = counter; i < allTeams.length; i+= direction) {
      setTimeout(function(x) { return function() {
        let pickedAt = {
          pickedAt: getState().counterReducer.counter+1,
          round: getState().counterReducer.turns,
          teamDraftedBy: getState().counterReducer.counter+1
        }
        let best5 = player.slice(x, x+5);
        let currentPlayer = pickRandomPlayer(best5, playersDrafted)
        let name = {name: currentPlayer.firstName + ' ' + currentPlayer.lastName}
        currentPlayer = {...currentPlayer, ...pickedAt, ...name};
        playersDrafted.push(currentPlayer);
        if (getState().counterReducer.counter === myTeam){
          return
        }
        //if we reach the end of the arrays and the users team is not picking last, add player
        //change direction to go down and dispatch the other action which loops in reverse order
        if (getState().counterReducer.counter === allTeams.length-1 && myTeam !== allTeams.length-1){
          dispatch ({
            type: ADD_TO_TEAM,
            player: currentPlayer,
            team: getState().counterReducer.counter,
            playersUsed: playersDrafted,
            counter: getState().counterReducer.counter
          })
          dispatch(increaseTurns())
          dispatch(decreasing())
          return dispatch(addPlayerToTeamDown(allTeams.length-1, -1))
        }
        //otherwise just add player to team and add to counter
        else {
          return dispatch ({
            type: ADD_TO_TEAM,
            player: currentPlayer,
            team: getState().counterReducer.counter,
            playersUsed: playersDrafted,
            counter: getState().counterReducer.counter + 1
          })
        }
      };
      }(i-getState().counterReducer.counter), 200*(i-getState().counterReducer.counter));
    }
  }
  else{
    dispatch(renderFinalPage())
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
  let maxTurns = state.draftPreferencesReducer.maxTurns
  player.sort(sort_by('overallRank', true, parseInt))
  if (getState().counterReducer.turns <= maxTurns){

    for (let i = counter; i>=0; i += direction) {
    setTimeout(function(x) { return function() {
      let pickedAt = {
        pickedAt:allTeams.length-getState().counterReducer.counter,
        round:getState().counterReducer.turns,
        teamDraftedBy: getState().counterReducer.counter+1
      }
      let currentPlayer = player[x*-1]
      //pickRandomPlayer(player.slice(Math.abs(x), Math.abs(x)+5))
      console.log(player.slice(x*-1, (x*-1)+5));
      let name = {name: currentPlayer.firstName + ' ' + currentPlayer.lastName}
      currentPlayer = {...currentPlayer, ...pickedAt, ...name};
      playersDrafted.push(currentPlayer)
      if (getState().counterReducer.counter === myTeam){
        return
      }
      if (getState().counterReducer.counter === 0 && myTeam !== 0){
        dispatch ({
          type: ADD_TO_TEAM,
          player: currentPlayer,
          team: getState().counterReducer.counter,
          playersUsed: playersDrafted,
          counter: getState().counterReducer.counter
        })
        dispatch(increaseTurns())
        dispatch(increasing())
        return dispatch(addPlayerToTeamUp(0, 1))
      }
      else {
        dispatch ({
          type: ADD_TO_TEAM,
          player: currentPlayer,
          team: getState().counterReducer.counter,
          playersUsed: playersDrafted,
          counter: getState().counterReducer.counter -1
        })
      }
    }; }(i-counter), 200*(i-counter));
  }}
  else{
    dispatch(renderFinalPage())
  }
}
*/
