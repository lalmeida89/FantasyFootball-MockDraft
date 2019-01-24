import Footer from './component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  showFavorites,
  showRosters,
  showDraftedPlayers
} from '../../actions/showActions'


const mapStateToProps = state => ({
    draftedPlayers: state.renderReducer.showDraftedPlayers,
    showFavorites: state.renderReducer.showFavorites,
    rosters: state.renderReducer.showRosters,
    isOpen: state.renderReducer.showSidebar
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    showFavorites,
    showRosters,
    showDraftedPlayers
  }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(Footer)
