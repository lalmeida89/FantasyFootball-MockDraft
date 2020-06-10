import React from 'react';
import {ShowDraftedPlayers} from './showDraftedPlayers';

export const PlayersDrafted = props => {
  const {
    showDraftedPlayers,
    getPlayerProfile,
    teamCount,
    playersUsed,
    teams,
    draftPos
  } = props
  
  return (
    <div className='draftedPlayersList'>
      <ShowDraftedPlayers
        draftedPlayers={playersUsed}
        getPlayerProfile={getPlayerProfile}
        teamsTotal={teamCount}
        teams={teams}
        draftPos={draftPos}/>
    </div>
  )
}
