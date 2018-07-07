const initialState = {
  myFavorites : []
}

export default (favoriteState = initialState, action) => {
  switch(action.type) {
    case 'ADD_TO_FAVORITES':
    return {
      myFavorites: [...favoriteState.myFavorites, ...action.favoritePlayer]
    };
    //when the removedFavorite action comes through, we filter out the selected player and return
    //the array and set that as the current state
    case 'REMOVE_FROM_FAVORITES':
    const removedFavorite = favoriteState.myFavorites.filter(player => {
      return player.id !== action.notFavoritePlayer.id
    })
    return {
      myFavorites: removedFavorite
    }
    default:
    return {
      myFavorites: favoriteState.myFavorites
    }
  }
}
