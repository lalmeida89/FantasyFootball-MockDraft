import React  from 'react';

import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {ShowPlayers} from './ShowPlayers'
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
  entering: { width: '55vw' },
  entered: { width: '55vw' },
  exiting: { width: '99vw'},
  exited: { width: '99vw'}
}

const sideBarIconStyle = {
  transition: `right ${duration}ms`
}
const sideBarIconTransitionStyles = {
  entering: { right: '42vw' },
  entered: { right: '42vw' },
  exiting: { right: '1vw'},
  exited: { right: '1vw'}
}

const labelsStyle = {
  transition: `width ${duration}ms`
}
const labelsTransitionStyles = {
  entering: { width: '55vw', gridTemplateColumns: '30px 30px 5fr 1fr' },
  entered: { width: '55vw', gridTemplateColumns: '30px 30px 5fr 1fr' },
  exiting: { width: '99vw', gridTemplateColumns: '30px 30px 3fr 1fr 1fr 1fr'},
  exited: { width: '99vw', gridTemplateColumns: '30px 30px 3fr 1fr 1fr 1fr'}
}

const labelsExtendedStyle = {
  gridTemplateColumns: '30px 30px 4fr 1fr 1fr'
}
const labelsShortenedStyle = {
  gridTemplateColumns: '30px 30px 5fr 1fr'
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
      isOpen,
      dispatch,
      turn,
      counter,
      teamCount,
      displayPlayers,
      players,
      showPosition,
      loading,
      getPlayerProfile,
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
          <Transition in={isOpen} timeout={duration}>
          {(state)=>(
            <div className='labels'
              style={{
                ...labelsStyle,
                ...labelsTransitionStyles[state]}}>
              <p> </p>
              <p> </p>
              <p> </p>
              <p style={{textAlign:'right'}}> Rank </p>
              {!isOpen ? <p style={{textAlign:'right', paddingRight:'10px'}}> ADP </p> : null}
              {!isOpen ? <p style={{textAlign:'right', paddingRight:'10px'}}> BYE </p> : null}
            </div>
          )}
          </Transition>
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

          <ShowPlayers
            players={displayPlayers}
            getPlayerProfile={getPlayerProfile}
            isOpen={isOpen}
            loading={loading} />
        </div>
      )}
      </Transition>
      )
    }
  }
}

export default IntroContainer
