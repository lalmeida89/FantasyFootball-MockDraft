const initialState = {
  myTeam: [],
  playersUsed: []
}


export default (teamState = initialState, action) => {
  //this will all change soon to accomodate the CPU teams and not just the user's team
    switch (action.type) {
      case 'DRAFT_PLAYER':
      return {
        playersUsed: [...teamState.playersUsed, ...action.playersUsed],
        myTeam: [...teamState.myTeam, ...action.myTeam]
      };
      default:
      return {
        playersUsed : teamState.playersUsed,
        myTeam: teamState.myTeam
      }
    }
}
