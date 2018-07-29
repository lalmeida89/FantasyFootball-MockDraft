import React from 'react';
import {connect} from 'react-redux';

import TeamRosters from './teamRosters'
import PlayersDrafted from './playersDrafted'
import Favorites from './favorites'

class RightSide extends React.Component {
  render(){
    console.log(this.props)
    const {showDraftedPlayers,
    showRosters,
    showFavorites} = this.props

    if (showDraftedPlayers === true){
      console.log('show me the money')
      return (
        <div className='RightSide'>
          <PlayersDrafted />
        </div>
      )
    }
    if (showRosters === true){
      console.log('show me the Rosters')
      return (
        <div className='RightSide'>
          <TeamRosters />
        </div>
      )
    }
    if (showFavorites === true){
      console.log('show me the faves')
      return (
        <div className='RightSide'>
          <Favorites />
        </div>
      )
    }
  }
}

export const mapStateToProps = ({renderReducer}) => {
  console.log(renderReducer)
  return ({
    showDraftedPlayers: renderReducer.showDraftedPlayers,
    showFavorites: renderReducer.showFavorites,
    showRosters: renderReducer.showRosters
  })
}

export default connect (mapStateToProps)(RightSide)