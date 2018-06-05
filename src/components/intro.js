import React  from 'react';
import {connect} from 'react-redux';
import PlayerProfile from './playerProfile'

import {fetchPlayers} from '../actions/fetchAction'
import {getPlayerProfile} from '../actions/setCurrentPlayerAction'
import {
  showPosition,
  showMenu,
  hideMenu
} from '../actions/showActions'
import {playerDrafted} from '../actions/draftPlayersAction';
import {Button} from '../styledComponents/dropdown'



const sort_by = (field, reverse, primer) => {
  var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a < b) - (b < a));
    }
}

const ShowPlayers = props => {
  console.log(props)
  props.players.sort(sort_by('rank', true, parseInt));
  let playerNames = props.players.map((player, index) => (
    <div>
      <div key={index} className='playerSelector'>
      <button
      style={{float : 'right', marginTop: '10px'}}
      onClick={()=> props.currentId.dispatch(playerDrafted(player))}
      className='draftBtn'>Draft
      </button>
      <p><b> {player.firstName} {player.lastName} </b> <i
      className="far fa-file-alt"
      onClick={()=> props.currentId.dispatch(getPlayerProfile(player.id))}>
      </i></p>
      <hr/>
    </div>
    { player.id === props.currentId.currentPlayer ?
    <PlayerProfile /> : null }
    </div>
    )
  )
  return (
    <div>
    {playerNames}
    </div>)
}



class Intro extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(fetchPlayers())
  }

  displayPosition = position => {
    this.props.dispatch(showPosition(position));
    this.closeMenu();
  }

  displayMenu = () => {
    this.props.dispatch(showMenu());
    console.log(this.props.menu);
  }

  closeMenu = () => {
    this.props.dispatch(hideMenu());
    console.log(this.props.menu);
  }

  render() {
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
      return <div> ERROR! {error.message}</div>;
    }
    if(loading) {
      return <div> LOADING... </div>;
    }
    else {
      return (
        <div className='players'>
          <h1> Players Available </h1>
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


export const mapStateToProps = ({playersReducer}) => {
  console.log(playersReducer)
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
  menu: playersReducer.menu
  })
}


export default connect(mapStateToProps)(Intro);
