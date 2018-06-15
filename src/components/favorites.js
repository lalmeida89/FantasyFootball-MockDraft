import React from 'react';
import {connect} from 'react-redux';
import PlayerProfile from './playerProfile'
import {getPlayerProfile} from '../actions/setCurrentPlayerAction'
import {favoritedPlayer} from '../actions/favoriteActions'

class Favorites extends React.Component {
  render(){
    const { myFavorites, dispatch, currentPlayer } = this.props
    if (!myFavorites){
      return null
    }
    else if(myFavorites){
      let ShowFaves = myFavorites.map((player, index) => (
        <div key={index}> <p
          onClick={()=> dispatch(getPlayerProfile(player.id))}>
          <b> {player.firstName} {player.lastName} </b>
          </p>
        </div>
      ))
      return (
        <div className='favoritePlayers'>
          <h3> Favorite Players </h3>
          { ShowFaves }
        </div>
      )
    }
  }
}

export const mapStateToProps = ({favoritesReducer, playersReducer}) => {
  return ({
    myFavorites : favoritesReducer.myFavorites,
    currentPlayer: playersReducer.currentPlayer
  })
}

export default connect (mapStateToProps) (Favorites)
