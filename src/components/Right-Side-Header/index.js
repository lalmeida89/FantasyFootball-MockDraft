import {connect} from 'react-redux';
import {RightSideHeader} from './rightSide-header';
import {bindActionCreators} from 'redux';

import {
  showRosters,
  showDraftedPlayers
} from '../../actions/showActions'

const mapStateToProps = state => ({
    showDraftedPlayers: state.renderReducer.showDraftedPlayers,
    showRosters: state.renderReducer.showRosters
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    showRosters,
    showDraftedPlayers
  }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(RightSideHeader)
