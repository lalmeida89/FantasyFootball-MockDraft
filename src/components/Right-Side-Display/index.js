import {connect} from 'react-redux';
import {RightSide} from './component';

export const mapStateToProps = ({renderReducer}) => {
  return ({
    showDraftedPlayers: renderReducer.showDraftedPlayers,
    showRosters: renderReducer.showRosters,
    isOpen: renderReducer.showSidebar
  })
}

export default connect (mapStateToProps)(RightSide)
