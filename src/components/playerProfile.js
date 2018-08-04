import React from 'react';
import {connect} from 'react-redux';
import {hidePlayerProfile} from '../actions/setCurrentPlayerAction';
import {showNotes, showSchedule} from '../actions/showActions'
import {addToFavorites, removeFromFavorites} from '../actions/favoriteActions'
import {addPlayerToMyTeam} from '../actions/draftPreferencesAction'
import {ProfileButton} from '../styledComponents/profileButton'
import {TeamAbbr} from '../styledComponents/teamAbbr'
import {Position} from '../styledComponents/position'
import '../styles/playerCard.css'


//rearrange the date from the data given from the fetch
const rearrangeDate = (dateString) => {
  var numbers = dateString.substring(0,4);
  return dateString.substring(5) + '-' + numbers
}

//create a header based on the selected player. if teamAbbr is falsy, the player is a free agent
//if the player is a defensive team, he doesn't get a pretty jersey with his number on it.
//if the player's number is one digit, we add a zero in front so it looks centered.
const PlayerHeader = (props) => {
  let style = {
    float:'right',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '0'
  }
  let borderStyle = {border: '1px solid'}
  let player = props.currentPlayer
  return (
    <div className='playrHedr'>
      <h1>{player.name}</h1>
      <h3>
      <Position style = {borderStyle} position={player.position}> {player.position}</Position>
      <TeamAbbr team={player.teamAbbr}> {!player.teamAbbr ? 'FA' : player.teamAbbr} </TeamAbbr>
      {player.position !== 'DEF' ?
      <i className="fas fa-tshirt" style={{color:'#0e269c9c', fontSize:'24px'}}>
        <span style={{fontSize:'10px', margin:'-15px 0 0 10px', display:'block', color:'white', fontFamily:'fantasy'}}>
              {player.jerseyNumber<10 ? (0+player.jerseyNumber) : player.jerseyNumber}
          </span></i>
          : null }
      </h3>
      <div className='infoSelector'>
        <ProfileButton onClick={()=> props.all.dispatch(showNotes())}> NEWS </ProfileButton>
        <ProfileButton onClick={()=> props.all.dispatch(showSchedule())}> SCHEDULE </ProfileButton>
        <ProfileButton draft onClick={()=> props.all.dispatch(addPlayerToMyTeam(player))}> DRAFT </ProfileButton>
      </div>
    </div>
  )
}


class PlayerProfile extends React.Component {
  render(){
    const {
      playerProfile,
      myFavorites,
      dispatch,
      notes,
      schedule,
      loadingPlayer
    } = this.props

    if(!playerProfile && !loadingPlayer){
      return null
    }

    //if the player info is fetching, we render a loading screen.
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

    //if a player profile is true, we render this component with PlayerHeader as the header.
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
                  <h3>NEWS</h3>
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
                <h3 style={{marginBottom: '25px'}}> SCHEDULE </h3>
                <p> Week 1: <b>{profile.weeks[0].opponent}</b> </p>
                <p> Week 2: <b>{profile.weeks[1].opponent}</b> </p>
                <p> Week 3: <b>{profile.weeks[2].opponent}</b> </p>
                <p> Week 4: <b>{profile.weeks[3].opponent}</b> </p>
                <p> Week 5: <b>{profile.weeks[4].opponent}</b> </p>
                <p> Week 6: <b>{profile.weeks[5].opponent}</b> </p>
                <p> Week 7: <b>{profile.weeks[6].opponent}</b> </p>
                <p> Week 8: <b>{profile.weeks[7].opponent}</b> </p>
                <p> Week 9: <b>{profile.weeks[8].opponent}</b> </p>
                <p> Week 10: <b>{profile.weeks[9].opponent}</b> </p>
                <p> Week 11: <b>{profile.weeks[10].opponent}</b> </p>
                <p> Week 12: <b>{profile.weeks[11].opponent}</b> </p>
                <p> Week 13: <b>{profile.weeks[12].opponent}</b> </p>
                <p> Week 14: <b>{profile.weeks[13].opponent}</b> </p>
              <p> Week 15: <b>{profile.weeks[14].opponent}</b> </p>
              <p> Week 16: <b>{profile.weeks[15].opponent}</b> </p>
              <p> Week 17: <b>{profile.weeks[16].opponent}</b> </p>
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
