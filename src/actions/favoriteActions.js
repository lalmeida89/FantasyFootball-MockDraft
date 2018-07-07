//we create an object with an empty array called favorites. when the user clicks to add to favorites
//it gets pushed onto that object. this could be done a little better but it works so I'm not
//touching it.

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
    //console.log(player);
  }
}
