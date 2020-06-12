import React from 'react';
import TeamRosters from './../Team-Rosters'
import PlayersDrafted from './../Players-Drafted';
import RightSideHeader from './../Right-Side-Header';

import '../../styles/rightSide.css'
import { Transition } from 'react-transition-group';

const duration = 200

const rightSideStyle = {
  transition: `right ${duration}ms`
}

const rightSideTransitionStyles = {
  entering: { right: 0, opacity: 0 },
  entered: { right: 0, opacity: 1 },
  exiting: { right: '-45vw', padding: 0, opacity: 0 },
  exited: { right: '-45vw', padding: 0, opacity: 0 }
}

export class RightSide extends React.Component {
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
            <RightSideHeader />
          <div className='rightSide-innerDiv'
            id={showDraftedPlayers ? 'fadeToFrontStyle' : 'fadeToBackStyle'}>
            <PlayersDrafted />
          </div>
          <div className='rightSide-innerDiv'
            id={showDraftedPlayers ? 'fadeToBackStyle' : 'fadeToFrontStyle'}>
            <TeamRosters />
          </div>
        </div>
      )}
      </Transition>
    )
  }
}
