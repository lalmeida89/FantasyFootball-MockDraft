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
    displayPlayers: []
};

export default (playersState = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PLAYERS_SUCCESS':
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
            error: null
          };
        case 'SHOW_POSITION' :
          return Object.assign({}, playersState, {
            displayPlayers: action.displayPlayers
          });
        case 'FILTERED_PLAYERS' :
          return Object.assign({}, playersState, {
            displayPlayers: action.filteredPlayersList
          });
        case 'SHOW_MENU' :
          return Object.assign({}, playersState, {
            menu: true
        });
        case 'HIDE_MENU' :
          return Object.assign({}, playersState, {
            menu: false
        });
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
            displayPlayers: playersState.displayPlayers
          };
        case 'ADD_TO_TEAM':
          //once we draft a player, we want him in the teams roster but removed from the
          //players array and the position array. So we use the filter method.
          const withPlayersRemoved = playersState.players.filter(el => {
            return el.playerId !== action.player.playerId;
          });
          const wrPlayersRemoved = playersState.wr.filter(wr => {
            return wr.playerId !== action.player.playerId;
          })
          const rbPlayersRemoved = playersState.rb.filter(rb => {
            return rb.playerId !== action.player.playerId;
          })
          const qbPlayersRemoved = playersState.qb.filter(qb => {
            return qb.playerId !== action.player.playerId;
          })
          const tePlayersRemoved = playersState.te.filter(te => {
            return te.playerId !== action.player.playerId;
          })
          const defPlayersRemoved = playersState.def.filter(def => {
            return def.playerId !== action.player.playerId;
          })
          const kPlayersRemoved = playersState.k.filter(k => {
            return k.playerId !== action.player.playerId;
          })
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
        case 'ADD_TO_MY_TEAM':
          //once we draft a player, we want him in the teams roster but removed from the
          //players array and the position array. So we use the filter method.
          const myPlayersRemoved = playersState.players.filter(el => {
            return el.playerId !== action.player.playerId;
          });
          const myWrPlayersRemoved = playersState.wr.filter(wr => {
            return wr.playerId !== action.player.playerId;
          })
          const myRbPlayersRemoved = playersState.rb.filter(rb => {
            return rb.playerId !== action.player.playerId;
          })
          const myQbPlayersRemoved = playersState.qb.filter(qb => {
            return qb.playerId !== action.player.playerId;
          })
          const myTePlayersRemoved = playersState.te.filter(te => {
            return te.playerId !== action.player.playerId;
          })
          const myDefPlayersRemoved = playersState.def.filter(def => {
            return def.playerId !== action.player.playerId;
          })
          const myKPlayersRemoved = playersState.k.filter(k => {
            return k.playerId !== action.player.playerId;
          })
        return {
          players: myPlayersRemoved,
          wr: myWrPlayersRemoved,
          qb: myQbPlayersRemoved,
          rb: myRbPlayersRemoved,
          te: myTePlayersRemoved,
          def: myDefPlayersRemoved,
          k: myKPlayersRemoved,
          displayPlayers: myPlayersRemoved
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
            menu: playersState.menu,
            displayPlayers: playersState.displayPlayers
          }
        }
}
