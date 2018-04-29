import {
    FETCH_PLAYERS_REQUEST,
    FETCH_PLAYERS_ERROR,
} from './fetchAction';

import {
  SHOW_TE,
  SHOW_RB,
  SHOW_WR,
  SHOW_QB
} from './showActions'

import {
  SET_CURRENT_PLAYER,
  SET_PLAYER_PROFILE
} from './setCurrentPlayerAction'

const initialState = {
    players: [],
    loading: false,
    error: null,
    wr: [],
    qb: [],
    rb: [],
    te: [],
    displayPlayers: [],
    currentPlayer: 0,
    profile: []
};

export default (playersState = initialState, action) => {
  console.log(action.type)
    switch (action.type) {
        case 'FETCH_PLAYERS_SUCCESS':
          console.log(action);
          return {
            ...playersState,
            qb: [...action.qb],
            wr: [...action.wr],
            te: [...action.te],
            rb: [...action.rb],
            players: [...action.wr, ...action.qb, ...action.rb, ...action.te],
            displayPlayers: [...action.wr, ...action.qb, ...action.rb, ...action.te],
            loading: false,
            error: null
          };

        case 'SHOW_QB' :
          console.log(action);
          return Object.assign({}, playersState, {
            displayPlayers: playersState.qb
          });
        case 'SHOW_WR' :
          console.log(action);
          return Object.assign({}, playersState, {
            displayPlayers: playersState.wr
          });
        case 'SHOW_RB' :
          console.log(action);
          return Object.assign({}, playersState, {
            displayPlayers: playersState.rb
          });
        case 'SHOW_TE' :
          console.log(action);
          return Object.assign({}, playersState, {
            displayPlayers: playersState.te
          });
        case 'FETCH_PLAYERS_ERROR':
          return {
            loading: true,
            error: action.error,
            players: playersState.players,
            wr: playersState.wr,
            qb: playersState.qb,
            rb: playersState.rb,
            te: playersState.te
          };
        case 'FETCH_PLAYERS_REQUEST':
          return {
            loading: true,
            error: null,
            players: playersState.players,
            wr: playersState.wr,
            qb: playersState.qb,
            rb: playersState.rb,
            te: playersState.te
          };
        case 'SET_CURRENT_PLAYER':
          console.log(action);
          return Object.assign({}, playersState, {
            currentPlayer: action.id
          });
        case 'SET_PLAYER_PROFILE':
          console.log(action, playersState)
          return {
            profile: action.profile,
            loading: false,
            error: null,
            players: playersState.players,
            wr: playersState.wr,
            qb: playersState.qb,
            rb: playersState.rb,
            te: playersState.te,
            displayPlayers: playersState.displayPlayers
          };
        default:
          return {
            loading: true,
            error: null,
            players: playersState.players,
            wr: playersState.wr,
            qb: playersState.qb,
            rb: playersState.rb,
            te: playersState.te,
            profile: playersState.profile
          }
        }
    return playersState;
}
