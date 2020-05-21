import React from 'react';
import {ProfileHeader} from './profileHeader';
import {PlayerSchedule} from './schedule';
import {DepthChart} from './depthChart'
import {ProjectedStats} from './projectedStats';
import {addPlayerToMyTeam} from '../../actions/draftPreferencesAction';
import {ProfileButton} from '../../styledComponents/profileButton';
import '../../styles/playerCard.css';


export class PlayerProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSchedule: false,
      showStats: true,
      showDepthChart: false
    }
  }

  render(){
    const {
      player,
      renderProfile,
      schedule,
      projectedPlayerStats,
      depthChart
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

    if(renderProfile){
      return (
        <div className='playerCard-background'>
          <div className='playerCard'>
            <ProfileHeader player={player} />
            <div className='infoSelector'>
              <ProfileButton onClick={()=> handleProfileRender('depthChart')}> DEPTH CHART </ProfileButton>
              <ProfileButton onClick={()=> handleProfileRender('schedule')}> SCHEDULE </ProfileButton>
              <ProfileButton onClick={()=> handleProfileRender('projectedStats')}> PROJECTED STATS </ProfileButton>
              <ProfileButton draft> DRAFT </ProfileButton>
            </div>
            {showSchedule ?
            <PlayerSchedule schedule={schedule} playerTeam={player.team}/> : null }
            {showDepthChart ?
            <DepthChart depthChart={depthChart} player={player}/> : null }
            {showStats ?
            <ProjectedStats projectedPlayerStats={projectedPlayerStats} player={player} /> : null }
          </div>
        </div>
      )
    } else { return null }
  }
}
