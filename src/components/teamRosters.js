import React from 'react';
import {connect} from 'react-redux';

class TeamRosters extends React.Component {

  render(){
    console.log(this.props.team1)
    const { numberOfQBs, numberOfWRs, numberOfRBs, numberOfTEs, showSettingsPage, numberOfDST, numberOfKickers, benchCount } = this.props;

    if (showSettingsPage == true) {
      return null
    }

    else if (showSettingsPage == false) {
    const Team1Roster = () => {
      let myTeam = this.props.team1
      let myRoster = {qbs : [], wrs : [], rbs : [], tes : [], def : [], flex : [], k : [], bench : []}
      console.log(myRoster)
      for(let i=0; i< myTeam.length; i++){
        if (myTeam[i].position === 'QB'){
          myRoster.qbs.push(myTeam[i])
          if (myRoster.qbs.length > numberOfQBs){
            myRoster.bench.push(myTeam[i])
          }
        }
        if (myTeam[i].position === 'WR'){
          myRoster.wrs.push(myTeam[i])
          if (myRoster.wrs.length > 2){
            myRoster.bench.push(myTeam[i])
            if (myRoster.flex.length < 1) {
              myRoster.flex.push(myTeam[i])
            }
          }
        }
        if (myTeam[i].position === 'TE'){
          myRoster.tes.push(myTeam[i])
          if (myRoster.tes.length > 1){
            myRoster.bench.push(myTeam[i])
            if (myRoster.flex.length < 1) {
              myRoster.flex.push(myTeam[i])
            }
          }
        }
        if (myTeam[i].position === 'RB'){
          myRoster.rbs.push(myTeam[i])
          if (myRoster.rbs.length > 2){
            myRoster.bench.push(myTeam[i])
            if (myRoster.flex.length < 1) {
              myRoster.flex.push(myTeam[i])
            }
          }
        }
        if (myTeam[i].position === 'DEF'){
          myRoster.def.push(myTeam[i])
          if (myRoster.def.length > 1){
            myRoster.bench.push(myTeam[i])
          }
        }
        if (myTeam[i].position ==='K'){
          myRoster.k.push(myTeam[i])
          if (myRoster.k.length > 1){
            myRoster.bench.push(myTeam[i])
          }
        }

      }
      const newBench = myRoster.bench.filter(player=>{
        if(myRoster.flex[0]){
          return player.id !== myRoster.flex[0].id
        }
        return player.id
      })
      console.log(newBench)
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


            <p><b> FLX </b>
            { myRoster.flex[0]
              ? (myRoster.flex[0].name
                ? myRoster.flex[0].name
                : myRoster.flex[0].firstName + ' ' + myRoster.flex[0].lastName )
                : null}
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
              { newBench[0] ?
                (newBench[0].firstName + ' ' + newBench[0].lastName + ' ' + newBench[0].position ) : null } </p>
            <p style={ benchCount >= 2 ? {showStyle} : {display:'none'}}><b> BN </b>
              { newBench[1] ?
                (newBench[1].firstName + ' ' + newBench[1].lastName + ' ' + newBench[1].position ) : null } </p>
            <p style={ benchCount >= 3 ? {showStyle} : {display:'none'}}><b> BN </b>
              { newBench[2] ?
                (newBench[2].firstName + ' ' + newBench[2].lastName + ' ' + newBench[2].position ) : null } </p>
            <p style={ benchCount >= 4 ? {showStyle} : {display:'none'}}><b> BN </b>
              { newBench[3] ?
                (newBench[3].firstName + ' ' + newBench[3].lastName + ' ' + newBench[3].position ) : null } </p>
            <p style={ benchCount >= 5 ? {showStyle} : {display:'none'}}><b> BN </b>
              { newBench[4] ?
                (newBench[4].firstName + ' ' + newBench[4].lastName + ' ' + newBench[4].position ) : null } </p>
            <p style={ benchCount >= 6 ? {showStyle} : {display:'none'}}><b> BN </b>
              { newBench[5] ?
                (newBench[5].firstName + ' ' + newBench[5].lastName + ' ' + newBench[5].position ) : null } </p>
            <p style={ benchCount >= 7 ? {showStyle} : {display:'none'}}><b> BN </b>
              { newBench[6] ?
                (newBench[6].firstName + ' ' + newBench[6].lastName + ' ' + newBench[6].position ) : null } </p>
            <p style={ benchCount >= 8 ? {showStyle} : {display:'none'}}><b> BN </b>
              { newBench[7] ?
                (newBench[7].firstName + ' ' + newBench[7].lastName + ' ' + newBench[7].position ) : null } </p>
            <p style={ benchCount >= 9 ? {showStyle} : {display:'none'}}><b> BN </b>
              { newBench[8] ?
                (newBench[8].firstName + ' ' + newBench[8].lastName + ' ' + newBench[8].position ) : null } </p>
            <p style={ benchCount >= 10 ? {showStyle} : {display:'none'}}><b> BN </b>
              { newBench[9] ?
                (newBench[9].firstName + ' ' + newBench[9].lastName + ' ' + newBench[9].position ) : null } </p>


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
    playersUsed: teamReducer.playersUsed,
    team1: teamReducer.team1
  })
}
export default connect (mapStateToProps)(TeamRosters)
