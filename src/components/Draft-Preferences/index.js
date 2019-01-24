import DraftPageContainer from './DraftPageContainer'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {draftPageSubmit} from '../../actions/draftPreferencesAction'

const mapStateToProps = state => ({
  teamCount: state.draftPreferencesReducer.teamCount
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    draftPageSubmit
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftPageContainer)
