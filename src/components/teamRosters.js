import React from 'react';
import {connect} from 'react-redux';

class TeamRosters extends React.Component {

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
      draftPos
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
    const Team1Roster = () => {
      let myTeam = teams[draftPos-1]
      let myRoster = {qbs : [], wrs : [], rbs : [], tes : [], def : [], flex : [], k : [], bench : []}
      console.log(teams, myRoster, myTeam)
      for(let i=0; i< myTeam.length; i++){
        if (myTeam[i].position === 'QB'){
          myRoster.qbs.push(myTeam[i])
            if (myRoster.qbs.length > numberOfQBs && myRoster.flex.length <= flexCount && numberOfQBsWRsRBsTEs >= 1){
              myRoster.flex.push(myTeam[i])
            }
            if (myRoster.qbs.length > numberOfQBs && myRoster.flex.length > flexCount){
              myRoster.bench.push(myTeam[i])
          }
        }
        if (myTeam[i].position === 'WR'){
          myRoster.wrs.push(myTeam[i])
            if (myRoster.wrs.length > numberOfWRs && myRoster.flex.length <= flexCount && (numberOfRBsWRsTEs >= 1 || numberOfWRsTEs >= 1 || numberOfWRsRBs >= 1 || numberOfQBsWRsRBsTEs >= 1)) {
              myRoster.flex.push(myTeam[i])
            }
            if (myRoster.wrs.length > numberOfWRs && myRoster.flex.length > flexCount){
              myRoster.bench.push(myTeam[i])
          }
        }

        if (myTeam[i].position === 'TE'){
          myRoster.tes.push(myTeam[i])
            if (myRoster.tes.length > numberOfTEs && myRoster.flex.length <= flexCount && (numberOfRBsTEs >= 1 || numberOfWRsTEs >=1 || numberOfRBsWRsTEs >=1 || numberOfQBsWRsRBsTEs >= 1)) {
              myRoster.flex.push(myTeam[i])
            }
            if (myRoster.tes.length > numberOfTEs && myRoster.flex.length > flexCount){
              myRoster.bench.push(myTeam[i])
          }
        }

        if (myTeam[i].position === 'RB'){
          myRoster.rbs.push(myTeam[i])
          if (myRoster.rbs.length > numberOfRBs && myRoster.flex.length <= flexCount && (numberOfRBsWRsTEs >= 1 || numberOfRBsTEs >= 1 || numberOfWRsRBs >= 1 || numberOfQBsWRsRBsTEs >= 1)) {
            myRoster.flex.push(myTeam[i])
            //console.log(myRoster)
          }
          if (myRoster.rbs.length > numberOfRBs && myRoster.flex.length > flexCount){
            myRoster.bench.push(myTeam[i])
            //console.log(myRoster.bench, 'plum', myRoster.flex)
          }
        }

        if (myTeam[i].position === 'DEF'){
          myRoster.def.push(myTeam[i])
          if (myRoster.def.length > numberOfDST){
            myRoster.bench.push(myTeam[i])
          }
        }
        if (myTeam[i].position ==='K'){
          myRoster.k.push(myTeam[i])
          if (myRoster.k.length > numberOfKickers){
            myRoster.bench.push(myTeam[i])
          }
        }

      }
      let showStyle = {display: 'inline'};

        return (
          <div className='rosterPlayers'>
            <p style={ numberOfQBs >= 1 ? {showStyle} : {display:'none'}}><b> QB </b>
            { myRoster.qbs[0] ? (myRoster.qbs[0].firstName + ' ' + myRoster.qbs[0].lastName ) : null }
            </p>
            <p style={ numberOfQBs >= 2 ? {showStyle} : {display:'none'}}><b> QB </b>
            { myRoster.qbs[1] ? (myRoster.qbs[1].firstName + ' ' + myRoster.qbs[1].lastName  ) : null }
            </p>
            <p style={ numberOfQBs >= 3 ? {showStyle} : {display:'none'}}><b> QB </b>
            { myRoster.qbs[2] ? (myRoster.qbs[2].firstName + ' ' + myRoster.qbs[2].lastName  ) : null }
            </p>
            <p style={ numberOfQBs >= 4 ? {showStyle} : {display:'none'}}><b> QB </b>
            { myRoster.qbs[3] ? (myRoster.qbs[3].firstName + ' ' + myRoster.qbs[3].lastName  ) : null }
            </p>


            <p style={ numberOfWRs >= 1 ? {showStyle} : {display:'none'}}><b> WR </b>
            { myRoster.wrs[0] ? (myRoster.wrs[0].firstName + ' ' + myRoster.wrs[0].lastName ) : null }
            </p>
            <p style={ numberOfWRs >= 2 ? {showStyle} : {display:'none'}}><b> WR </b>
            { myRoster.wrs[1] ? (myRoster.wrs[1].firstName + ' ' + myRoster.wrs[1].lastName  ) : null }
            </p>
            <p style={ numberOfWRs >= 3 ? {showStyle} : {display:'none'}}><b> WR </b>
            { myRoster.wrs[2] ? (myRoster.wrs[2].firstName + ' ' + myRoster.wrs[2].lastName  ) : null }
            </p>
            <p style={ numberOfWRs >= 4 ? {showStyle} : {display:'none'}}><b> WR </b>
            { myRoster.wrs[3] ? (myRoster.wrs[3].firstName + ' ' + myRoster.wrs[3].lastName  ) : null }
            </p>
            <p style={ numberOfWRs >= 5 ? {showStyle} : {display:'none'}}><b> WR </b>
            { myRoster.wrs[4] ? (myRoster.wrs[4].firstName + ' ' + myRoster.wrs[4].lastName  ) : null }
            </p>
            <p style={ numberOfWRs >= 6 ? {showStyle} : {display:'none'}}><b> WR </b>
            { myRoster.wrs[5] ? (myRoster.wrs[5].firstName + ' ' + myRoster.wrs[5].lastName  ) : null }
            </p>


            <p style={ numberOfRBs >= 1 ? {showStyle} : {display:'none'}}><b> RB </b>
            { myRoster.rbs[0] ? (myRoster.rbs[0].firstName + ' ' + myRoster.rbs[0].lastName ) : null }
            </p>
            <p style={ numberOfRBs >= 2 ? {showStyle} : {display:'none'}}><b> RB </b>
            { myRoster.rbs[1] ? (myRoster.rbs[1].firstName + ' ' + myRoster.rbs[1].lastName  ) : null }
            </p>
            <p style={ numberOfRBs >= 3 ? {showStyle} : {display:'none'}}><b> RB </b>
            { myRoster.rbs[2] ? (myRoster.rbs[2].firstName + ' ' + myRoster.rbs[2].lastName  ) : null }
            </p>
            <p style={ numberOfRBs >= 4 ? {showStyle} : {display:'none'}}><b> RB </b>
            { myRoster.rbs[3] ? (myRoster.rbs[3].firstName + ' ' + myRoster.rbs[3].lastName  ) : null }
            </p>
            <p style={ numberOfRBs >= 5 ? {showStyle} : {display:'none'}}><b> RB </b>
            { myRoster.rbs[4] ? (myRoster.rbs[4].firstName + ' ' + myRoster.rbs[4].lastName  ) : null }
            </p>
            <p style={ numberOfRBs >= 6 ? {showStyle} : {display:'none'}}><b> RB </b>
            { myRoster.rbs[5] ? (myRoster.rbs[5].firstName + ' ' + myRoster.rbs[5].lastName  ) : null }
            </p>


            <p style={ numberOfTEs >= 1 ? {showStyle} : {display:'none'}}><b> TE </b>
            { myRoster.tes[0] ? (myRoster.tes[0].firstName + ' ' + myRoster.tes[0].lastName ) : null }
            </p>
            <p style={ numberOfTEs >= 2 ? {showStyle} : {display:'none'}}><b> TE </b>
            { myRoster.tes[1] ? (myRoster.tes[1].firstName + ' ' + myRoster.tes[1].lastName  ) : null }
            </p>
            <p style={ numberOfTEs >= 3 ? {showStyle} : {display:'none'}}><b> TE </b>
            { myRoster.tes[2] ? (myRoster.tes[2].firstName + ' ' + myRoster.tes[2].lastName  ) : null }
            </p>
            <p style={ numberOfTEs >= 4 ? {showStyle} : {display:'none'}}><b> TE </b>
            { myRoster.tes[3] ? (myRoster.tes[3].firstName + ' ' + myRoster.tes[3].lastName  ) : null }
            </p>


            <p style={ flexCount >= 1 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[0] ? (myRoster.flex[0].firstName + ' ' + myRoster.flex[0].lastName ) : null }
            </p>
            <p style={ flexCount >= 2 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[1] ? (myRoster.flex[1].firstName + ' ' + myRoster.flex[1].lastName  ) : null }
            </p>
            <p style={ flexCount >= 3 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[2] ? (myRoster.flex[2].firstName + ' ' + myRoster.flex[2].lastName  ) : null }
            </p>
            <p style={ flexCount >= 4 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[3] ? (myRoster.flex[3].firstName + ' ' + myRoster.flex[3].lastName  ) : null }
            </p>
            <p style={ flexCount >= 5 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[4] ? (myRoster.flex[4].firstName + ' ' + myRoster.flex[4].lastName ) : null }
            </p>
            <p style={ flexCount >= 6 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[5] ? (myRoster.flex[5].firstName + ' ' + myRoster.flex[5].lastName  ) : null }
            </p>
            <p style={ flexCount >= 7 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[6] ? (myRoster.flex[6].firstName + ' ' + myRoster.flex[6].lastName  ) : null }
            </p>
            <p style={ flexCount >= 8 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[7] ? (myRoster.flex[7].firstName + ' ' + myRoster.flex[7].lastName  ) : null }
            </p>
            <p style={ flexCount >= 9 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[8] ? (myRoster.flex[8].firstName + ' ' + myRoster.flex[8].lastName ) : null }
            </p>
            <p style={ flexCount >= 10 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[9] ? (myRoster.flex[9].firstName + ' ' + myRoster.flex[9].lastName  ) : null }
            </p>
            <p style={ flexCount >= 11 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[10] ? (myRoster.flex[10].firstName + ' ' + myRoster.flex[10].lastName  ) : null }
            </p>
            <p style={ flexCount >= 12 ? {showStyle} : {display:'none'}}><b> FLX </b>
            { myRoster.flex[11] ? (myRoster.flex[11].firstName + ' ' + myRoster.flex[11].lastName  ) : null }
            </p>


            <p style={ numberOfDST >= 1 ? {showStyle} : {display:'none'}}><b> DST </b>
            { myRoster.def[0] ? (myRoster.def[0].firstName + ' ' + myRoster.def[0].lastName ) : null }
            </p>
            <p style={ numberOfDST >= 2 ? {showStyle} : {display:'none'}}><b> DST </b>
            { myRoster.def[1] ? (myRoster.def[1].firstName + ' ' + myRoster.def[1].lastName  ) : null }
            </p>
            <p style={ numberOfDST >= 3 ? {showStyle} : {display:'none'}}><b> DST</b>
            { myRoster.def[2] ? (myRoster.def[2].firstName + ' ' + myRoster.def[2].lastName  ) : null }
            </p>
            <p style={ numberOfDST >= 4 ? {showStyle} : {display:'none'}}><b> DST </b>
            { myRoster.def[3] ? (myRoster.def[3].firstName + ' ' + myRoster.def[3].lastName  ) : null }
            </p>


            <p style={ numberOfKickers >= 1 ? {showStyle} : {display:'none'}}><b> K </b>
            { myRoster.k[0] ? (myRoster.k[0].firstName + ' ' + myRoster.k[0].lastName ) : null }
            </p>
            <p style={ numberOfKickers >= 2 ? {showStyle} : {display:'none'}}><b> K </b>
            { myRoster.k[1] ? (myRoster.k[1].firstName + ' ' + myRoster.k[1].lastName  ) : null }
            </p>
            <p style={ numberOfKickers >= 3 ? {showStyle} : {display:'none'}}><b> K </b>
            { myRoster.k[2] ? (myRoster.k[2].firstName + ' ' + myRoster.k[2].lastName  ) : null }
            </p>
            <p style={ numberOfKickers >= 4 ? {showStyle} : {display:'none'}}><b> K </b>
            { myRoster.k[3] ? (myRoster.k[3].firstName + ' ' + myRoster.k[3].lastName  ) : null }
            </p>


            <h3 style={{color:'grey', fontSize :'18px'}}> Bench </h3>

            <p style={ benchCount >= 1 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[0] ?
                (myRoster.bench[0].firstName + ' ' + myRoster.bench[0].lastName + ' ' + myRoster.bench[0].position ) : null } </p>
            <p style={ benchCount >= 2 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[1] ?
                (myRoster.bench[1].firstName + ' ' + myRoster.bench[1].lastName + ' ' + myRoster.bench[1].position ) : null } </p>
            <p style={ benchCount >= 3 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[2] ?
                (myRoster.bench[2].firstName + ' ' + myRoster.bench[2].lastName + ' ' + myRoster.bench[2].position ) : null } </p>
            <p style={ benchCount >= 4 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[3] ?
                (myRoster.bench[3].firstName + ' ' + myRoster.bench[3].lastName + ' ' + myRoster.bench[3].position ) : null } </p>
            <p style={ benchCount >= 5 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[4] ?
                (myRoster.bench[4].firstName + ' ' + myRoster.bench[4].lastName + ' ' + myRoster.bench[4].position ) : null } </p>
            <p style={ benchCount >= 6 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[5] ?
                (myRoster.bench[5].firstName + ' ' + myRoster.bench[5].lastName + ' ' + myRoster.bench[5].position ) : null } </p>
            <p style={ benchCount >= 7 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[6] ?
                (myRoster.bench[6].firstName + ' ' + myRoster.bench[6].lastName + ' ' + myRoster.bench[6].position ) : null } </p>
            <p style={ benchCount >= 8 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[7] ?
                (myRoster.bench[7].firstName + ' ' + myRoster.bench[7].lastName + ' ' + myRoster.bench[7].position ) : null } </p>
            <p style={ benchCount >= 9 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[8] ?
                (myRoster.bench[8].firstName + ' ' + myRoster.bench[8].lastName + ' ' + myRoster.bench[8].position ) : null } </p>
            <p style={ benchCount >= 10 ? {showStyle} : {display:'none'}}><b> BN </b>
              { myRoster.bench[9] ?
                (myRoster.bench[9].firstName + ' ' + myRoster.bench[9].lastName + ' ' + myRoster.bench[9].position ) : null } </p>


          </div>
        )
    }

    return (
      <div className='rostersDiv'>
        <h3> Your Team </h3>
        <Team1Roster />
      </div>
    )
  }
}
}


export const mapStateToProps = ({teamReducer, draftPreferencesReducer}) => {
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
    draftPos: draftPreferencesReducer.draftPos
  })
}
export default connect (mapStateToProps)(TeamRosters)
