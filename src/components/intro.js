import React  from 'react';
import {connect} from 'react-redux';

import {fetchPlayers} from '../modules/fetchAction'
import {setCurrentPlayer, getPlayerProfile} from '../modules/setCurrentPlayerAction'
import {
  showQB,
  showRB,
  showWR,
  showTE
} from '../modules/showActions'


const sort_by = (field, reverse, primer) => {
  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

const ShowPlayers = props => {
  console.log(props)
  props.players.sort(sort_by('seasonPts', true, parseInt));
  let playerNames = props.players.map((player, index) => (
    <div key={index}>
      <h3
      onClick={()=> props.currentId.dispatch(getPlayerProfile(player.id))}>
      {player.name} {player.position}
      </h3>
      <p>{player.seasonPts}</p>
      </div>
    ))
  return <div>{playerNames}</div>
}



class Intro extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(fetchPlayers())
  }

  displayQBS = () => {
    this.props.dispatch(showQB(this.props.qb));
    console.log('fucking work god damn it')
  }

  displayRBS = () => {
    this.props.dispatch(showRB(this.props.rb));
    console.log('fucking work god damn it')
  }

  displayWRS = () => {
    this.props.dispatch(showWR(this.props.wr));
    console.log('fucking work god damn it')
  }

  displayTES = () => {
    this.props.dispatch(showTE(this.props.te));
    console.log(this.props, 'fucking work god damn it')
  }



  render() {

    const { error, loading } = this.props;

    if(error) {
      return <div> ERROR! {error.message}</div>;
    }
    if(loading) {
      return <div> LOADING... </div>;
    }
    else {
      return (
        <div>
          <button onClick={()=>this.displayQBS()}>show qbs </button>
          <button onClick={()=>this.displayRBS()}>show rbs </button>
          <button onClick={()=>this.displayWRS()}>show wrs </button>
          <button onClick={()=>this.displayTES()}>show tes </button>
          <ShowPlayers players={this.props.displayPlayers} currentId={this.props} />
        </div>
      )
    }

    return
  }
}


export const mapStateToProps = (state, props) => {
  console.log(state, props)
  return ({
  players: state.players,
  qb: state.qb,
  wr: state.wr,
  rb: state.rb,
  te: state.te,
  loading: state.loading,
  error: state.error,
  displayPlayers: state.displayPlayers,
  currentPlayer: state.currentPlayer,
  profile: state.profile
  })
}


export default connect(mapStateToProps)(Intro);
