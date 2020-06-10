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
  entering: { right: 0 },
  entered: { right: 0 },
  exiting: { right: '-45vw', padding: 0 },
  exited: { right: '-45vw', padding: 0}
}

class RightSide extends React.Component {
  render(){
    const {
      showDraftedPlayers,
      showRosters,
      isOpen
    } = this.props

    return (
      <Transition in={isOpen} timeout={duration}>
      {(state) => (
        <div className='rightSide-wrapper' style={{
          ...rightSideStyle,
          ...rightSideTransitionStyles[state]}}>
          <div className='rightSide-header'>
            <h3> {showDraftedPlayers ? 'Players Taken' : 'Team Rosters'} </h3>
          </div>
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
    showRosters: renderReducer.showRosters,
    isOpen: renderReducer.showSidebar
  })
}

export default connect (mapStateToProps)(RightSide)
