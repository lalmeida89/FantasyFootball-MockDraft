export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';
export const SET_PLAYER_PROFILE = 'SET_PLAYER_PROFILE';
export const HIDE_PLAYER_PROFILE ='HIDE_PLAYER_PROFILE'

export const setCurrentPlayer = id => {
  console.log(id);
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
    let idUrl = dispatch(setCurrentPlayer(id))
    console.log(idUrl.id);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `http://api.fantasy.nfl.com/v1/players/details?playerId=${idUrl.id}&statType=seasonStatsformat=json`;
    fetch(proxyurl + url)
      .then(res => res.json())
      .then(profile => {
        dispatch(setPlayerProfile(profile.players[0]));
        console.log(profile.players[0]);
    });
  }
}

export function hidePlayerProfile() {
  return dispatch => {
    dispatch(setPlayerProfile(null))
  }
}
