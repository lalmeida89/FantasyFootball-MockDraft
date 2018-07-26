import React from 'react';
import {connect} from 'react-redux';
import {hidePlayerProfile} from '../actions/setCurrentPlayerAction';
import {showNotes, showSchedule} from '../actions/showActions'


//rearrange the date from the data given from the fetch
const rearrangeDate = (dateString) => {
  var numbers = dateString.substring(0,4);
  return dateString.substring(5) + '-' + numbers
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
    let style = {
      float:'right',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '0'
    }

    //if a player profile is true, we render this component with PlayerHeader as the header.

    if(!this.props.playerProfile){
      return null
    }

    //this might be redundant but we again check the truthiness of the playerProfile and
    //at the moment only render the first piece in the notes array that we receive from the fetch
    else if (this.props.playerProfile){
      const PlayerHeader = () => {
        return (
          <div className='playrHedr'>
            <i className="fas fa-times"
              style={style}
              onClick={()=>this.props.dispatch(hidePlayerProfile())}></i>
            <div className='infoSelector'>
              <button onClick={()=> this.renderNotes()}> Notes </button>
              <button onClick={()=> this.renderSchedule()}> Schedule </button>
            </div>
          </div>
        )
      }

      /*let currentPlayer = this.props.currentPlayer;
      let playersUsed = this.props.playersUsed;
      let playerId = JSON.stringify(profile.id)
      console.log(playerId, playersUsed.includes(playerId), playersUsed.includes(profile.id))
      let playersUsed = this.props.playersUsed
      for (let i=0; i< playersUsed.length ; i++){
        console.log(playersUsed[i].id === currentPlayer)
      }
      console.log(currentPlayer, this.props.playersUsed[0].id===currentPlayer, this.props.playersUsed[0].id)
      if(this.props.playersUsed.includes(profile)){
        console.log('hey this is working')
      }*/

      //notes are set to true by default but can also be set to true
      //by the renderNotes function
      let profile = this.props.playerProfile;
      if (this.props.notes === true) {
        if (profile.notes[0]){
          let newDate = profile.notes[0].timestamp.slice(0,10);
          let timePosted = rearrangeDate(newDate);
          return (
          <div className='playerCard'>
            <PlayerHeader />
            <div className='notes'>
              <h3>Notes</h3>
              <p>{timePosted}</p>
              <h4>{profile.notes[0].body}</h4>
              <p>{profile.notes[0].analysis}</p>
            </div>

          </div>
          )
        }

        //if the selected player has no notes (which is rare but is the case for a few newer players)
        //we simply tell the user that there aren't news at this time
        else if(!profile.notes[0]){
          return (
          <div className='playerCard'>
            <PlayerHeader />
            <div className='notes'>
              <h3>Notes</h3>
              <h4>No news or notes at this time</h4>
            </div>

          </div>
          )
        }
      }

      //if we click on the renderSchedule button, we will render the player's schedule which
      //comes with the player fetch. If there is a week where the user is not playing,
      //we replace 'false' with --BYE-- for BYE week. There's probably
      //a better way of doing this by looping but it's already done.
      else if (this.props.schedule === true) {
        for(let i = 0; i < profile.weeks.length ; i++){
          if (profile.weeks[i].opponent === false){
            profile.weeks[i].opponent = "--BYE--"
          }
        }
        return (
          <div className='playerCard'>
            <PlayerHeader />
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

          </div>
        )
      }
    }
  }
}

export const mapStateToProps = ({playersReducer, teamReducer, draftPreferencesReducer}) => {
  return ({
    playersUsed: draftPreferencesReducer.playersUsed,
    playerProfile: playersReducer.playerProfile,
    notes: playersReducer.notes,
    schedule: playersReducer.schedule,
    currentPlayer: playersReducer.currentPlayer
  })
}
export default connect (mapStateToProps)(PlayerProfile)
