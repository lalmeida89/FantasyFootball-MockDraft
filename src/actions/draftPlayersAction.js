export const DRAFT_PLAYER ='DRAFT_PLAYER';

/* once we click on the button to draft a player, we first push it to the team array then we set
the state to be that team array. all of the players drafted will be merged onto the playersUsed array */
export const draftPlayer = teamPicksObj => ({
  type: DRAFT_PLAYER,
  myTeam: teamPicksObj.myTeam,
  playersUsed: teamPicksObj.myTeam
})

export const teamPicks = player => {
  let teamPicksObj = {myTeam : [], team2 : []}
  let myTeam = teamPicksObj.myTeam;
  myTeam.push(player);
  console.log(teamPicksObj)
  return teamPicksObj
}

export const playerDrafted = (player) => {
  return dispatch => {
    let teamPicksObj = teamPicks(player)
    dispatch(draftPlayer(teamPicksObj));
    console.log(player);
  }
}
