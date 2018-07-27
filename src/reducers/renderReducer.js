const initialState = {
  showDraftedPlayers: true,
  showFavorites: false,
  showRosters: false
}

export default (renderState = initialState, action) => {
  switch (action.type){
    case 'SHOW_FAVORITES':
      console.log(renderState, action);
      return {
        showDraftedPlayers: false,
        showFavorites: true,
        showRosters: false
      }
    case 'SHOW_ROSTERS':
      console.log(renderState, action);
      return {
        showDraftedPlayers: false,
        showFavorites: false,
        showRosters: true
      }
    case 'SHOW_DRAFTED_PLAYERS':
      console.log(renderState, action);
      return {
        showDraftedPlayers: true,
        showFavorites: false,
        showRosters: false
      }
    default:
      return{
        showDraftedPlayers: renderState.showDraftedPlayers,
        showFavorites: renderState.showFavorites,
        showRosters: renderState.showRosters
      }
  }
}
