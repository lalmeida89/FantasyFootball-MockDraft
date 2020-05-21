import React from 'react';
import {connect} from 'react-redux';
import {PlayerProfile} from './playerProfileContainer';
import {hidePlayerProfile} from '../../actions/setCurrentPlayerAction'
import {addPlayerToMyTeam} from '../../actions/draftPreferencesAction';
import {bindActionCreators} from 'redux';

const mapStateToProps = state => ({
  renderProfile: state.playerProfileReducer.renderProfile,
  playersUsed: state.draftPreferencesReducer.playersUsed,
  player: state.playerProfileReducer.player,
  depthChart: state.playerProfileReducer.depthChart,
  schedule: state.playerProfileReducer.schedule,
  projectedPlayerStats: state.playerProfileReducer.projectedPlayerStats
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    hidePlayerProfile,
    addPlayerToMyTeam
  }, dispatch);
}
export default connect (mapStateToProps, mapDispatchToProps)(PlayerProfile)
