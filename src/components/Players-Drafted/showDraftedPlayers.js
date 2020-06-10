import React, {useState, useEffect, useRef} from 'react';

export const ShowDraftedPlayers = props => {
  const {
    draftedPlayers,
    getPlayerProfile,
    teams,
    draftPos
  } = props;
  const myTeam = teams[draftPos-1]
  const [count, setCount] = useState(0);
  const style = {
    fontSize: '9px',
    fontStyle:'italic'
  }
  const playersListEndRef = useRef(null);

  useEffect(() => {
    playersListEndRef.current.scrollIntoView({ behavior: "smooth" })
  });

  useEffect(() => {
    let counter = count;
    const interval = setInterval(() => {
      if (counter >= draftedPlayers.length) {
        clearInterval(interval);
      } else {
        setCount(count => count + 1);
        counter++; // local variable that this closure will see
      }
    }, 500);
    return () => clearInterval(interval);
  }, [draftedPlayers]);

  let playersDraftedList = draftedPlayers.slice(0, count).map((player, index) => {
    return (
      <div key={index} className='drafted'
        id={myTeam.includes(player)?'myTeam-player' : null}
        onClick={()=>getPlayerProfile(player)}>
        <p style={style}>TEAM {player.teamDraftedBy} </p>
        <p className='draftedPlayer'>
          {player.round}.{player.pickedAt<10 ? '0'+player.pickedAt : player.pickedAt} {' '}
          {player.displayName.substr(0,player.displayName.indexOf(' '))}<br/>
          <b className='player-lastName'> {player.displayName.substr(player.displayName.indexOf(' ')+1)} </b>
           {player.position}
        </p>
      </div>
    )
  })
  return (
    <div className='draftedPlayers-container'>
      {playersDraftedList}
      <div ref={playersListEndRef} />
    </div>
  )
}
