export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';
export const SET_PLAYER_PROFILE = 'SET_PLAYER_PROFILE';
export const HIDE_PLAYER_PROFILE ='HIDE_PLAYER_PROFILE'

export const setCurrentPlayer = id => {
  return {
    type: SET_CURRENT_PLAYER,
    id
  };
}

export const setPlayerProfile = profile => {
  return {
    type: SET_PLAYER_PROFILE,
    profile
  };
}

/* To get full detailed information about a player we need to run a second fetch using their ID from the
initial fetch. The response will be an array of just one player so we dispatch our setPlayerProfile action
on the first player in the array. We can then use all of the information to create a profile of that player*/

export function getPlayerProfile(id) {
  return dispatch => {
    dispatch(getPlayerProfileRequest())
    let idUrl = dispatch(setCurrentPlayer(id))
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `http://api.fantasy.nfl.com/v1/players/details?playerId=${idUrl.id}&statType=seasonStatsformat=json`;
    fetch(proxyurl + url)
      .then(res => res.json())
      .then(profile => {
        dispatch(setPlayerProfile(profile.players[0]));
    });
  }
}

export const hidePlayerProfile = () => {
  return dispatch => {
    dispatch(setPlayerProfile(null))
  }
}

export const GET_PLAYER_PROFILE_REQUEST = 'GET_PLAYER_PROFILE_REQUEST';
export const getPlayerProfileRequest = loading => ({
  type: GET_PLAYER_PROFILE_REQUEST,
  loading
})
