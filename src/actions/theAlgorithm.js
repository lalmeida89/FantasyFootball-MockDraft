


export const theAlgorithm = (teamArray) => (dispatch, getState) => {
  let playersArray = getState().playersReducer.players
  let wrArray = getState().playersReducer.wr
  let rbArray = getState().playersReducer.rb
  let teamLength = teamArray.length
  let QBs = countInArray(teamArray, 'QB')
  let RBs = countInArray(teamArray, 'RB')
  let WRs = countInArray(teamArray, 'WR')
  //console.log(teamArray, playersArray)
  if(teamLength <= 1){
    //console.log(playersArray[0])
    return playersArray[0]
  }
  if(teamLength > 1){
    //console.log('RBs:', RBs)
    //console.log('WRs:', WRs)
    if(RBs === WRs){
      return playersArray[0]
    }
    else if (RBs > WRs){
      //console.log(wrArray[0])
    }
    else if (RBs < WRs){
      //console.log(rbArray[0])
    }
  }
}





































const countInArray = (array, posValue) => {
    let count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].position === posValue) {
            count++;
        }
    }
    return count;
}
