const initialState = {
  counter : 0,
  currentDirection : 1,
  turns: 0
}

export default (counterState = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_TEAM':
      console.log(action.type, counterState)
      return {
        counter: action.count,
        currentDirection: counterState.currentDirection,
        turns: action.turns
      }
    case 'ADD_TO_MY_TEAM':
      console.log(action.type, counterState)
      return  {
        ...counterState,
        counter: action.count
      }
    case 'INCREASING':
      console.log(action.type, counterState)
      return Object.assign({}, counterState, {
        currentDirection: 1
      })
    case 'DECREASING':
      console.log(action.type, counterState)
      return Object.assign({}, counterState, {
        currentDirection: -1,
        counter: action.count
    })
    case 'KEEP_COUNT':
      console.log(action.type, counterState)
      return Object.assign({}, counterState, {
        counter: action.count
    })
    default:
      return {
        counter: counterState.counter,
        currentDirection: counterState.currentDirection,
        turns: counterState.turns
      }
  }
}
