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
  teams: []
}

export default (preferenceState = initialState, action) => {
    switch (action.type) {
        case 'TEAM_COUNT_CHANGE':
          return Object.assign({}, preferenceState, {
            teamCount: action.teamCount
          });
        case 'DRAFT_PAGE_SUBMIT':
          return {
            ...preferenceState,
            teamCount: action.teamCount,
            draftPos: action.draftPos,
            numberOfQBs: action.numberOfQBs,
            numberOfRBs: action.numberOfRBs,
            numberOfWRs: action.numberOfWRs,
            numberOfTEs: action.numberOfTEs,
            numberOfWRsRBs: action.numberOfWRsRBs,
            numberOfWRsTEs: action.numberOfWRsTEs,
            numberOfRBsTEs: action.numberOfRBsTEs,
            numberOfRBsWRsTEs: action.numberOfRBsWRsTEs,
            numberOfQBsWRsRBsTEs: action.numberOfQBsWRsRBsTEs,
            numberOfDST: action.numberOfDST,
            numberOfKickers: action.numberOfKickers,
            benchCount: action.benchCount,
            flexCount: parseInt(action.numberOfWRsRBs, 10) + parseInt(action.numberOfWRsTEs, 10) + parseInt(action.numberOfRBsTEs, 10) + parseInt(action.numberOfRBsWRsTEs, 10) + parseInt(action.numberOfQBsWRsRBsTEs, 10),
            showSettingsPage: false,
            teams: action.teamArrays
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
            teams: preferenceState.teams
          }
    }
}
