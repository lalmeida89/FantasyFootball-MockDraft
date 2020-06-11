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
        <span> Rosters </span>
      </div>
      <div className='draftedPlayersBtn'
        onClick={()=>showDraftedPlayers()}>
        <span> Drafted Players </span>
      </div>
    </div>
  )
}
