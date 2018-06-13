const initialState = {
  teamCount: 12,
  scoring: 'standard',
  draftPos: 7,
  draftType: 'snake',
  numberOfQBs: 1,
  numberOfRBs: 2,
  numberOfWRs: 2,
  numberOfTEs: 1,
  numberOfWRsRBs: 0,
  numberOfWRsTEs: 0,
  numberOfRBsTEs: 0,
  numberOfRBsWRsTEs: 1,
  numberOfQBsWRsRBsTEs: 0,
  numberOfDST: 1,
  numberOfKickers: 1,
  benchCount: 6,
  showSettingsPage: true
}

export default (preferenceState = initialState, action) => {
  console.log(action.type)
    switch (action.type) {
        case 'TEAM_COUNT_CHANGE':
          console.log(action);
          return Object.assign({}, preferenceState, {
            teamCount: action.teamCount
          });
        case 'DRAFT_PAGE_SUBMIT':
          console.log(action, preferenceState);
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
            showSettingsPage: false
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
            showSettingsPage: preferenceState.showSettingsPage
          }
    }
}
