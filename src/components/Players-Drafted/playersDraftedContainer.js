import React from 'react';
import {ShowDraftedPlayers} from './showDraftedPlayers';

export class PlayersDrafted extends React.Component {
  render(){
    const {
      showDraftedPlayers,
      getPlayerProfile,
      teamCount,
      playersUsed,
      teams,
      draftPos
    } = this.props

    return (
      <div className='draftedPlayersList'>
        <h2 className='drafted-header'> Players Taken </h2>
        <ShowDraftedPlayers
          draftedPlayers={playersUsed}
          getPlayerProfile={getPlayerProfile}
          teamsTotal={teamCount}
          teams={teams}
          draftPos={draftPos}/>
      </div>
    )
  }
}
