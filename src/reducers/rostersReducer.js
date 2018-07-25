const initialState = {
  menu: false,
  currentTeam: [],
  teamNumber: ''
}

export default (rosterState = initialState, action) => {
  switch (action.type){
    case 'SHOW_TEAM_MENU':
      console.log(action, rosterState)
      return {
        ...rosterState,
        menu: true
      }
    case 'HIDE_TEAM_MENU':
      console.log(action, rosterState)
      return {
        ...rosterState,
        menu: false
      }
    case 'SHOW_CURRENT_TEAM':
      console.log(action, rosterState)
      return {
        ...rosterState,
        currentTeam: action.currentTeam,
        teamNumber: action.teamNumber
      }
    default:
      return {
        menu: rosterState.menu,
        currentTeam: rosterState.currentTeam,
        teamNumber: rosterState.teamNumber
      }
  }
}
