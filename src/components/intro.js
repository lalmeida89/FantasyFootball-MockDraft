import React  from 'react';
import {connect} from 'react-redux';

import {fetchPlayers} from '../actions/fetchAction'
import {getPlayerProfile} from '../actions/setCurrentPlayerAction'
import {
  showPosition,
  showMenu,
  hideMenu
} from '../actions/showActions'
import {Button} from '../styledComponents/dropdown'
import {PlayerSelector} from '../styledComponents/playerSelector'
import {Position} from '../styledComponents/position'
import {TeamAbbr} from '../styledComponents/teamAbbr'
import '../styles/intro.css'


//sort function to sort players by their rank
const sort_by = (field, reverse, primer) => {
  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a < b) - (b < a));
    }
}

//we map the players based on the displayPlayers props. whichever players we want to display
//the currentId is just our props which we mapped from state. the draft button dispatches the playerDrafted action.
//the file icon runs a fetch based on the id and then returns the player profile.
//we check if the current player exists in the favorites array which sets the color of our star icon
//and dispatches either addToFavorites if it isn't there or removedFavorite if it is.
//PlayerProfile will only display for the player the user selected
const ShowPlayers = props => {
  props.players.sort(sort_by('rank', true, parseInt));
  let playerNames = props.players.map((player, index) => (
    <PlayerSelector
    position = {player.position}
    onClick={()=> props.currentId.dispatch(getPlayerProfile(player.id))}
    key={index}>
      <p className='playerName'><b>
      <Position position={player.position}> {player.position}</Position>
      <TeamAbbr team={player.teamAbbr}> {!player.teamAbbr ? 'FA' : player.teamAbbr} </TeamAbbr>
      {player.firstName} {player.lastName}
      <span style={{float: 'right'}}>{player.rank}</span>
      </b></p>
    </PlayerSelector>
    )
  )
  return (
    <div className='playersDiv'>
    {playerNames}
    </div>
  )
}



class Intro extends React.Component {
  componentDidMount() {
    //fetches all the players when this component mounts
    this.props.dispatch(fetchPlayers())
  }

  //dispatch showPosition on the array of positions we select. then close the dropdown menu
  displayPosition = position => {
    this.props.dispatch(showPosition(position));
    this.closeMenu();
  }

  //set the menu value in the reducer to true
  displayMenu = () => {
    this.props.dispatch(showMenu());
  }

  //set the menu value in the reducer to false
  closeMenu = () => {
    this.props.dispatch(hideMenu());
  }

  render() {
    //what the dropdown will render will be based on the the prop we pass to displayPlayers based on
    //what is set in the showPosition function. initially it will show all players but buttons
    //bellow will change the value and render a different position header
    const PositionHeader = () => {
      let playerPosition = this.props.displayPlayers

      if (playerPosition === this.props.wr){
        return (<div> Wide Receivers { this.props.menu ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</div>)
      }
      else if (playerPosition === this.props.rb){
        return (<div> Running Backs { this.props.menu ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</div>)
      }
      else if (playerPosition === this.props.qb){
        return (<div> Quarterbacks { this.props.menu ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</div>)
      }
      else if (playerPosition === this.props.te){
        return (<div> Tight Ends { this.props.menu ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</div>)
      }
      else if (playerPosition === this.props.def){
        return (<div> DST { this.props.menu ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</div>)
      }
      else if (playerPosition === this.props.k){
        return (<div> Kickers { this.props.menu ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</div>)
      }
      else
        return (<div> All Players { this.props.menu ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</div>)
    }

    const { error, loading } = this.props;

    if(error) {
      return <div className='players'> ERROR! {error.message}</div>;
    }
    if(loading) {
      return <div className='players'> LOADING... </div>;
    }
    //if there is no error and our fetch isnt loading then render the main component.
    //our Button will open or close the menu based on the menu prop. PositionHeader is shown inside of it.
    //similarly our droptdown buttons will show only if the menu prop is true. ShowPlayers
    //will show what is passed onto the displayPosition function
    else {
      return (
        <div className='players'>
          <h1 style={{textAlign: 'center', fontSize: '27px'}}> Players Available </h1>
          <h5 style={{textAlign: 'center'}}> Round {this.props.turn} </h5>
          <div className='dropdwnMenu'>
            <Button onClick={()=> this.props.menu
              ? this.closeMenu()
              : this.displayMenu()}>
              <PositionHeader />
            </Button>
              { this.props.menu ? (
              <div className='positionBtn'>
                <Button dropBtn onClick={()=>this.displayPosition(this.props.players)}> Show All </Button>
                <Button dropBtn onClick={()=>this.displayPosition(this.props.qb)}> Quarterbacks </Button>
                <Button dropBtn onClick={()=>this.displayPosition(this.props.rb)}> Running Backs </Button>
                <Button dropBtn onClick={()=>this.displayPosition(this.props.wr)}> Wide Receivers </Button>
                <Button dropBtn onClick={()=>this.displayPosition(this.props.te)}> Tight Ends </Button>
                <Button dropBtn onClick={()=>this.displayPosition(this.props.def)}> DST </Button>
                <Button dropBtn onClick={()=>this.displayPosition(this.props.k)}> Kickers </Button>
              </div>
              )
              : null
            }
          </div>
          <ShowPlayers players={this.props.displayPlayers} currentId={this.props} />
        </div>
      )
    }
  }
}


export const mapStateToProps = ({playersReducer, favoritesReducer, counterReducer}) => {
  ////console.log(playersReducer)
  return ({
  players: playersReducer.players,
  qb: playersReducer.qb,
  wr: playersReducer.wr,
  rb: playersReducer.rb,
  te: playersReducer.te,
  def: playersReducer.def,
  k: playersReducer.k,
  loading: playersReducer.loading,
  error: playersReducer.error,
  displayPlayers: playersReducer.displayPlayers,
  currentPlayer: playersReducer.currentPlayer,
  profile: playersReducer.profile,
  menu: playersReducer.menu,
  myFavorites: favoritesReducer.myFavorites,
  counter: counterReducer.counter,
  turn: counterReducer.turns
  })
}


export default connect(mapStateToProps)(Intro);
