const initialState = {
  showDraftedPlayers: true,
  showFavorites: false,
  showRosters: false,
  showSidebar: true
}

export default (renderState = initialState, action) => {
  switch (action.type){
    case 'SHOW_FAVORITES':
      console.log(renderState, action);
      return {
        ...renderState,
        showDraftedPlayers: false,
        showFavorites: true,
        showRosters: false
      }
    case 'SHOW_ROSTERS':
      console.log(renderState, action);
      return {
        ...renderState,
        showDraftedPlayers: false,
        showFavorites: false,
        showRosters: true
      }
    case 'SHOW_DRAFTED_PLAYERS':
      console.log(renderState, action);
      return {
        ...renderState,
        showDraftedPlayers: true,
        showFavorites: false,
        showRosters: false
      }
    case 'RENDER_SIDEBAR':
      console.log(action, renderState)
      if(renderState.showSidebar){
        return {
          ...renderState,
          showSidebar: false
        }
      }
      else {
        return {
          ...renderState,
          showSidebar: true
        }
      }
    default:
      return{
        showDraftedPlayers: renderState.showDraftedPlayers,
        showFavorites: renderState.showFavorites,
        showRosters: renderState.showRosters,
        showSidebar: renderState.showSidebar
      }
  }
}
