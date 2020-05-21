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
            return el.id !== action.player.id;
          });
          const wrPlayersRemoved = playersState.wr.filter(wr => {
            return wr.id !== action.player.id;
          })
          const rbPlayersRemoved = playersState.rb.filter(rb => {
            return rb.id !== action.player.id;
          })
          const qbPlayersRemoved = playersState.qb.filter(qb => {
            return qb.id !== action.player.id;
          })
          const tePlayersRemoved = playersState.te.filter(te => {
            return te.id !== action.player.id;
          })
          const defPlayersRemoved = playersState.def.filter(def => {
            return def.id !== action.player.id;
          })
          const kPlayersRemoved = playersState.k.filter(k => {
            return k.id !== action.player.id;
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
            return el.id !== action.player.id;
          });
          const myWrPlayersRemoved = playersState.wr.filter(wr => {
            return wr.id !== action.player.id;
          })
          const myRbPlayersRemoved = playersState.rb.filter(rb => {
            return rb.id !== action.player.id;
          })
          const myQbPlayersRemoved = playersState.qb.filter(qb => {
            return qb.id !== action.player.id;
          })
          const myTePlayersRemoved = playersState.te.filter(te => {
            return te.id !== action.player.id;
          })
          const myDefPlayersRemoved = playersState.def.filter(def => {
            return def.id !== action.player.id;
          })
          const myKPlayersRemoved = playersState.k.filter(k => {
            return k.id !== action.player.id;
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
