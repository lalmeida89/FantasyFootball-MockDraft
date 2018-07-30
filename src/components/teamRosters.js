  import React from 'react';
  import {connect} from 'react-redux';

  import {Button} from '../styledComponents/dropdown';
  import {
    showTeamMenu,
    hideTeamMenu,
    showCurrentTeam
  } from '../actions/showActions'

  class TeamRosters extends React.Component {

    displayMenu = () => {
      this.props.dispatch(showTeamMenu());
    }

    closeMenu = () => {
      this.props.dispatch(hideTeamMenu());
    }

    displayCurrentTeam = (team, teamNumber) => {
      this.props.dispatch(showCurrentTeam(team, teamNumber));
      this.closeMenu();
    }


    render(){
      const {
        numberOfQBs,
        numberOfWRs,
        numberOfRBs,
        numberOfTEs,
        showSettingsPage,
        numberOfDST,
        numberOfKickers,
        benchCount,
        numberOfWRsRBs,
        numberOfWRsTEs,
        numberOfRBsTEs,
        numberOfRBsWRsTEs,
        numberOfQBsWRsRBsTEs,
        flexCount,
        teams,
        draftPos,
        menu,
        currentTeam,
        teamNumber
        } = this.props;

      if (showSettingsPage === true) {
        return null
      }

      //this entire component will be adjusted soon. It's a little crazy right now. We're simply pushing
      //the players that are drafted into the appropriate place. If that number specific to a position is full,
      //then if one of the flex spots is appropriate we push it to the flex, and then we push them to the bench.
      //Will probably update this to an action creator and pass it to the reducer and just use this component
      //for rendering.

      else if (showSettingsPage === false) {

        const ShowTeams = () => {
          let userIcon = <i className="fas fa-user"></i>
          let teamNames = teams.map((team, index) => (
            <div key={index}>
              <Button dropBtn onClick={()=> this.displayCurrentTeam(team, index+1)}>
                <div>Team {index+1}
                  { index === draftPos -1
                    ? userIcon
                    : null }
                </div>
              </Button>
            </div>
          ))
          return (
            <div className='teamDropdown positionBtn'>
            { menu
              ? <div>
                  <Button dropBtn> Team {teamNumber} </Button>
                  {teamNames}
                </div>
              : <Button dropBtn onClick={()=> this.displayMenu()}>
                <div className='teamBtn'>Team {teamNumber}
                  { currentTeam === teams[draftPos-1]
                    ? userIcon
                    : null }
                </div>
              { menu
                ? <i className="fas fa-chevron-up"></i>
                : <i className="fas fa-chevron-down"></i> }
              </Button> }
            </div>
          )
        }

        const TeamRoster = () => {
          let currentRoster = {qbs : [], wrs : [], rbs : [], tes : [], def : [], flex : [], k : [], bench : []}
          for(let i=0; i<currentTeam.length; i++){
            if (currentTeam[i].position === 'QB'){
              currentRoster.qbs.push(currentTeam[i])
              if (currentRoster.qbs.length > numberOfQBs && currentRoster.flex.length <= flexCount && numberOfQBsWRsRBsTEs >= 1){
                currentRoster.flex.push(currentTeam[i])
              }
              if (currentRoster.qbs.length > numberOfQBs && currentRoster.flex.length > flexCount){
                currentRoster.bench.push(currentTeam[i])
              }
            }
            if (currentTeam[i].position === 'WR'){
              currentRoster.wrs.push(currentTeam[i])
              if (currentRoster.wrs.length > numberOfWRs && currentRoster.flex.length <= flexCount && (numberOfRBsWRsTEs >= 1 || numberOfWRsTEs >= 1 || numberOfWRsRBs >= 1 || numberOfQBsWRsRBsTEs >= 1)) {
                currentRoster.flex.push(currentTeam[i])
              }
              if (currentRoster.wrs.length > numberOfWRs && currentRoster.flex.length > flexCount){
                currentRoster.bench.push(currentTeam[i])
              }
            }

            if (currentTeam[i].position === 'TE'){
              currentRoster.tes.push(currentTeam[i])
              if (currentRoster.tes.length > numberOfTEs && currentRoster.flex.length <= flexCount && (numberOfRBsTEs >= 1 || numberOfWRsTEs >=1 || numberOfRBsWRsTEs >=1 || numberOfQBsWRsRBsTEs >= 1)) {
                currentRoster.flex.push(currentTeam[i])
              }
              if (currentRoster.tes.length > numberOfTEs && currentRoster.flex.length > flexCount){
                currentRoster.bench.push(currentTeam[i])
              }
            }

            if (currentTeam[i].position === 'RB'){
              currentRoster.rbs.push(currentTeam[i])
              if (currentRoster.rbs.length > numberOfRBs && currentRoster.flex.length <= flexCount && (numberOfRBsWRsTEs >= 1 || numberOfRBsTEs >= 1 || numberOfWRsRBs >= 1 || numberOfQBsWRsRBsTEs >= 1)) {
                currentRoster.flex.push(currentTeam[i])
              }
              if (currentRoster.rbs.length > numberOfRBs && currentRoster.flex.length > flexCount){
                currentRoster.bench.push(currentTeam[i])
              }
            }

            if (currentTeam[i].position === 'DEF'){
              currentRoster.def.push(currentTeam[i])
              if (currentRoster.def.length > numberOfDST){
                currentRoster.bench.push(currentTeam[i])
              }
            }
            if (currentTeam[i].position ==='K'){
              currentRoster.k.push(currentTeam[i])
              if (currentRoster.k.length > numberOfKickers){
                currentRoster.bench.push(currentTeam[i])
              }
            }

          }
          let showStyle = {display: 'inline'};

          return (
            <div className='rosterPlayers'>
              <p style={ numberOfQBs >= 1 ? {showStyle} : {display:'none'}}><b> QB </b>
              { currentRoster.qbs[0] ? (currentRoster.qbs[0].name) : null }
              </p>
              <p style={ numberOfQBs >= 2 ? {showStyle} : {display:'none'}}><b> QB </b>
              { currentRoster.qbs[1] ? (currentRoster.qbs[1].name ) : null }
              </p>
              <p style={ numberOfQBs >= 3 ? {showStyle} : {display:'none'}}><b> QB </b>
              { currentRoster.qbs[2] ? (currentRoster.qbs[2].name ) : null }
              </p>
              <p style={ numberOfQBs >= 4 ? {showStyle} : {display:'none'}}><b> QB </b>
              { currentRoster.qbs[3] ? (currentRoster.qbs[3].name  ) : null }
              </p>


              <p style={ numberOfWRs >= 1 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[0] ? (currentRoster.wrs[0].name ) : null }
              </p>
              <p style={ numberOfWRs >= 2 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[1] ? (currentRoster.wrs[1].name  ) : null }
              </p>
              <p style={ numberOfWRs >= 3 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[2] ? (currentRoster.wrs[2].name  ) : null }
              </p>
              <p style={ numberOfWRs >= 4 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[3] ? (currentRoster.wrs[3].name  ) : null }
              </p>
              <p style={ numberOfWRs >= 5 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[4] ? (currentRoster.wrs[4].name  ) : null }
              </p>
              <p style={ numberOfWRs >= 6 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[5] ? (currentRoster.wrs[5].name  ) : null }
              </p>


              <p style={ numberOfRBs >= 1 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[0] ? (currentRoster.rbs[0].name ) : null }
              </p>
              <p style={ numberOfRBs >= 2 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[1] ? (currentRoster.rbs[1].name  ) : null }
              </p>
              <p style={ numberOfRBs >= 3 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[2] ? (currentRoster.rbs[2].name  ) : null }
              </p>
              <p style={ numberOfRBs >= 4 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[3] ? (currentRoster.rbs[3].name ) : null }
              </p>
              <p style={ numberOfRBs >= 5 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[4] ? (currentRoster.rbs[4].name  ) : null }
              </p>
              <p style={ numberOfRBs >= 6 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[5] ? (currentRoster.rbs[5].name  ) : null }
              </p>


              <p style={ numberOfTEs >= 1 ? {showStyle} : {display:'none'}}><b> TE </b>
              { currentRoster.tes[0] ? (currentRoster.tes[0].name ) : null }
              </p>
              <p style={ numberOfTEs >= 2 ? {showStyle} : {display:'none'}}><b> TE </b>
              { currentRoster.tes[1] ? (currentRoster.tes[1].name  ) : null }
              </p>
              <p style={ numberOfTEs >= 3 ? {showStyle} : {display:'none'}}><b> TE </b>
              { currentRoster.tes[2] ? (currentRoster.tes[2].name  ) : null }
              </p>
              <p style={ numberOfTEs >= 4 ? {showStyle} : {display:'none'}}><b> TE </b>
              { currentRoster.tes[3] ? (currentRoster.tes[3].name  ) : null }
              </p>


              <p style={ flexCount >= 1 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[0] ? (currentRoster.flex[0].name ) : null }
              </p>
              <p style={ flexCount >= 2 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[1] ? (currentRoster.flex[1].name  ) : null }
              </p>
              <p style={ flexCount >= 3 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[2] ? (currentRoster.flex[2].name  ) : null }
              </p>
              <p style={ flexCount >= 4 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[3] ? (currentRoster.flex[3].name  ) : null }
              </p>
              <p style={ flexCount >= 5 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[4] ? (currentRoster.flex[4].name ) : null }
              </p>
              <p style={ flexCount >= 6 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[5] ? (currentRoster.flex[5].name  ) : null }
              </p>
              <p style={ flexCount >= 7 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[6] ? (currentRoster.flex[6].name  ) : null }
              </p>
              <p style={ flexCount >= 8 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[7] ? (currentRoster.flex[7].name  ) : null }
              </p>
              <p style={ flexCount >= 9 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[8] ? (currentRoster.flex[8].name ) : null }
              </p>
              <p style={ flexCount >= 10 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[9] ? (currentRoster.flex[9].name  ) : null }
              </p>
              <p style={ flexCount >= 11 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[10] ? (currentRoster.flex[10].name  ) : null }
              </p>
              <p style={ flexCount >= 12 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[11] ? (currentRoster.flex[11].name  ) : null }
              </p>


              <p style={ numberOfDST >= 1 ? {showStyle} : {display:'none'}}><b> DST </b>
              { currentRoster.def[0] ? (currentRoster.def[0].name ) : null }
              </p>
              <p style={ numberOfDST >= 2 ? {showStyle} : {display:'none'}}><b> DST </b>
              { currentRoster.def[1] ? (currentRoster.def[1].name  ) : null }
              </p>
              <p style={ numberOfDST >= 3 ? {showStyle} : {display:'none'}}><b> DST</b>
              { currentRoster.def[2] ? (currentRoster.def[2].name  ) : null }
              </p>
              <p style={ numberOfDST >= 4 ? {showStyle} : {display:'none'}}><b> DST </b>
              { currentRoster.def[3] ? (currentRoster.def[3].name  ) : null }
              </p>


              <p style={ numberOfKickers >= 1 ? {showStyle} : {display:'none'}}><b> K </b>
              { currentRoster.k[0] ? (currentRoster.k[0].name ) : null }
              </p>
              <p style={ numberOfKickers >= 2 ? {showStyle} : {display:'none'}}><b> K </b>
              { currentRoster.k[1] ? (currentRoster.k[1].name  ) : null }
              </p>
              <p style={ numberOfKickers >= 3 ? {showStyle} : {display:'none'}}><b> K </b>
              { currentRoster.k[2] ? (currentRoster.k[2].name  ) : null }
              </p>
              <p style={ numberOfKickers >= 4 ? {showStyle} : {display:'none'}}><b> K </b>
              { currentRoster.k[3] ? (currentRoster.k[3].name  ) : null }
              </p>


              <h3 style={{color:'grey', fontSize :'18px'}}> Bench </h3>

              <p style={ benchCount >= 1 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[0] ?
                  (currentRoster.bench[0].name + currentRoster.bench[0].position ) : null } </p>
              <p style={ benchCount >= 2 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[1] ?
                  (currentRoster.bench[1].name + ' ' + currentRoster.bench[1].position ) : null } </p>
              <p style={ benchCount >= 3 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[2] ?
                  (currentRoster.bench[2].name + ' ' + currentRoster.bench[2].position ) : null } </p>
              <p style={ benchCount >= 4 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[3] ?
                  (currentRoster.bench[3].name + ' ' + currentRoster.bench[3].position ) : null } </p>
              <p style={ benchCount >= 5 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[4] ?
                  (currentRoster.bench[4].name + ' ' + currentRoster.bench[4].position ) : null } </p>
              <p style={ benchCount >= 6 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[5] ?
                  (currentRoster.bench[5].name + ' ' + currentRoster.bench[5].position ) : null } </p>
              <p style={ benchCount >= 7 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[6] ?
                  (currentRoster.bench[6].name + ' ' + currentRoster.bench[6].position ) : null } </p>
              <p style={ benchCount >= 8 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[7] ?
                  (currentRoster.bench[7].name + ' ' + currentRoster.bench[7].position ) : null } </p>
              <p style={ benchCount >= 9 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[8] ?
                  (currentRoster.bench[8].name + ' ' + currentRoster.bench[8].position ) : null } </p>
              <p style={ benchCount >= 10 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[9] ?
                  (currentRoster.bench[9].name + ' ' + currentRoster.bench[9].position ) : null } </p>


            </div>
          )
      }

      return (
        <div className='rostersDiv'>
          <ShowTeams />
          <TeamRoster />
        </div>
      )
    }
  }
  }


  export const mapStateToProps = ({teamReducer, draftPreferencesReducer, rostersReducer}) => {
    return ({
      showSettingsPage: draftPreferencesReducer.showSettingsPage,
      numberOfQBs: draftPreferencesReducer.numberOfQBs,
      numberOfWRs: draftPreferencesReducer.numberOfWRs,
      numberOfRBs: draftPreferencesReducer.numberOfRBs,
      numberOfTEs: draftPreferencesReducer.numberOfTEs,
      numberOfDST: draftPreferencesReducer.numberOfDST,
      numberOfKickers: draftPreferencesReducer.numberOfKickers,
      benchCount: draftPreferencesReducer.benchCount,
      numberOfWRsRBs: draftPreferencesReducer.numberOfWRsRBs,
      numberOfWRsTEs: draftPreferencesReducer.numberOfWRsTEs,
      numberOfRBsTEs: draftPreferencesReducer.numberOfRBsTEs,
      numberOfRBsWRsTEs: draftPreferencesReducer.numberOfRBsWRsTEs,
      numberOfQBsWRsRBsTEs: draftPreferencesReducer.numberOfQBsWRsRBsTEs,
      flexCount: draftPreferencesReducer.flexCount,
      teams: draftPreferencesReducer.teams,
      draftPos: draftPreferencesReducer.draftPos,
      menu: rostersReducer.menu,
      currentTeam: rostersReducer.currentTeam,
      teamNumber: rostersReducer.teamNumber
    })
  }
  export default connect (mapStateToProps)(TeamRosters)
