import React from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

export const PlayerSchedule = props => {
  const {schedule, playerTeam} = props;
  if(schedule.length === 0){
    return (
      <SkeletonTheme color="#a9bfde" highlightColor="#c8d1de">
        <Skeleton count={7} height={30} duration={1.5}/>
      </SkeletonTheme>
    )
  } else {
    let playerSchedule = schedule.map((game, index) => (
      <div key={index}>
        <p> Week {game.gameWeek} :
          <span
            className={playerTeam === game.awayTeam ? 'bolden' : 'plain'} > {game.awayTeam}
          </span> vs
          <span
            className={playerTeam === game.homeTeam ? 'bolden' : 'plain'} > {game.homeTeam}
          </span>
        </p>
      </div>
    ))
    return (
      <div className='schedule'>
        {playerSchedule}
      </div>
    )
  }
}
