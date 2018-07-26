const initialState = {
  finalPage: false
}

export default (finalState = initialState, action) => {
  switch(action.type){
    case 'RENDER_FINAL_PAGE':
      return {
        finalPage: true
      }
    default:
      return{
        finalPage: finalState.finalPage
      }
  }
}
