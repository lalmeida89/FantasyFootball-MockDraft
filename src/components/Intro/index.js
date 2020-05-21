import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderSidebar} from '../../actions/showActions';
import {fetchPlayers} from '../../actions/fetchAction';
import {getPlayerProfile} from '../../actions/setCurrentPlayerAction';
import {
  showPosition,
  showMenu,
  hideMenu
} from '../../actions/showActions';
import IntroContainer from './IntroContainer';

const mapStateToProps = state => ({
  players: state.playersReducer.players,
  qb: state.playersReducer.qb,
  wr: state.playersReducer.wr,
  rb: state.playersReducer.rb,
  te: state.playersReducer.te,
  def: state.playersReducer.def,
  k: state.playersReducer.k,
  loading: state.playersReducer.loading,
  error: state.playersReducer.error,
  displayPlayers: state.playersReducer.displayPlayers,
  menu: state.playersReducer.menu,
  counter: state.counterReducer.counter,
  turn: state.counterReducer.turns,
  isOpen: state.renderReducer.showSidebar,
  teamCount: state.draftPreferencesReducer.teamCount
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    showPosition,
    showMenu,
    hideMenu,
    getPlayerProfile,
    fetchPlayers,
    renderSidebar
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroContainer)
