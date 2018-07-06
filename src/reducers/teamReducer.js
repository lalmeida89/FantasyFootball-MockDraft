const initialState = {
  myTeam: [],
  playersUsed: []
}


export default (teamState = initialState, action) => {
  console.log(action.type)
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
