import React, {useState, useEffect} from 'react';

export const RightSideHeader = props => {
  const {
    showRosters,
    showDraftedPlayers,
    draft
  } = props;

  return (
    <div className='rightSide-header'>
      <div className='rosters-button-outerDiv rightSide-button-outerDiv'>
        <button className='rosters-button rightSide-button'
          onClick={()=>showRosters()}>
          <i className="fas fa-clipboard-list rightSide-button-icon"></i>

          <span className='rightSide-button-label'> Team <br/> Rosters </span>
        </button>
      </div>
      <div className='draftedPlayers-button-outerDiv rightSide-button-outerDiv'>
        <button className='draftedPlayers-button rightSide-button'
          onClick={()=>showDraftedPlayers()}>
          <i className="fas fa-list-ol rightSide-button-icon"></i>
          <span className='rightSide-button-label'> Drafted <br/> Players </span>
        </button>
      </div>
    </div>
  )
}
