import React from 'react';
import {connect} from 'react-redux';

import TeamRosters from './../Team-Rosters'
import PlayersDrafted from './../Players-Drafted';
import '../../styles/rightSide.css'
import { Transition } from 'react-transition-group';

const duration = 400

const rightSideStyle = {
  transition: `right ${duration}ms`
}

const rightSideTransitionStyles = {
  entering: { right: '-40%', padding: 0 },
  entered: { right: 0 },
  exiting: { right: '-40%', padding: 0 },
  exited: { right: '-40%', padding: 0}
}

class RightSide extends React.Component {
  render(){
    const {
      showDraftedPlayers,
      showRosters,
      showFavorites,
      isOpen } = this.props

    return (
      <Transition in={isOpen} timeout={duration}>
      {(state) => (
        <div className='RightSide' style={{
          ...rightSideStyle,
          ...rightSideTransitionStyles[state]}}>
          {showDraftedPlayers ? <PlayersDrafted /> : <TeamRosters />}
        </div>
      )}
      </Transition>
    )
  }
}

export const mapStateToProps = ({renderReducer}) => {
  return ({
    showDraftedPlayers: renderReducer.showDraftedPlayers,
    showFavorites: renderReducer.showFavorites,
    showRosters: renderReducer.showRosters,
    isOpen: renderReducer.showSidebar
  })
}

export default connect (mapStateToProps)(RightSide)
