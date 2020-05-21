import React from 'react';
import {connect} from 'react-redux';
import {PlayerProfile} from './playerProfileContainer';
import {bindActionCreators} from 'redux';


export const mapStateToProps = state => ({
  renderProfile: state.playerProfileReducer.renderProfile,
  playersUsed: state.draftPreferencesReducer.playersUsed,
  player: state.playerProfileReducer.player,
  depthChart: state.playerProfileReducer.depthChart,
  schedule: state.playerProfileReducer.schedule,
  projectedPlayerStats: state.playerProfileReducer.projectedPlayerStats
})


export default connect (mapStateToProps)(PlayerProfile)
