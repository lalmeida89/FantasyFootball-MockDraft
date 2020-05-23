const initialState = {
  showDraftedPlayers: true,
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
        showRosters: false
      }
    case 'SHOW_ROSTERS':
      console.log(renderState, action);
      return {
        ...renderState,
        showDraftedPlayers: false,
        showRosters: true
      }
    case 'SHOW_DRAFTED_PLAYERS':
      console.log(renderState, action);
      return {
        ...renderState,
        showDraftedPlayers: true,
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
        showRosters: renderState.showRosters,
        showSidebar: renderState.showSidebar
      }
  }
}
