import React from 'react';
import {connect} from 'react-redux';
import {hidePlayerProfile} from '../actions/setCurrentPlayerAction';
import {showNotes, showSchedule} from '../actions/showActions'


function rearrangeDate(dateString) {

  var numbers = dateString.substring(0,4);

  return dateString.substring(5) + '-' + numbers
}


class PlayerProfile extends React.Component {

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

    const PlayerHeader = () => {
      if(this.props.playerProfile){
        return (
          <div className='playrHedr'>
            <p onClick={()=>this.props.dispatch(hidePlayerProfile())}
            style={style}><b>x</b></p>
            <div className='infoSelector'>
              <button onClick={()=> this.renderNotes()}> Notes </button>
              <button onClick={()=> this.renderSchedule()}> Schedule </button>
            </div>
          </div>
        )
      }
    }


    if(!this.props.playerProfile){
      return null
    }

    else if (this.props.playerProfile){
      let profile = this.props.playerProfile;
      console.log(profile);
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

export const mapStateToProps = ({playersReducer, teamReducer}) => {
  return ({
    playerProfile: playersReducer.playerProfile,
    team1: teamReducer.team1,
    notes: playersReducer.notes,
    schedule: playersReducer.schedule
  })
}
export default connect (mapStateToProps)(PlayerProfile)
