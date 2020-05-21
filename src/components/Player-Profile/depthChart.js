import React from 'react';

export const DepthChart = props => {
  const {depthChart, player} = props;

  let showQBs = depthChart.QB.map((quarterback, index) => (
      <p key={index} id={player.displayName === quarterback.playerName ? 'highlightPlayer' : null}>
       {quarterback.playerName} </p>
  ))
  let showRBs = depthChart.RB.map((runningback, index) => (
      <p key={index} id={player.displayName === runningback.playerName ? 'highlightPlayer' : null}>
      {runningback.playerName} </p>
  ))
  let showWR1 = depthChart.WR1.map((widereceiver, index) => (
      <p key={index} id={player.displayName === widereceiver.playerName ? 'highlightPlayer' : null}>
      {widereceiver.playerName} </p>
  ))
  let showWR2 = depthChart.WR2.map((widereceiver, index) => (
      <p key={index} id={player.displayName === widereceiver.playerName ? 'highlightPlayer' : null}>
      {widereceiver.playerName} </p>
  ))
  let showTEs = depthChart.TE.map((tightend, index) => (
      <p key={index} id={player.displayName === tightend.playerName ? 'highlightPlayer' : null}>
      {tightend.playerName} </p>
  ))
  return (
    <div className='depthChart-container'>
      <div className='depthChart-inner'
           id={player.position === 'QB' ? 'highlightPosition' : null}>
        <p>QB</p>
        {showQBs}
      </div>
      <div className='depthChart-inner'
           id={player.position === 'RB' ? 'highlightPosition' : null}>
        <p> RB </p>
        {showRBs}
      </div>
      <div className='depthChart-inner'
           id={depthChart.WR1.some(e => e.playerId === player.playerId) ? 'highlightPosition' : null}>
        <p> WR1 </p>
        {showWR1}
      </div>
      <div className='depthChart-inner'
           id={depthChart.WR2.some(e => e.playerId === player.playerId) ? 'highlightPosition' : null}>
        <p> WR2 </p>
        {showWR2}
      </div>
      <div className='depthChart-inner' id={player.position === 'TE' ? 'highlightPosition' : null}>
        <p> TE </p>
        {showTEs}
      </div>
    </div>
  )
}
