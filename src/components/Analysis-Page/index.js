import {connect} from 'react-redux';
import AnalysisPageContainer from './AnalysisPageContainer';

export const mapStateToProps = state => {
  return ({
    teams: state.draftPreferencesReducer.teams,
    draftPos: state.draftPreferencesReducer.draftPos,
    finalPage: state.analysisReducer.finalPage
  })
}

export default connect (mapStateToProps)(AnalysisPageContainer)
