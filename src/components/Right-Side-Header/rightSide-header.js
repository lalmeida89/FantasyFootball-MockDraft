import React, {useState, useEffect} from 'react';

export const RightSideHeader = props => {
  const {
    showRosters,
    showDraftedPlayers,
    draft
  } = props;

  return (
    <div className='rightSide-header'>
      <div className='rostersBtn'
        onClick={()=>showRosters()}>
        <span> Team <br/> Rosters </span>
      </div>
      <div className='draftedPlayersBtn'
        onClick={()=>showDraftedPlayers()}>
        <span> Drafted <br/> Players </span>
      </div>
    </div>
  )
}
