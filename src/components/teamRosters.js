  import React from 'react';
  import {connect} from 'react-redux';

  import {Button} from '../styledComponents/dropdown';
  import {TeamAbbr} from '../styledComponents/teamAbbr'

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
              ? <div className='teams-button'>
                  {teamNames}
                </div>
              : <Button dropBtn onClick={()=> this.displayMenu()}>
                <div className='teamBtn'>Team {teamNumber}
                  { currentTeam === teams[draftPos-1]
                    ? userIcon
                    : null }
                </div>
              { menu
                ? <i className="fas menu-arrow fa-chevron-up"></i>
                : <i className="fas menu-arrow fa-chevron-down"></i> }
              </Button> }
            </div>
          )
        }

        const TeamRoster = () => {
          let currentRoster = {qbs : [], wrs : [], rbs : [], tes : [], def : [], flex : [], k : [], bench : []}
          console.log(currentRoster)
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
              { currentRoster.qbs[0] ? (<span><TeamAbbr team={currentRoster.qbs[0].teamAbbr}> {currentRoster.qbs[0].teamAbbr} </TeamAbbr> {currentRoster.qbs[0].name}</span>) : null }
              </p>
              <p style={ numberOfQBs >= 2 ? {showStyle} : {display:'none'}}><b> QB </b>
              { currentRoster.qbs[1] ? (<span><TeamAbbr team={currentRoster.qbs[1].teamAbbr}> {currentRoster.qbs[1].teamAbbr} </TeamAbbr> {currentRoster.qbs[1].name}</span> ) : null }
              </p>
              <p style={ numberOfQBs >= 3 ? {showStyle} : {display:'none'}}><b> QB </b>
              { currentRoster.qbs[2] ? (<span><TeamAbbr team={currentRoster.qbs[2].teamAbbr}> {currentRoster.qbs[2].teamAbbr} </TeamAbbr> {currentRoster.qbs[2].name}</span> ) : null }
              </p>
              <p style={ numberOfQBs >= 4 ? {showStyle} : {display:'none'}}><b> QB </b>
              { currentRoster.qbs[3] ? (<span><TeamAbbr team={currentRoster.qbs[3].teamAbbr}> {currentRoster.qbs[3].teamAbbr} </TeamAbbr> {currentRoster.qbs[3].name}</span>  ) : null }
              </p>


              <p style={ numberOfWRs >= 1 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[0] ? (<span><TeamAbbr team={currentRoster.wrs[0].teamAbbr}> {currentRoster.wrs[0].teamAbbr} </TeamAbbr> {currentRoster.wrs[0].name}</span> ) : null }
              </p>
              <p style={ numberOfWRs >= 2 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[1] ? (<span><TeamAbbr team={currentRoster.wrs[1].teamAbbr}> {currentRoster.wrs[1].teamAbbr} </TeamAbbr> {currentRoster.wrs[1].name}</span>  ) : null }
              </p>
              <p style={ numberOfWRs >= 3 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[2] ? (<span><TeamAbbr team={currentRoster.wrs[2].teamAbbr}> {currentRoster.wrs[2].teamAbbr} </TeamAbbr> {currentRoster.wrs[2].name}</span>  ) : null }
              </p>
              <p style={ numberOfWRs >= 4 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[3] ? (<span><TeamAbbr team={currentRoster.wrs[3].teamAbbr}> {currentRoster.wrs[3].teamAbbr} </TeamAbbr> {currentRoster.wrs[3].name}</span>  ) : null }
              </p>
              <p style={ numberOfWRs >= 5 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[4] ? (<span><TeamAbbr team={currentRoster.wrs[4].teamAbbr}> {currentRoster.wrs[4].teamAbbr} </TeamAbbr> {currentRoster.wrs[4].name}</span>  ) : null }
              </p>
              <p style={ numberOfWRs >= 6 ? {showStyle} : {display:'none'}}><b> WR </b>
              { currentRoster.wrs[5] ? (<span><TeamAbbr team={currentRoster.wrs[5].teamAbbr}> {currentRoster.wrs[5].teamAbbr} </TeamAbbr> {currentRoster.wrs[5].name}</span>  ) : null }
              </p>


              <p style={ numberOfRBs >= 1 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[0] ? (<span><TeamAbbr team={currentRoster.rbs[0].teamAbbr}> {currentRoster.rbs[0].teamAbbr} </TeamAbbr> {currentRoster.rbs[0].name}</span> ) : null }
              </p>
              <p style={ numberOfRBs >= 2 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[1] ? (<span><TeamAbbr team={currentRoster.rbs[1].teamAbbr}> {currentRoster.rbs[1].teamAbbr} </TeamAbbr> {currentRoster.rbs[1].name}</span>  ) : null }
              </p>
              <p style={ numberOfRBs >= 3 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[2] ? (<span><TeamAbbr team={currentRoster.rbs[2].teamAbbr}> {currentRoster.rbs[2].teamAbbr} </TeamAbbr> {currentRoster.rbs[2].name}</span>  ) : null }
              </p>
              <p style={ numberOfRBs >= 4 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[3] ? (<span><TeamAbbr team={currentRoster.rbs[3].teamAbbr}> {currentRoster.rbs[3].teamAbbr} </TeamAbbr> {currentRoster.rbs[3].name}</span> ) : null }
              </p>
              <p style={ numberOfRBs >= 5 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[4] ? (<span><TeamAbbr team={currentRoster.rbs[4].teamAbbr}> {currentRoster.rbs[4].teamAbbr} </TeamAbbr> {currentRoster.rbs[4].name}</span>  ) : null }
              </p>
              <p style={ numberOfRBs >= 6 ? {showStyle} : {display:'none'}}><b> RB </b>
              { currentRoster.rbs[5] ? (<span><TeamAbbr team={currentRoster.rbs[5].teamAbbr}> {currentRoster.rbs[5].teamAbbr} </TeamAbbr> {currentRoster.rbs[5].name}</span>  ) : null }
              </p>


              <p style={ numberOfTEs >= 1 ? {showStyle} : {display:'none'}}><b> TE </b>
              { currentRoster.tes[0] ? (<span><TeamAbbr team={currentRoster.tes[0].teamAbbr}> {currentRoster.tes[0].teamAbbr} </TeamAbbr> {currentRoster.tes[0].name}</span> ) : null }
              </p>
              <p style={ numberOfTEs >= 2 ? {showStyle} : {display:'none'}}><b> TE </b>
              { currentRoster.tes[1] ? (<span><TeamAbbr team={currentRoster.tes[1].teamAbbr}> {currentRoster.tes[1].teamAbbr} </TeamAbbr> {currentRoster.tes[1].name}</span>  ) : null }
              </p>
              <p style={ numberOfTEs >= 3 ? {showStyle} : {display:'none'}}><b> TE </b>
              { currentRoster.tes[2] ? (<span><TeamAbbr team={currentRoster.tes[2].teamAbbr}> {currentRoster.tes[2].teamAbbr} </TeamAbbr> {currentRoster.tes[2].name}</span>  ) : null }
              </p>
              <p style={ numberOfTEs >= 4 ? {showStyle} : {display:'none'}}><b> TE </b>
              { currentRoster.tes[3] ? (<span><TeamAbbr team={currentRoster.tes[3].teamAbbr}> {currentRoster.tes[3].teamAbbr} </TeamAbbr> {currentRoster.tes[3].name}</span>  ) : null }
              </p>


              <p style={ flexCount >= 1 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[0] ? (<span><TeamAbbr team={currentRoster.flex[0].teamAbbr}> {currentRoster.flex[0].teamAbbr} </TeamAbbr> {currentRoster.flex[0].name}</span> ) : null }
              </p>
              <p style={ flexCount >= 2 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[1] ? (<span><TeamAbbr team={currentRoster.flex[1].teamAbbr}> {currentRoster.flex[1].teamAbbr} </TeamAbbr> {currentRoster.flex[1].name}</span>  ) : null }
              </p>
              <p style={ flexCount >= 3 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[2] ? (<span><TeamAbbr team={currentRoster.flex[2].teamAbbr}> {currentRoster.flex[2].teamAbbr} </TeamAbbr> {currentRoster.flex[2].name}</span>  ) : null }
              </p>
              <p style={ flexCount >= 4 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[3] ? (<span><TeamAbbr team={currentRoster.flex[3].teamAbbr}> {currentRoster.flex[3].teamAbbr} </TeamAbbr> {currentRoster.flex[3].name}</span>  ) : null }
              </p>
              <p style={ flexCount >= 5 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[4] ? (<span><TeamAbbr team={currentRoster.flex[4].teamAbbr}> {currentRoster.flex[4].teamAbbr} </TeamAbbr> {currentRoster.flex[4].name}</span> ) : null }
              </p>
              <p style={ flexCount >= 6 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[5] ? (<span><TeamAbbr team={currentRoster.flex[5].teamAbbr}> {currentRoster.flex[5].teamAbbr} </TeamAbbr> {currentRoster.flex[5].name}</span>  ) : null }
              </p>
              <p style={ flexCount >= 7 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[6] ? (<span><TeamAbbr team={currentRoster.flex[6].teamAbbr}> {currentRoster.flex[6].teamAbbr} </TeamAbbr> {currentRoster.flex[6].name}</span>  ) : null }
              </p>
              <p style={ flexCount >= 8 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[7] ? (<span><TeamAbbr team={currentRoster.flex[7].teamAbbr}> {currentRoster.flex[7].teamAbbr} </TeamAbbr> {currentRoster.flex[7].name}</span>  ) : null }
              </p>
              <p style={ flexCount >= 9 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[8] ? (<span><TeamAbbr team={currentRoster.flex[8].teamAbbr}> {currentRoster.flex[8].teamAbbr} </TeamAbbr> {currentRoster.flex[8].name}</span> ) : null }
              </p>
              <p style={ flexCount >= 10 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[9] ? (<span><TeamAbbr team={currentRoster.flex[9].teamAbbr}> {currentRoster.flex[9].teamAbbr} </TeamAbbr> {currentRoster.flex[9].name}</span>  ) : null }
              </p>
              <p style={ flexCount >= 11 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[10] ? (<span><TeamAbbr team={currentRoster.flex[10].teamAbbr}> {currentRoster.flex[10].teamAbbr} </TeamAbbr> {currentRoster.flex[10].name}</span>  ) : null }
              </p>
              <p style={ flexCount >= 12 ? {showStyle} : {display:'none'}}><b> FLX </b>
              { currentRoster.flex[11] ? (<span><TeamAbbr team={currentRoster.flex[11].teamAbbr}> {currentRoster.flex[11].teamAbbr} </TeamAbbr> {currentRoster.flex[11].name}</span>  ) : null }
              </p>


              <p style={ numberOfDST >= 1 ? {showStyle} : {display:'none'}}><b> DST </b>
              { currentRoster.def[0] ? (<span><TeamAbbr team={currentRoster.def[0].teamAbbr}> {currentRoster.def[0].teamAbbr} </TeamAbbr> {currentRoster.def[0].name}</span> ) : null }
              </p>
              <p style={ numberOfDST >= 2 ? {showStyle} : {display:'none'}}><b> DST </b>
              { currentRoster.def[1] ? (<span><TeamAbbr team={currentRoster.def[1].teamAbbr}> {currentRoster.def[1].teamAbbr} </TeamAbbr> {currentRoster.def[1].name}</span>  ) : null }
              </p>
              <p style={ numberOfDST >= 3 ? {showStyle} : {display:'none'}}><b> DST</b>
              { currentRoster.def[2] ? (<span><TeamAbbr team={currentRoster.def[2].teamAbbr}> {currentRoster.def[2].teamAbbr} </TeamAbbr> {currentRoster.def[2].name}</span>  ) : null }
              </p>
              <p style={ numberOfDST >= 4 ? {showStyle} : {display:'none'}}><b> DST </b>
              { currentRoster.def[3] ? (<span><TeamAbbr team={currentRoster.def[3].teamAbbr}> {currentRoster.def[3].teamAbbr} </TeamAbbr> {currentRoster.def[3].name}</span>  ) : null }
              </p>


              <p style={ numberOfKickers >= 1 ? {showStyle} : {display:'none'}}><b> K </b>
              { currentRoster.k[0] ? (<span><TeamAbbr team={currentRoster.k[0].teamAbbr}> {currentRoster.k[0].teamAbbr} </TeamAbbr> {currentRoster.k[0].name}</span> ) : null }
              </p>
              <p style={ numberOfKickers >= 2 ? {showStyle} : {display:'none'}}><b> K </b>
              { currentRoster.k[1] ? (<span><TeamAbbr team={currentRoster.k[1].teamAbbr}> {currentRoster.k[1].teamAbbr} </TeamAbbr> {currentRoster.k[1].name}</span>  ) : null }
              </p>
              <p style={ numberOfKickers >= 3 ? {showStyle} : {display:'none'}}><b> K </b>
              { currentRoster.k[2] ? (<span><TeamAbbr team={currentRoster.k[2].teamAbbr}> {currentRoster.k[2].teamAbbr} </TeamAbbr> {currentRoster.k[2].name}</span>  ) : null }
              </p>
              <p style={ numberOfKickers >= 4 ? {showStyle} : {display:'none'}}><b> K </b>
              { currentRoster.k[3] ? (<span><TeamAbbr team={currentRoster.k[3].teamAbbr}> {currentRoster.k[3].teamAbbr} </TeamAbbr> {currentRoster.k[3].name}</span>  ) : null }
              </p>


              <h3 style={{color:'grey', fontSize :'18px'}}> Bench </h3>

              <p style={ benchCount >= 1 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[0] ?
                  (<span><TeamAbbr team={currentRoster.bench[0].teamAbbr}> {currentRoster.bench[0].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[0].position} </b> {currentRoster.bench[0].name} </span> )
                    : null } </p>
              <p style={ benchCount >= 2 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[1] ?
                  (<span><TeamAbbr team={currentRoster.bench[1].teamAbbr}> {currentRoster.bench[1].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[1].position} </b> {currentRoster.bench[1].name} </span> )
                  : null } </p>
              <p style={ benchCount >= 3 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[2] ?
                  (<span><TeamAbbr team={currentRoster.bench[2].teamAbbr}> {currentRoster.bench[2].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[2].position} </b> {currentRoster.bench[2].name} </span> )
                  : null } </p>
              <p style={ benchCount >= 4 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[3] ?
                  (<span><TeamAbbr team={currentRoster.bench[3].teamAbbr}> {currentRoster.bench[3].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[3].position} </b> {currentRoster.bench[3].name} </span> )
                  : null } </p>
              <p style={ benchCount >= 5 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[4] ?
                  (<span><TeamAbbr team={currentRoster.bench[4].teamAbbr}> {currentRoster.bench[4].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[4].position} </b> {currentRoster.bench[4].name} </span> )
                  : null } </p>
              <p style={ benchCount >= 6 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[5] ?
                  (<span><TeamAbbr team={currentRoster.bench[5].teamAbbr}> {currentRoster.bench[5].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[5].position} </b> {currentRoster.bench[5].name} </span> )
                  : null } </p>
              <p style={ benchCount >= 7 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[6] ?
                  (<span><TeamAbbr team={currentRoster.bench[6].teamAbbr}> {currentRoster.bench[6].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[6].position} </b> {currentRoster.bench[6].name} </span> )
                  : null } </p>
              <p style={ benchCount >= 8 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[7] ?
                  (<span><TeamAbbr team={currentRoster.bench[7].teamAbbr}> {currentRoster.bench[7].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[7].position} </b> {currentRoster.bench[7].name} </span> )
                  : null } </p>
              <p style={ benchCount >= 9 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[8] ?
                  (<span><TeamAbbr team={currentRoster.bench[8].teamAbbr}> {currentRoster.bench[8].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[8].position} </b> {currentRoster.bench[8].name} </span> )
                  : null } </p>
              <p style={ benchCount >= 10 ? {showStyle} : {display:'none'}}><b> BN </b>
                { currentRoster.bench[9] ?
                  (<span><TeamAbbr team={currentRoster.bench[9].teamAbbr}> {currentRoster.bench[9].teamAbbr} </TeamAbbr>
                    <b className='reserves'> {currentRoster.bench[9].position} </b> {currentRoster.bench[9].name} </span> )
                  : null } </p>


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
