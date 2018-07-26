const initialState = {
  teamCount: 12,
  scoring: 'standard',
  draftPos: 7,
  draftType: 'snake',
  numberOfQBs: '',
  numberOfRBs: '',
  numberOfWRs: '',
  numberOfTEs: '',
  numberOfWRsRBs: '',
  numberOfWRsTEs: '',
  numberOfRBsTEs: '',
  numberOfRBsWRsTEs: '',
  numberOfQBsWRsRBsTEs: '',
  numberOfDST: '',
  numberOfKickers: '',
  benchCount: '',
  flexCount: '',
  showSettingsPage: true,
  teams: [],
  playersUsed: [],
  maxTurns: ''
}

export default (preferenceState = initialState, action) => {
    switch (action.type) {
        case 'TEAM_COUNT_CHANGE':
          return Object.assign({}, preferenceState, {
            teamCount: action.teamCount
          });
        case 'ADD_TO_TEAM':
          let t = preferenceState.teams[action.team]
          t.push(action.player)
          return {
            ...preferenceState,
            teams: [...preferenceState.teams],
            playersUsed: [...action.playersUsed]
          }
        case 'ADD_TO_MY_TEAM':
          return {
            ...preferenceState,
            teams: [...preferenceState.teams],
            playersUsed: [...action.playersUsed]
          }
        case 'DRAFT_PAGE_SUBMIT':
          console.log(preferenceState)
          return {
            ...preferenceState,
            teamCount: action.values.numberOfTeams,
            draftPos: action.values.draftOrder,
            numberOfQBs: action.values.qbCount,
            numberOfRBs: action.values.rbCount,
            numberOfWRs: action.values.wrCount,
            numberOfTEs: action.values.teCount,
            numberOfWRsRBs: action.values.wrRbFlexCount,
            numberOfWRsTEs: action.values.wrTeFlexCount,
            numberOfRBsTEs: action.values.rbTeFlexCount,
            numberOfRBsWRsTEs: action.values.wrRbTeFlexCount,
            numberOfQBsWRsRBsTEs: action.values.qbWrRbTeFlexCount,
            numberOfDST: action.values.dstCount,
            numberOfKickers: action.values.kCount,
            benchCount: action.values.benchCount,
            flexCount: action.flexPlayers,
            maxTurns: action.maxTurns,
            showSettingsPage: false,
            teams: action.teamArrays,
          };
        default:
          return {
            teamCount: preferenceState.teamCount,
            scoring: preferenceState.scoring,
            draftPos: preferenceState.draftPos,
            draftType: preferenceState.draftType,
            numberOfQBs: preferenceState.numberOfQBs,
            numberOfRBs: preferenceState.numberOfRBs,
            numberOfWRs: preferenceState.numberOfWRs,
            numberOfTEs: preferenceState.numberOfTEs,
            numberOfWRsRBs: preferenceState.numberOfWRsRBs,
            numberOfWRsTEs: preferenceState.numberOfWRsTEs,
            numberOfRBsTEs: preferenceState.numberOfRBsTEs,
            numberOfRBsWRsTEs: preferenceState.numberOfRBsWRsTEs,
            numberOfQBsWRsRBsTEs: preferenceState.numberOfQBsWRsRBsTEs,
            numberOfDST: preferenceState.numberOfDST,
            numberOfKickers: preferenceState.numberOfKickers,
            benchCount: preferenceState.benchCount,
            showSettingsPage: preferenceState.showSettingsPage,
            flexCount: preferenceState.flexCount,
            teams: preferenceState.teams,
            playersUsed: preferenceState.playersUsed,
            maxTurns: preferenceState.maxTurns
          }
    }
}
