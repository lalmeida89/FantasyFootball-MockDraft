const initialState = {
  renderProfile: false,
  player: {},
  depthChart: {},
  schedule: [],
  projectedPlayerStats: {}
}

export default (profileState = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYER_PROFILE_SUCCESS':
      return Object.assign({}, profileState, {
        renderProfile: true
      });

    case 'SET_CURRENT_PLAYER':
      return {
        ...profileState,
        player: action.player
      }

    case 'HIDE_PLAYER_PROFILE':
      return {
        renderProfile: false,
        player: {},
        depthChart: {},
        schedule: [],
        projectedPlayerStats: {}
      }

    case 'SET_CURRENT_PLAYER_DEPTH_CHART':
      return Object.assign({}, profileState, {
          depthChart: action.depthChart
      });

    case 'SET_CURRENT_PLAYER_SCHEDULE':
      console.log(action);
      return Object.assign({}, profileState, {
          schedule: action.schedule
      });
    case 'SET_CURRENT_PLAYER_PROJECTIONS':
      console.log(action);
      return Object.assign({}, profileState, {
          projectedPlayerStats: action.projectedPlayerStats
      });
    default:
      return {
        renderProfile: profileState.renderProfile,
        player: profileState.player,
        depthChart: profileState.depthChart,
        schedule: profileState.schedule,
        projectedPlayerStats: profileState.projectedPlayerStats
      }
  }
}
