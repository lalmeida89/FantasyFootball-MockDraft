import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {draftPageSubmit} from '../../actions/draftPreferencesAction';
import LandingPageContainer from './LandingPageContainer';

const mapStateToProps = state => ({
  teamCount: state.draftPreferencesReducer.teamCount,
  showSettingsPage: state.draftPreferencesReducer.showSettingsPage
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    draftPageSubmit
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer)
