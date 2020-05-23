import React  from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

import {Button} from '../../styledComponents/dropdown';
import {PlayerSelector} from '../../styledComponents/playerSelector';
import {Position} from '../../styledComponents/position';
import {TeamAbbr} from '../../styledComponents/teamAbbr';
import {Transition} from 'react-transition-group';
import SideBarIcon from './../Right-Side-Icon';
import PositionHeader from './../Position-Header';
import {SearchBar} from './searchBar';
import {PositionDropdownMenu} from './positionDropdownMenu'
import '../../styles/intro.css';
import '../../styles/filterOptions.css';

const duration = 400
const introStyle = {
  transition: `width ${duration}ms`
}
const introTransitionStyles = {
  entering: { width: '98%' },
  entered: { width: '55%' },
  exiting: { width: '98%'},
  exited: { width: '98%'}
}
const sideBarIconStyle = {
  transition: `right ${duration}ms`
}
const sideBarIconTransitionStyles = {
  entering: { right: '1%' },
  entered: { right: '44%' },
  exiting: { right: '1%'},
  exited: { right: '1%'}
}

const labelsExtendedStyle = {
  gridTemplateColumns: '30px 30px 4fr 1fr 1fr'
}
const labelsShortenedStyle = {
  gridTemplateColumns: '30px 30px 5fr 1fr'
}
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
  console.log(props);
  props.players.sort(sort_by('overallRank', true, parseInt));
  let playerNames = props.players.map((player, index) => (
    <PlayerSelector
    position = {player.position}
    onClick={()=> props.currentId.getPlayerProfile(player)}
    key={index}>
      <div className='playerName'
          style={!props.currentId.isOpen ? {gridTemplateColumns: '30px 30px 4fr 1fr 1fr'} : {gridTemplateColumns:'30px 30px 5fr 1fr'}}>
        <b><Position position={player.position}> {player.position}</Position></b>
        <TeamAbbr team={player.team}> {!player.team ? 'FA' : player.team} </TeamAbbr>
        <span className='player-name'>{player.displayName}</span>
        <span style={{textAlign:'right'}}>{player.overallRank}</span>
        {!props.currentId.isOpen ?
          <span style={{textAlign:'right'}}> {Math.round(player.nerdRank*10)/10}</span>
          : null }
      </div>
    </PlayerSelector>
    )
  )
  return (
    <div className='playersDiv'>
      {props.currentId.loading ?
        <SkeletonTheme color="#a9bfde" highlightColor="#c8d1de" >
          <Skeleton count={30} height={50}/>
        </SkeletonTheme>
        : playerNames }
    </div>
  )
}

class IntroContainer extends React.Component {
  componentDidMount() {
    this.props.fetchPlayers()
  }

  //what the dropdown will render will be based on the the prop we pass to displayPlayers based on
  //what is set in the showPosition function. initially it will show all players but buttons
  //bellow will change the value and render a different position header
  render() {
    const {
      error,
      menu,
      isOpen,
      dispatch,
      turn,
      counter,
      teamCount,
      displayPlayers,
      players,
      showPosition,
      filteredPlayers
    } = this.props;

    const displayPickNumber = turn => {
      let currentPick;
      if(turn%2===0){
        currentPick = teamCount-counter
        return (
          <span> Pick {turn}.{currentPick<10 ? '0'+currentPick:currentPick} </span>
        )
      } else {
        currentPick = counter+1
        return (
          <span> Pick {turn}.{currentPick<10 ? '0'+currentPick:currentPick} </span>
        )
      }
    }

    if(error) {
      return <div className='players'> ERROR! {error.message}</div>;
    }
    //if there is no error and our fetch isnt loading then render the main component.
    //our Button will open or close the menu based on the menu prop. PositionHeader is shown inside of it.
    //similarly our droptdown buttons will show only if the menu prop is true. ShowPlayers
    //will show what is passed onto the displayPosition function
    else {
      return (
        <Transition in={isOpen} timeout={duration}>
        {(state)=> (
        <div className='players' style={{
          ...introStyle,
          ...introTransitionStyles[state]}}>
          {/*<h5 className='currentPick' style={{textAlign: 'center'}}> {displayPickNumber(turn)} </h5>*/}
          <div className='filter-options'>
            <SearchBar isOpen={isOpen} playerList={players} filteredPlayers={filteredPlayers}/>
            <PositionDropdownMenu
              isOpen={isOpen}
              allPlayers={players}
              filterByPosition={showPosition}
              qb={this.props.qb}
              rb={this.props.rb}
              wr={this.props.wr}
              te={this.props.te}
              def={this.props.def}
              k={this.props.k}
              />
          </div>
          <div className='labels'
            id={!isOpen ? 'labels-extended' : 'labels-shortened'}>
            <p> </p>
            <p> </p>
            <p> </p>
            <p style={{textAlign:'right'}}> Rank </p>
            {!isOpen ? <p style={{textAlign:'right', paddingRight:'10px'}}> ADP </p> : null}
          </div>
          <Transition in={isOpen} timeout={duration}>
          {(state)=>(
            <div className="sideBar-icon" onClick={()=>this.props.renderSidebar()}
              style={{
                ...sideBarIconStyle,
                ...sideBarIconTransitionStyles[state]}}>
              <SideBarIcon
                isOpen={isOpen}
              />
            </div>
          )}
          </Transition>

          <ShowPlayers players={displayPlayers} currentId={this.props} />
        </div>
      )}
      </Transition>
      )
    }
  }
}

export default IntroContainer
