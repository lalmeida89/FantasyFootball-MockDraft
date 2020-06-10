import React from 'react';
import {ProfileHeader} from './profileHeader';
import {PlayerSchedule} from './schedule';
import {DepthChart} from './depthChart'
import {ProjectedStats} from './projectedStats';
import {ProfileButton} from '../../styledComponents/profileButton';
import '../../styles/playerCard.css';

export class PlayerProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSchedule: true,
      showStats: false,
      showDepthChart: false
    }
  }

  render(){
    const {
      player,
      playersUsed,
      renderProfile,
      schedule,
      projectedPlayerStats,
      depthChart,
      dispatch,
      hidePlayerProfile,
      addPlayerToMyTeam
    } = this.props;

    const {
      showSchedule,
      showStats,
      showDepthChart
    } = this.state;

    const handleProfileRender = componentToRender => {
      if (componentToRender === 'schedule'){
        this.setState({
          showSchedule: true,
          showStats: false,
          showDepthChart: false
        })
      } else if (componentToRender === 'projectedStats') {
        this.setState({
          showSchedule: false,
          showStats: true,
          showDepthChart: false
        })
      } else if (componentToRender === 'depthChart') {
        this.setState({
          showSchedule: false,
          showStats: false,
          showDepthChart: true
        })
      }
    }

    const handleDrafting = player => {
      addPlayerToMyTeam(player);
      hidePlayerProfile();
    }

    if(renderProfile){
      return (
        <div className='playerCard-background'>
          <div className='playerCard'>
            <ProfileHeader player={player} />
            <div className='infoSelector'>
              <ProfileButton onClick={()=> handleProfileRender('depthChart')}> DEPTH CHART </ProfileButton>
              <ProfileButton onClick={()=> handleProfileRender('schedule')}> SCHEDULE </ProfileButton>
              <ProfileButton onClick={()=> handleProfileRender('projectedStats')}> PROJECTED STATS </ProfileButton>
              {!playersUsed.includes(player) ?
                <ProfileButton draft onClick={()=> handleDrafting(player)}> DRAFT </ProfileButton> : null}
            </div>
            <div className='playerCard-info'>
              {showSchedule ?
              <PlayerSchedule schedule={schedule} playerTeam={player.team}/> : null }
              {showDepthChart ?
              <DepthChart depthChart={depthChart} player={player}/> : null }
              {showStats ?
              <ProjectedStats projectedPlayerStats={projectedPlayerStats} player={player} /> : null }
            </div>
            <ProfileButton className='hideProfile' onClick={()=> hidePlayerProfile()}> Close </ProfileButton>
          </div>
        </div>
      )
    } else { return null }
  }
}
