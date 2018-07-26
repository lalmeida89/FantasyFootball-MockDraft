import React from 'react';
import {connect} from 'react-redux';
import {getPlayerProfile} from '../actions/setCurrentPlayerAction'
import {removeFromFavorites} from '../actions/favoriteActions'

class Favorites extends React.Component {
  render(){
    //if myFavorites is true (currently only set to false when reduxForm is true), then map
    //through array of favorite players and return them. clicking on the players name will
    //show their profile while clicking on the X icon will remove them from the favorites array
    const { myFavorites, dispatch } = this.props
    if (!myFavorites){
      return null
    }
    else if(myFavorites){
      let ShowFaves = myFavorites.map((player, index) => (
        <div className='favoritesList' key={index}>
          <p>
            <b className='favorites' onClick={()=> dispatch(getPlayerProfile(player.id))}>
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
          { myFavorites.length >= 1 ? ShowFaves : <h5> No favorites atm </h5> }
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
