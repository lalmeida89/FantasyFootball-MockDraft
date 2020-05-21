import React  from 'react';
import {Button} from '../../styledComponents/dropdown';
import {PlayerSelector} from '../../styledComponents/playerSelector';
import {Position} from '../../styledComponents/position';
import {TeamAbbr} from '../../styledComponents/team';
import PositionHeader from './../Position-Header'

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
    onClick={()=> props.currentId.dispatch(getPlayerProfile(player.playerId))}
    key={index}>
      <p className='playerName'><b>
      <Position position={player.position}> {player.position}</Position>
      <TeamAbbr team={player.team}> {!player.team ? 'FA' : player.team} </TeamAbbr></b>
      <span className='player-name'>{player.position !== 'DEF' ? (player.fname + ' ' + player.lname) : player.fname}</span>
      <span style={{float: 'right', marginRight: '5%'}}>{player.overallRank}</span>
      </p>
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
    this.props.fetchPlayers()
  }
  //dispatch showPosition on the array of positions we select. then close the dropdown menu
  displayPosition = position => {
    this.props.showPosition(position);
    this.closeMenu();
  }
  //set the menu value in the reducer to true
  displayMenu = () => {
    this.props.showMenu();
  }
  //set the menu value in the reducer to false
  closeMenu = () => {
    this.props.hideMenu();
  }

  render() {
    const { error, loading, isOpen, dispatch } = this.props;

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
      let currentPick = this.props.counter+1
      return (
        <Transition in={isOpen} timeout={duration}>
        {(state)=> (
        <div className='players' style={{
          ...introStyle,
          ...introTransitionStyles[state]}}>
          <h1 className='intro-header' style={{textAlign: 'center'}}> Players Available </h1>
          <h5 className='currentPick' style={{textAlign: 'center'}}> Pick {this.props.turn}.{currentPick<10 ? '0'+currentPick:currentPick} </h5>
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
          <p className='labels'>ADP</p>
          <Transition in={isOpen} timeout={duration}>
          {(state)=>(
            <div className="sideBar-icon" onClick={()=>dispatch(renderSidebar())}
              style={{
                ...sideBarIconStyle,
                ...sideBarIconTransitionStyles[state]}}>
              <SideBarIcon
                isOpen={isOpen}
              />
            </div>
          )}
          </Transition>

          <ShowPlayers players={this.props.displayPlayers} currentId={this.props} />
        </div>
      )}
      </Transition>
      )
    }
  }
}





export default Intro
