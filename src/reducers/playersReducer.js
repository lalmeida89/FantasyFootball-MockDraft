
const initialState = {
    players: [],
    loading: true,
    error: null,
    wr: [],
    qb: [],
    rb: [],
    te: [],
    def: [],
    k: [],
    displayPlayers: [],
    currentPlayer: null,
    playerProfile: null,
    notes: true,
    schedule: false,
    menu: false
};

export default (playersState = initialState, action) => {
  console.log(action.type)
    switch (action.type) {
        case 'FETCH_PLAYERS_SUCCESS':
          console.log(action);
          return {
            ...playersState,
            qb: [...playersState.qb,...action.qb],
            wr: [...playersState.wr,...action.wr],
            te: [...playersState.te,...action.te],
            rb: [...playersState.rb,...action.rb],
            def: [...playersState.def, ...action.def],
            k: [...playersState.k,...action.k],
            players: [...playersState.players, ...action.wr, ...action.qb, ...action.rb, ...action.te, ...action.k, ...action.def],
            displayPlayers: [...playersState.players, ...action.wr, ...action.qb, ...action.rb, ...action.te, ...action.k, ...action.def],
            loading: false,
            error: null,
            menu: playersState.menu,
            currentPlayer: playersState.currentPlayer
          };
        case 'SHOW_POSITION' :
          console.log(action);
          return Object.assign({}, playersState, {
            displayPlayers: action.displayPlayers,
            currentPlayer: 0,
            playerProfile: null
          });
        case 'SHOW_NOTES' :
          console.log(action);
          return Object.assign({}, playersState, {
            notes: true,
            schedule: false
        });
        case 'SHOW_MENU' :
          console.log(action);
          return Object.assign({}, playersState, {
            menu: true
        });
        case 'HIDE_MENU' :
          console.log(action);
          return Object.assign({}, playersState, {
            menu: false
        });
        case 'SHOW_SCHEDULE' :
          console.log(action);
          return Object.assign({}, playersState, {
            notes: false,
            schedule: true
        })
        case 'FETCH_PLAYERS_ERROR':
          return {
            loading: true,
            error: action.error,
            players: playersState.players,
            wr: playersState.wr,
            qb: playersState.qb,
            rb: playersState.rb,
            te: playersState.te,
            def: playersState.def,
            k: playersState.k,
            menu: playersState.menu,
            currentPlayer: playersState.currentPlayer,
            displayPlayers: playersState.displayPlayers
          };
        case 'FETCH_PLAYERS_REQUEST':
          return {
            loading: true,
            error: null,
            players: playersState.players,
            wr: playersState.wr,
            qb: playersState.qb,
            rb: playersState.rb,
            te: playersState.te,
            def: playersState.def,
            k: playersState.k,
            menu: playersState.menu,
            currentPlayer: playersState.currentPlayer,
            displayPlayers: playersState.displayPlayers
          };
        case 'SET_CURRENT_PLAYER':
          console.log(action);
          return Object.assign({}, playersState, {
            currentPlayer: action.id
          });
        case 'HIDE_PLAYER_PROFILE':
          console.log(action);
          return Object.assign({}, playersState, {
            currentPlayer: 0,
            playerProfile: null
          });
        case 'SET_PLAYER_PROFILE':
          console.log(action, playersState)
          return {
            playerProfile: action.profile,
            loading: false,
            error: null,
            players: playersState.players,
            wr: playersState.wr,
            qb: playersState.qb,
            rb: playersState.rb,
            te: playersState.te,
            def: playersState.def,
            k: playersState.k,
            displayPlayers: playersState.displayPlayers,
            notes: true,
            menu: playersState.menu,
            currentPlayer: playersState.currentPlayer
          };
        case 'DRAFT_PLAYER':
          const withPlayersRemoved = playersState.players.filter(player => {
            return player.id !== action.playersUsed[0].id
          })
          const wrPlayersRemoved = playersState.wr.filter(wr => {
            return wr.id !== action.playersUsed[0].id
          })
          const rbPlayersRemoved = playersState.rb.filter(rb => {
            return rb.id !== action.playersUsed[0].id
          })
          const qbPlayersRemoved = playersState.qb.filter(qb => {
            return qb.id !== action.playersUsed[0].id
          })
          const tePlayersRemoved = playersState.te.filter(te => {
            return te.id !== action.playersUsed[0].id
          })
          const defPlayersRemoved = playersState.def.filter(def => {
            return def.id !== action.playersUsed[0].id
          })
          const kPlayersRemoved = playersState.k.filter(k => {
            return k.id !== action.playersUsed[0].id
          })
          console.log(withPlayersRemoved)
          console.log(action, playersState);
          return {
            players: withPlayersRemoved,
            wr: wrPlayersRemoved,
            qb: qbPlayersRemoved,
            rb: rbPlayersRemoved,
            te: tePlayersRemoved,
            def: defPlayersRemoved,
            k: kPlayersRemoved,
            displayPlayers: withPlayersRemoved
          }
        default:
          return {
            loading: playersState.loading,
            error: null,
            players: playersState.players,
            wr: playersState.wr,
            qb: playersState.qb,
            rb: playersState.rb,
            te: playersState.te,
            def: playersState.def,
            k: playersState.k,
            playersUsed: playersState.playersUsed,
            notes: playersState.notes,
            schedule: playersState.schedule,
            menu: playersState.menu,
            currentPlayer: playersState.currentPlayer,
            displayPlayers: playersState.displayPlayers
          }
        }
}
