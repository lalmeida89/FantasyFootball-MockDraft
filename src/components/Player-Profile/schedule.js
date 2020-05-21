import React from 'react';

export const PlayerSchedule = props => {
  const {schedule, playerTeam} = props;
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
