export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const addToFavorites = favoritedPlayerObj => ({
    type: ADD_TO_FAVORITES,
    favoritePlayer: favoritedPlayerObj.favorites
})

export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const removeFromFavorites = notFavoritePlayer => {
  return {
    type: REMOVE_FROM_FAVORITES,
    notFavoritePlayer
  }
}

export const favoritePicks = player => {
  let favoritedPlayerObj = {favorites : []};
  favoritedPlayerObj.favorites.push(player)
  return favoritedPlayerObj
}

export const favoritedPlayer = player => {
  return dispatch => {
    let favoritedPlayerObj = favoritePicks(player)
    dispatch(addToFavorites(favoritedPlayerObj));
    console.log(player);
  }
}
