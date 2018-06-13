const initialState = {
  myFavorites : []
}

export default (favoriteState = initialState, action) => {
  switch(action.type) {
    case 'ADD_TO_FAVORITES':
    console.log(action, favoriteState)
    return {
      myFavorites: [...favoriteState.myFavorites, ...action.favoritePlayer]
    };
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
