export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';
export const SET_PLAYER_PROFILE = 'SET_PLAYER_PROFILE';

export function setCurrentPlayer(id) {
  console.log(id);
  return {
    type: SET_CURRENT_PLAYER,
    id,
  };
}

export function setPlayerProfile(profile) {
  return {
    type: SET_PLAYER_PROFILE,
    profile,
  };
}

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
