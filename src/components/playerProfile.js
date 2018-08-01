import React from 'react';
import {connect} from 'react-redux';
import {hidePlayerProfile} from '../actions/setCurrentPlayerAction';
import {showNotes, showSchedule} from '../actions/showActions'
import {addToFavorites, removeFromFavorites} from '../actions/favoriteActions'
import {addPlayerToMyTeam} from '../actions/draftPreferencesAction'

import {TeamAbbr} from '../styledComponents/teamAbbr'
import {Position} from '../styledComponents/position'
import '../styles/playerCard.css'


//rearrange the date from the data given from the fetch
const rearrangeDate = (dateString) => {
  var numbers = dateString.substring(0,4);
  return dateString.substring(5) + '-' + numbers
}

const PlayerHeader = (props) => {
  let style = {
    float:'right',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '0'
  }
  let borderStyle = {border: '1px solid'}
  let player = props.currentPlayer
  let faves = props.favorites
  //console.log(player, props.favorites, faves, faves.indexOf(player));

  return (
    <div className='playrHedr'>
      <h1>{player.name}</h1>
      <h3>
      <Position style = {borderStyle} position={player.position}> {player.position}</Position>
      <TeamAbbr team={player.teamAbbr}> {player.teamAbbr == '' ? 'FA' : player.teamAbbr} </TeamAbbr>
       #{player.jerseyNumber} </h3>
      <div className='infoSelector'>
        <button onClick={()=> this.renderNotes()}> Notes </button>
        <button onClick={()=> this.renderSchedule()}> Schedule </button>
        <button onClick={()=> props.all.dispatch(addPlayerToMyTeam(player))}> Draft </button>
        <button onClick={()=>{faves.includes(player)
          ? props.all.dispatch(removeFromFavorites(player))
          : props.all.dispatch(addToFavorites(player)) }}>
          {faves.indexOf(player)!==-1 ? 'Remove from favorites' : 'Add to favorites' }
        </button>
      </div>
    </div>
  )
}


class PlayerProfile extends React.Component {
  //player profile will have several options. showNotes sets notes to true and schedule to false.
  //showSchedule will do the exact opposite. We will then render different info based on what is true.
  renderNotes = () => {
    this.props.dispatch(showNotes())
  }

  renderSchedule = () => {
    this.props.dispatch(showSchedule())
  }

  render(){
    const {
      playerProfile,
      myFavorites,
      dispatch,
      notes,
      schedule,
      loadingPlayer
    } = this.props

    //if a player profile is true, we render this component with PlayerHeader as the header.

    if(!playerProfile && !loadingPlayer){
      return null
    }

    if(!playerProfile && loadingPlayer) {
      return (
        <div className='playerCard-background' onClick={()=>dispatch(hidePlayerProfile())}>
          <div className='loadingCard'>
            <div className='loader'>
            </div>
            <h3 className='loadingHeader'>LOADING PLAYER STATS</h3>
          </div>
        </div>
      )
    }


      //notes are set to true by default but can also be set to true
      //by the renderNotes function
      //if the selected player has no notes (which is rare but is the case for a few newer players)
      //we simply tell the user that there aren't news at this time
    else {
      let profile = this.props.playerProfile;
        const Notes = () => {
          if (notes) {
            if (profile.notes[0]){
              let newDate = profile.notes[0].timestamp.slice(0,10);
              let timePosted = rearrangeDate(newDate);
              return (
                <div className='notes'>
                  <h3>Notes</h3>
                  <p>{timePosted}</p>
                  <h4>{profile.notes[0].body}</h4>
                  <p>{profile.notes[0].analysis}</p>
                </div>
          )
        }
        if(!profile.notes[0]){
            return (
            <div className='notes'>
              <h3>Notes</h3>
              <h4>No news or notes at this time</h4>
            </div>
          )}
        }
        else { return null }
      }

      //if we click on the renderSchedule button, we will render the player's schedule which
      //comes with the player fetch. If there is a week where the user is not playing,
      //we replace 'false' with --BYE-- for BYE week. There's probably
      //a better way of doing this by looping but it's already done.
      const Schedule = () => {
        if (schedule) {
          for(let i = 0; i < profile.weeks.length ; i++){
            if (profile.weeks[i].opponent === false){
              profile.weeks[i].opponent = "--BYE--"
            }
          }
          return (
              <div className='schedule'>
                <p> Week 1: {profile.weeks[0].opponent} </p>
                <p> Week 2: {profile.weeks[1].opponent} </p>
                <p> Week 3: {profile.weeks[2].opponent} </p>
                <p> Week 4: {profile.weeks[3].opponent} </p>
                <p> Week 5: {profile.weeks[4].opponent} </p>
                <p> Week 6: {profile.weeks[5].opponent} </p>
                <p> Week 7: {profile.weeks[6].opponent} </p>
                <p> Week 8: {profile.weeks[7].opponent} </p>
                <p> Week 9: {profile.weeks[8].opponent} </p>
                <p> Week 10: {profile.weeks[9].opponent} </p>
                <p> Week 11: {profile.weeks[10].opponent} </p>
                <p> Week 12: {profile.weeks[11].opponent} </p>
                <p> Week 13: {profile.weeks[12].opponent} </p>
                <p> Week 14: {profile.weeks[13].opponent} </p>
              <p> Week 15: {profile.weeks[14].opponent} </p>
              <p> Week 16: {profile.weeks[15].opponent} </p>
              <p> Week 17: {profile.weeks[16].opponent} </p>
            </div>
        )
      }
      else { return null }
    }
    return (
      <div className='playerCard-background' onClick={()=>dispatch(hidePlayerProfile())}>
        <div className='playerCard' onClick={(e)=> e.stopPropagation()}>
          <PlayerHeader currentPlayer={playerProfile} favorites={myFavorites} all={this.props}/>
          <Notes />
          <Schedule />
          <button onClick={()=>dispatch(hidePlayerProfile())} className='hideProfile'> CLOSE</button>
        </div>
      </div>
    )
  }

}
}

export const mapStateToProps = ({playersReducer, teamReducer, draftPreferencesReducer, favoritesReducer}) => {
  return ({
    playersUsed: draftPreferencesReducer.playersUsed,
    playerProfile: playersReducer.playerProfile,
    notes: playersReducer.notes,
    schedule: playersReducer.schedule,
    currentPlayer: playersReducer.currentPlayer,
    loadingPlayer: playersReducer.profileLoading,
    myFavorites: favoritesReducer.myFavorites
  })
}
export default connect (mapStateToProps)(PlayerProfile)
