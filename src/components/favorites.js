import React from 'react';
import {connect} from 'react-redux';
import PlayerProfile from './playerProfile'
import {getPlayerProfile} from '../actions/setCurrentPlayerAction'
import {favoritedPlayer, removeFromFavorites} from '../actions/favoriteActions'

class Favorites extends React.Component {
  render(){
    const { myFavorites, dispatch, currentPlayer } = this.props
    if (!myFavorites){
      return null
    }
    else if(myFavorites){
      let ShowFaves = myFavorites.map((player, index) => (
        <div className='favoritesList' key={index}>
          <p>
            <b onClick={()=> dispatch(getPlayerProfile(player.id))}>
            {player.firstName} {player.lastName} </b>
            <i className="fas fa-times"
            style={{marginLeft:'15px'}}
            onClick={()=> dispatch(removeFromFavorites(player))}
            title="Remove Player from favorites"></i>
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
