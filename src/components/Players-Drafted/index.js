import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPlayerProfile} from '../../actions/setCurrentPlayerAction';
import {PlayersDrafted} from './playersDraftedContainer';

const mapStateToProps = state => ({
    playersUsed: state.draftPreferencesReducer.playersUsed,
    counter: state.counterReducer.counter,
    teamCount: state.draftPreferencesReducer.teamCount,
    currentPlayer: state.playersReducer.currentPlayer,
    showDraftedPlayers: state.renderReducer.showDraftedPlayers,
    teams: state.draftPreferencesReducer.teams,
    draftPos: state.draftPreferencesReducer.draftPos
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getPlayerProfile
  }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(PlayersDrafted)
