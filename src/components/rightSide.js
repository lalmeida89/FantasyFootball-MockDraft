import React from 'react';
import {connect} from 'react-redux';

import TeamRosters from './teamRosters'
import PlayersDrafted from './playersDrafted'
import Favorites from './favorites'
import '../styles/rightSide.css'
import { Transition } from 'react-transition-group';

const duration = 400

const rightSideStyle = {
  transition: `width ${duration}ms`
}

const rightSideTransitionStyles = {
  entering: { width: '32%' },
  entered: { width: '32%' },
  exiting: { width: 0 },
  exited: { width: 0}
}

class RightSide extends React.Component {
  render(){
    const {
      showDraftedPlayers,
      showRosters,
      showFavorites} = this.props

    return (
      <Transition in={this.props.isOpen} timeout={duration}>
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
    showRosters: renderReducer.showRosters
  })
}

export default connect (mapStateToProps)(RightSide)
