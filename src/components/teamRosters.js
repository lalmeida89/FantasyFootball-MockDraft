import React from 'react';
import {connect} from 'react-redux';

class TeamRosters extends React.Component {

  render(){
    console.log(this.props.team1)
    const Team1Roster = () => {
      let myTeam = this.props.team1
      let myRoster = {qbs : [], wrs : [], rbs : [], tes : [], def : [], flex : [],k : [], bench : []}
      console.log(myRoster)
      for(let i=0; i< myTeam.length; i++){
        if (myTeam[i].position === 'QB'){
          myRoster.qbs.push(myTeam[i])
          if (myRoster.qbs.length > 1){
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
        return (
          <div className='rosterPlayers'>
            <p><b> QB </b>
            { myRoster.qbs[0]
              ? (myRoster.qbs[0].name
                ? myRoster.qbs[0].name
                : myRoster.qbs[0].firstName + ' ' + myRoster.qbs[0].lastName )
                : null }
                </p>
            <p><b> WR </b>
            { myRoster.wrs[0]
              ? (myRoster.wrs[0].name
                ? myRoster.wrs[0].name
                : myRoster.wrs[0].firstName + ' ' + myRoster.wrs[0].lastName )
                : null }
                </p>
            <p><b> WR </b>
            { myRoster.wrs[1]
              ? (myRoster.wrs[1].name
                ? myRoster.wrs[1].name
                : myRoster.wrs[1].firstName + ' ' + myRoster.wrs[1].lastName )
                : null }
                </p>
            <p><b> RB </b>
            { myRoster.rbs[0]
              ? (myRoster.rbs[0].name
                ? myRoster.rbs[0].name
                : myRoster.rbs[0].firstName + ' ' + myRoster.rbs[0].lastName )
                : null }
                </p>
            <p><b> RB </b>
            { myRoster.rbs[1]
              ? (myRoster.rbs[1].name
                ? myRoster.rbs[1].name
                : myRoster.rbs[1].firstName + ' ' + myRoster.rbs[1].lastName )
                : null }
                </p>
            <p><b> TE </b>
            { myRoster.tes[0]
              ? (myRoster.tes[0].name
                ? myRoster.tes[0].name
                : myRoster.tes[0].firstName + ' ' + myRoster.tes[0].lastName )
                : null }
                </p>
            <p><b> FLX </b>
            { myRoster.flex[0]
              ? (myRoster.flex[0].name
                ? myRoster.flex[0].name
                : myRoster.flex[0].firstName + ' ' + myRoster.flex[0].lastName )
                : null}
                </p>
            <p><b> DST</b>
            { myRoster.def[0]
              ? (myRoster.def[0].name
                ? myRoster.def[0].name
                : myRoster.def[0].firstName + ' ' + myRoster.def[0].lastName )
                : null }
                </p>
            <p><b> K  </b>
            { myRoster.k[0]
              ? (myRoster.k[0].name
                ? myRoster.k[0].name
                : myRoster.k[0].firstName + ' ' + myRoster.k[0].lastName )
                : null }
                </p>

            <h3 style={{color:'grey', fontSize :'18px'}}> Bench </h3>

            <p><b> BN </b>
              { newBench[0]
              ? (newBench[0].name
              ? newBench[0].name + ' ' + newBench[0].position
              : newBench[0].firstName + ' ' + newBench[0].lastName + ' ' + newBench[0].position )
              : null } </p>
            <p><b> BN </b>
              { newBench[1]
              ? (newBench[1].name
              ? newBench[1].name + ' ' + newBench[1].position
              : newBench[1].firstName + ' ' + newBench[1].lastName + ' ' + newBench[1].position )
              : null } </p>
            <p><b> BN </b>
              { newBench[2]
              ? (newBench[2].name
              ? newBench[2].name + ' ' + newBench[2].position
              : newBench[2].firstName + ' ' + newBench[2].lastName + ' ' + newBench[2].position )
              : null } </p>
            <p><b> BN </b>
              { newBench[3]
              ? (newBench[3].name
              ? newBench[3].name + ' ' + newBench[3].position
              : newBench[3].firstName + ' ' + newBench[3].lastName + ' ' + newBench[3].position )
              : null } </p>
            <p><b> BN </b>
              { newBench[4]
              ? (newBench[4].name
              ? newBench[4].name + ' ' + newBench[4].position
              : newBench[4].firstName + ' ' + newBench[4].lastName + ' ' + newBench[4].position )
              : null } </p>
            <p><b> BN </b>
              { newBench[5]
              ? (newBench[5].name
              ? newBench[5].name + ' ' + newBench[5].position
              : newBench[5].firstName + ' ' + newBench[5].lastName + ' ' + newBench[5].position )
              : null } </p>
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


export const mapStateToProps = ({teamReducer}) => {
  return ({
    playersUsed: teamReducer.playersUsed,
    team1: teamReducer.team1
  })
}
export default connect (mapStateToProps)(TeamRosters)
