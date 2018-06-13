const initialState = {
  team1: [],
  team2: [],
  playersUsed: []
}


export default (teamState = initialState, action) => {
  console.log(action.type)
    switch (action.type) {
      case 'DRAFT_PLAYER':
      return {
        playersUsed: [...teamState.playersUsed, ...action.playersUsed],
        team1: [...teamState.team1, ...action.team1],
        team2: [...teamState.team2, ...action.team2]
      };
      default:
      return {
        playersUsed : teamState.playersUsed,
        team1: teamState.team1,
        team2: teamState.team2
      }
    }
}
