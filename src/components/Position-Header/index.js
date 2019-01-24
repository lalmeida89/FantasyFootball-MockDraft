import {connect} from 'react-redux';
import PositionHeader from './component'

const mapStateToProps = state => ({
  qb: state.playersReducer.qb,
  wr: state.playersReducer.wr,
  rb: state.playersReducer.rb,
  te: state.playersReducer.te,
  def: state.playersReducer.def,
  k: state.playersReducer.k,
  displayPlayers: state.playersReducer.displayPlayers,
  menu: state.playersReducer.menu
})

export default connect(mapStateToProps)(PositionHeader)
