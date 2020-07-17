import React from 'react';
import { connect } from 'react-redux';

import { Button } from '../../styledComponents/dropdown';
import { TeamAbbr } from '../../styledComponents/teamAbbr';

import {
  showTeamMenu,
  hideTeamMenu,
  showCurrentTeam
} from '../../actions/showActions'

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

  render() {
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

    if (showSettingsPage) {
      return null
    }

    //this entire component will be adjusted soon. It's a little crazy right now. We're simply pushing
    //the players that are drafted into the appropriate place. If that number specific to a position is full,
    //then if one of the flex spots is appropriate we push it to the flex, and then we push them to the bench.
    //Will probably update this to an action creator and pass it to the reducer and just use this component
    //for rendering.

    else if (!showSettingsPage) {

      const ShowTeams = () => {
        let userIcon = <i className="fas fa-user"></i>
        let teamNames = teams.map((team, index) => (
          <div key={index}>
            <Button dropBtn onClick={() => this.displayCurrentTeam(team, index + 1)}>
              <div>Team {index + 1}</div>
              <div>{index === draftPos - 1
                  ? userIcon
                  : null}
              </div>
            </Button>
          </div>
        ))
        return (
          <div className='teamDropdown positionBtn'>
            {menu
              ? <div className='teams-button'>
                {teamNames}
              </div>
              : <Button dropBtn onClick={() => this.displayMenu()}>
                <div className='teamBtn'>Team {teamNumber}
                  {currentTeam === teams[draftPos - 1]
                    ? userIcon
                    : null}
                </div>
                <div className='cevron-up-down'>
                {menu
                  ? <i className="fas menu-arrow fa-chevron-up"></i>
                  : <i className="fas menu-arrow fa-chevron-down"></i>}
                </div>
              </Button>}
          </div>
        )
      }

      const TeamRoster = () => {
        let currentRoster = { qbs: [], wrs: [], rbs: [], tes: [], def: [], flex: [], k: [], bench: [] }
        for (let i = 0; i < currentTeam.length; i++) {
          if (currentTeam[i].position === 'QB') {
            currentRoster.qbs.push(currentTeam[i])
            if (currentRoster.qbs.length > numberOfQBs && currentRoster.flex.length <= flexCount && numberOfQBsWRsRBsTEs >= 1) {
              currentRoster.flex.push(currentTeam[i])
            }
            if (currentRoster.qbs.length > numberOfQBs && currentRoster.flex.length > flexCount) {
              currentRoster.bench.push(currentTeam[i])
            }
          }
          if (currentTeam[i].position === 'WR') {
            currentRoster.wrs.push(currentTeam[i])
            if (currentRoster.wrs.length > numberOfWRs && currentRoster.flex.length <= flexCount && (numberOfRBsWRsTEs >= 1 || numberOfWRsTEs >= 1 || numberOfWRsRBs >= 1 || numberOfQBsWRsRBsTEs >= 1)) {
              currentRoster.flex.push(currentTeam[i])
            }
            if (currentRoster.wrs.length > numberOfWRs && currentRoster.flex.length > flexCount) {
              currentRoster.bench.push(currentTeam[i])
            }
          }

          if (currentTeam[i].position === 'TE') {
            currentRoster.tes.push(currentTeam[i])
            if (currentRoster.tes.length > numberOfTEs && currentRoster.flex.length <= flexCount && (numberOfRBsTEs >= 1 || numberOfWRsTEs >= 1 || numberOfRBsWRsTEs >= 1 || numberOfQBsWRsRBsTEs >= 1)) {
              currentRoster.flex.push(currentTeam[i])
            }
            if (currentRoster.tes.length > numberOfTEs && currentRoster.flex.length > flexCount) {
              currentRoster.bench.push(currentTeam[i])
            }
          }

          if (currentTeam[i].position === 'RB') {
            currentRoster.rbs.push(currentTeam[i])
            if (currentRoster.rbs.length > numberOfRBs && currentRoster.flex.length <= flexCount && (numberOfRBsWRsTEs >= 1 || numberOfRBsTEs >= 1 || numberOfWRsRBs >= 1 || numberOfQBsWRsRBsTEs >= 1)) {
              currentRoster.flex.push(currentTeam[i])
            }
            if (currentRoster.rbs.length > numberOfRBs && currentRoster.flex.length > flexCount) {
              currentRoster.bench.push(currentTeam[i])
            }
          }

          if (currentTeam[i].position === 'DEF') {
            currentRoster.def.push(currentTeam[i])
            if (currentRoster.def.length > numberOfDST) {
              currentRoster.bench.push(currentTeam[i])
            }
          }
          if (currentTeam[i].position === 'K') {
            currentRoster.k.push(currentTeam[i])
            if (currentRoster.k.length > numberOfKickers) {
              currentRoster.bench.push(currentTeam[i])
            }
          }

        }
        let showStyle = { display: 'inline' };

        return (
          <div className='rosterPlayers'>
            <p style={numberOfQBs >= 1 ? { showStyle } : { display: 'none' }}><b> QB </b>
              {currentRoster.qbs[0] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.qbs[0].team}> {currentRoster.qbs[0].team} </TeamAbbr> {currentRoster.qbs[0].displayName}</span>) : null}
            </p>
            <p style={numberOfQBs >= 2 ? { showStyle } : { display: 'none' }}><b> QB </b>
              {currentRoster.qbs[1] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.qbs[1].team}> {currentRoster.qbs[1].team} </TeamAbbr> {currentRoster.qbs[1].displayName}</span>) : null}
            </p>
            <p style={numberOfQBs >= 3 ? { showStyle } : { display: 'none' }}><b> QB </b>
              {currentRoster.qbs[2] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.qbs[2].team}> {currentRoster.qbs[2].team} </TeamAbbr> {currentRoster.qbs[2].displayName}</span>) : null}
            </p>
            <p style={numberOfQBs >= 4 ? { showStyle } : { display: 'none' }}><b> QB </b>
              {currentRoster.qbs[3] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.qbs[3].team}> {currentRoster.qbs[3].team} </TeamAbbr> {currentRoster.qbs[3].displayName}</span>) : null}
            </p>


            <p style={numberOfWRs >= 1 ? { showStyle } : { display: 'none' }}><b> WR </b>
              {currentRoster.wrs[0] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.wrs[0].team}> {currentRoster.wrs[0].team} </TeamAbbr> {currentRoster.wrs[0].displayName}</span>) : null}
            </p>
            <p style={numberOfWRs >= 2 ? { showStyle } : { display: 'none' }}><b> WR </b>
              {currentRoster.wrs[1] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.wrs[1].team}> {currentRoster.wrs[1].team} </TeamAbbr> {currentRoster.wrs[1].displayName}</span>) : null}
            </p>
            <p style={numberOfWRs >= 3 ? { showStyle } : { display: 'none' }}><b> WR </b>
              {currentRoster.wrs[2] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.wrs[2].team}> {currentRoster.wrs[2].team} </TeamAbbr> {currentRoster.wrs[2].displayName}</span>) : null}
            </p>
            <p style={numberOfWRs >= 4 ? { showStyle } : { display: 'none' }}><b> WR </b>
              {currentRoster.wrs[3] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.wrs[3].team}> {currentRoster.wrs[3].team} </TeamAbbr> {currentRoster.wrs[3].displayName}</span>) : null}
            </p>
            <p style={numberOfWRs >= 5 ? { showStyle } : { display: 'none' }}><b> WR </b>
              {currentRoster.wrs[4] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.wrs[4].team}> {currentRoster.wrs[4].team} </TeamAbbr> {currentRoster.wrs[4].displayName}</span>) : null}
            </p>
            <p style={numberOfWRs >= 6 ? { showStyle } : { display: 'none' }}><b> WR </b>
              {currentRoster.wrs[5] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.wrs[5].team}> {currentRoster.wrs[5].team} </TeamAbbr> {currentRoster.wrs[5].displayName}</span>) : null}
            </p>


            <p style={numberOfRBs >= 1 ? { showStyle } : { display: 'none' }}><b> RB </b>
              {currentRoster.rbs[0] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.rbs[0].team}> {currentRoster.rbs[0].team} </TeamAbbr> {currentRoster.rbs[0].displayName}</span>) : null}
            </p>
            <p style={numberOfRBs >= 2 ? { showStyle } : { display: 'none' }}><b> RB </b>
              {currentRoster.rbs[1] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.rbs[1].team}> {currentRoster.rbs[1].team} </TeamAbbr> {currentRoster.rbs[1].displayName}</span>) : null}
            </p>
            <p style={numberOfRBs >= 3 ? { showStyle } : { display: 'none' }}><b> RB </b>
              {currentRoster.rbs[2] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.rbs[2].team}> {currentRoster.rbs[2].team} </TeamAbbr> {currentRoster.rbs[2].displayName}</span>) : null}
            </p>
            <p style={numberOfRBs >= 4 ? { showStyle } : { display: 'none' }}><b> RB </b>
              {currentRoster.rbs[3] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.rbs[3].team}> {currentRoster.rbs[3].team} </TeamAbbr> {currentRoster.rbs[3].displayName}</span>) : null}
            </p>
            <p style={numberOfRBs >= 5 ? { showStyle } : { display: 'none' }}><b> RB </b>
              {currentRoster.rbs[4] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.rbs[4].team}> {currentRoster.rbs[4].team} </TeamAbbr> {currentRoster.rbs[4].displayName}</span>) : null}
            </p>
            <p style={numberOfRBs >= 6 ? { showStyle } : { display: 'none' }}><b> RB </b>
              {currentRoster.rbs[5] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.rbs[5].team}> {currentRoster.rbs[5].team} </TeamAbbr> {currentRoster.rbs[5].displayName}</span>) : null}
            </p>


            <p style={numberOfTEs >= 1 ? { showStyle } : { display: 'none' }}><b> TE </b>
              {currentRoster.tes[0] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.tes[0].team}> {currentRoster.tes[0].team} </TeamAbbr> {currentRoster.tes[0].displayName}</span>) : null}
            </p>
            <p style={numberOfTEs >= 2 ? { showStyle } : { display: 'none' }}><b> TE </b>
              {currentRoster.tes[1] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.tes[1].team}> {currentRoster.tes[1].team} </TeamAbbr> {currentRoster.tes[1].displayName}</span>) : null}
            </p>
            <p style={numberOfTEs >= 3 ? { showStyle } : { display: 'none' }}><b> TE </b>
              {currentRoster.tes[2] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.tes[2].team}> {currentRoster.tes[2].team} </TeamAbbr> {currentRoster.tes[2].displayName}</span>) : null}
            </p>
            <p style={numberOfTEs >= 4 ? { showStyle } : { display: 'none' }}><b> TE </b>
              {currentRoster.tes[3] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.tes[3].team}> {currentRoster.tes[3].team} </TeamAbbr> {currentRoster.tes[3].displayName}</span>) : null}
            </p>


            <p style={flexCount >= 1 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[0] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[0].team}> {currentRoster.flex[0].team} </TeamAbbr> {currentRoster.flex[0].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 2 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[1] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[1].team}> {currentRoster.flex[1].team} </TeamAbbr> {currentRoster.flex[1].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 3 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[2] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[2].team}> {currentRoster.flex[2].team} </TeamAbbr> {currentRoster.flex[2].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 4 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[3] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[3].team}> {currentRoster.flex[3].team} </TeamAbbr> {currentRoster.flex[3].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 5 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[4] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[4].team}> {currentRoster.flex[4].team} </TeamAbbr> {currentRoster.flex[4].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 6 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[5] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[5].team}> {currentRoster.flex[5].team} </TeamAbbr> {currentRoster.flex[5].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 7 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[6] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[6].team}> {currentRoster.flex[6].team} </TeamAbbr> {currentRoster.flex[6].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 8 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[7] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[7].team}> {currentRoster.flex[7].team} </TeamAbbr> {currentRoster.flex[7].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 9 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[8] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[8].team}> {currentRoster.flex[8].team} </TeamAbbr> {currentRoster.flex[8].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 10 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[9] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[9].team}> {currentRoster.flex[9].team} </TeamAbbr> {currentRoster.flex[9].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 11 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[10] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[10].team}> {currentRoster.flex[10].team} </TeamAbbr> {currentRoster.flex[10].displayName}</span>) : null}
            </p>
            <p style={flexCount >= 12 ? { showStyle } : { display: 'none' }}><b> FLX </b>
              {currentRoster.flex[11] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.flex[11].team}> {currentRoster.flex[11].team} </TeamAbbr> {currentRoster.flex[11].displayName}</span>) : null}
            </p>


            <p style={numberOfDST >= 1 ? { showStyle } : { display: 'none' }}><b> DST </b>
              {currentRoster.def[0] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.def[0].team}> {currentRoster.def[0].team} </TeamAbbr> {currentRoster.def[0].displayName}</span>) : null}
            </p>
            <p style={numberOfDST >= 2 ? { showStyle } : { display: 'none' }}><b> DST </b>
              {currentRoster.def[1] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.def[1].team}> {currentRoster.def[1].team} </TeamAbbr> {currentRoster.def[1].displayName}</span>) : null}
            </p>
            <p style={numberOfDST >= 3 ? { showStyle } : { display: 'none' }}><b> DST</b>
              {currentRoster.def[2] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.def[2].team}> {currentRoster.def[2].team} </TeamAbbr> {currentRoster.def[2].displayName}</span>) : null}
            </p>
            <p style={numberOfDST >= 4 ? { showStyle } : { display: 'none' }}><b> DST </b>
              {currentRoster.def[3] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.def[3].team}> {currentRoster.def[3].team} </TeamAbbr> {currentRoster.def[3].displayName}</span>) : null}
            </p>


            <p style={numberOfKickers >= 1 ? { showStyle } : { display: 'none' }}><b> K </b>
              {currentRoster.k[0] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.k[0].team}> {currentRoster.k[0].team} </TeamAbbr> {currentRoster.k[0].displayName}</span>) : null}
            </p>
            <p style={numberOfKickers >= 2 ? { showStyle } : { display: 'none' }}><b> K </b>
              {currentRoster.k[1] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.k[1].team}> {currentRoster.k[1].team} </TeamAbbr> {currentRoster.k[1].displayName}</span>) : null}
            </p>
            <p style={numberOfKickers >= 3 ? { showStyle } : { display: 'none' }}><b> K </b>
              {currentRoster.k[2] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.k[2].team}> {currentRoster.k[2].team} </TeamAbbr> {currentRoster.k[2].displayName}</span>) : null}
            </p>
            <p style={numberOfKickers >= 4 ? { showStyle } : { display: 'none' }}><b> K </b>
              {currentRoster.k[3] ? (<span className='rostered-player'><TeamAbbr team={currentRoster.k[3].team}> {currentRoster.k[3].team} </TeamAbbr> {currentRoster.k[3].displayName}</span>) : null}
            </p>


            <h3 style={{ color: 'grey', fontSize: '18px' }}> Bench </h3>

            <p style={benchCount >= 1 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[0] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[0].team}> {currentRoster.bench[0].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[0].position} </b> {currentRoster.bench[0].displayName} </span>)
                : null} </p>
            <p style={benchCount >= 2 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[1] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[1].team}> {currentRoster.bench[1].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[1].position} </b> {currentRoster.bench[1].displayName} </span>)
                : null} </p>
            <p style={benchCount >= 3 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[2] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[2].team}> {currentRoster.bench[2].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[2].position} </b> {currentRoster.bench[2].displayName} </span>)
                : null} </p>
            <p style={benchCount >= 4 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[3] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[3].team}> {currentRoster.bench[3].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[3].position} </b> {currentRoster.bench[3].displayName} </span>)
                : null} </p>
            <p style={benchCount >= 5 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[4] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[4].team}> {currentRoster.bench[4].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[4].position} </b> {currentRoster.bench[4].displayName} </span>)
                : null} </p>
            <p style={benchCount >= 6 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[5] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[5].team}> {currentRoster.bench[5].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[5].position} </b> {currentRoster.bench[5].displayName} </span>)
                : null} </p>
            <p style={benchCount >= 7 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[6] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[6].team}> {currentRoster.bench[6].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[6].position} </b> {currentRoster.bench[6].displayName} </span>)
                : null} </p>
            <p style={benchCount >= 8 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[7] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[7].team}> {currentRoster.bench[7].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[7].position} </b> {currentRoster.bench[7].displayName} </span>)
                : null} </p>
            <p style={benchCount >= 9 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[8] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[8].team}> {currentRoster.bench[8].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[8].position} </b> {currentRoster.bench[8].displayName} </span>)
                : null} </p>
            <p style={benchCount >= 10 ? { showStyle } : { display: 'none' }}><b> BN </b>
              {currentRoster.bench[9] ?
                (<span className='rostered-player'><TeamAbbr team={currentRoster.bench[9].team}> {currentRoster.bench[9].team} </TeamAbbr>
                  <b className='reserves'> {currentRoster.bench[9].position} </b> {currentRoster.bench[9].displayName} </span>)
                : null} </p>


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


export const mapStateToProps = ({ teamReducer, draftPreferencesReducer, rostersReducer }) => {
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
export default connect(mapStateToProps)(TeamRosters)
