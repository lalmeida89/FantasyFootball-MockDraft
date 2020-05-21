export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';
export const GET_PLAYER_PROFILE_REQUEST = 'GET_PLAYER_PROFILE_REQUEST';
export const GET_PLAYER_PROFILE_SUCCESS = 'GET_PLAYER_PROFILE_SUCCESS';
export const SET_PLAYER_PROFILE = 'SET_PLAYER_PROFILE';
export const HIDE_PLAYER_PROFILE ='HIDE_PLAYER_PROFILE';
export const SET_CURRENT_PLAYER_SCHEDULE = 'SET_CURRENT_PLAYER_SCHEDULE';
export const SET_CURRENT_PLAYER_DEPTH_CHART = 'SET_CURRENT_PLAYER_DEPTH_CHART';
export const SET_CURRENT_PLAYER_PROJECTIONS = 'SET_CURRENT_PLAYER_PROJECTIONS'


/* To get full detailed information about a player we need to run a second fetch using their ID from the
initial fetch. The response will be an array of just one player so we dispatch our setPlayerProfile action
on the first player in the array. We can then use all of the information to create a profile of that player*/

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const getPlayerProfile = player =>  {
  return dispatch => {
    dispatch(setCurrentPlayer(player))
    dispatch(getPlayerProfileSuccess())
    dispatch(getTeamDepthChart(player.team))
    dispatch(getPlayerSchedule(player.team))
    dispatch(getPlayerProjectStats(player))
  }
}

const getTeamDepthChart = team => {
    const url = `https://www.fantasyfootballnerd.com/service/depth-charts/json/test`;
    return dispatch => {
      fetch(proxyurl + url)
        .then(res => res.json())
        .then(response => {
          console.log(response.DepthCharts[team]);
          dispatch(setCurrentPlayerDepthChart(response.DepthCharts[team]))
        });
    }
}

const getPlayerSchedule = team => {
    const url = `https://www.fantasyfootballnerd.com/service/schedule/json/test/`;
    return dispatch => {
      fetch(proxyurl + url)
        .then(res => res.json())
        .then(response => {
            let playerSchedule = filterByValue(response.Schedule, team);
            console.log(playerSchedule);
            dispatch(setCurrentPlayerSchedule(playerSchedule))
        });
    }
}

const getPlayerProjectStats = player => {
    let pos = player.position;
    const url = `https://www.fantasyfootballnerd.com/service/draft-projections/json/test/${pos}/`;
    return dispatch => {
      fetch(proxyurl + url)
        .then(res => res.json())
        .then(response => {
          let projectedPlayerStats = filterByValue(response.DraftProjections, player.playerId)
          dispatch(setCurrentPlayerProjections(projectedPlayerStats[0]))
        });
    }
}


//helper function to filter the Schedule array we get from the response to
//only include part of the responses our current player is involved in
const filterByValue = (arr, value) => {
  return arr.filter(o => (
    Object.keys(o).some(k => o[k].includes(value))
  ))
}

export const hidePlayerProfile = () => ({
  type: HIDE_PLAYER_PROFILE
})

export const setCurrentPlayerProjections = projectedPlayerStats => ({
  type: SET_CURRENT_PLAYER_PROJECTIONS,
  projectedPlayerStats
})

export const setCurrentPlayerSchedule = schedule => ({
  type: SET_CURRENT_PLAYER_SCHEDULE,
  schedule
})

export const getPlayerProfileRequest = loading => ({
  type: GET_PLAYER_PROFILE_REQUEST,
  loading
})

export const getPlayerProfileSuccess = profile => ({
  type: GET_PLAYER_PROFILE_SUCCESS,
  profile
})

export const setCurrentPlayer = player => ({
  type: SET_CURRENT_PLAYER,
  player
})

export const setCurrentPlayerDepthChart = depthChart => ({
  type: SET_CURRENT_PLAYER_DEPTH_CHART,
  depthChart
})
