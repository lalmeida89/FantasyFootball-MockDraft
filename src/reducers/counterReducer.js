const initialState = {
  counter : 0,
  currentDirection : 1,
  turns: 1
}

export default (counterState = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_TEAM':
      return {
        ...counterState,
        counter: action.counter
      }
    case 'ADD_TO_MY_TEAM':
      return  {
        ...counterState,
        counter: action.counter
      }
    case 'INCREASING':
      return  {
        ...counterState,
        currentDirection: 1,
      }
    case 'DECREASING':
      return  {
        ...counterState,
        currentDirection: -1,
    }
    case 'INCREASE_TURNS':
      console.log(action, counterState)
      return {
        ...counterState,
        turns: counterState.turns + 1
      }
    default:
      return {
        counter: counterState.counter,
        currentDirection: counterState.currentDirection,
        turns: counterState.turns
      }
  }
}
