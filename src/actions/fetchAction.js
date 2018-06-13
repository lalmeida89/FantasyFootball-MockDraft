
export const loadPlayers = formattedRespObj => ({
    type: 'FETCH_PLAYERS_SUCCESS',
    players: [...formattedRespObj.players],
    wr: formattedRespObj.wr,
    qb: formattedRespObj.qb,
    rb: formattedRespObj.rb,
    te: formattedRespObj.te,
    def: formattedRespObj.def,
    k: formattedRespObj.k
});

/*Our fetch response just gives us an array of players (and sometimes defensive players which we dont want)
so we reformat the response for the players based on their position and push them onto arrays. we then
refer back to these players on FETCH SUCCESS
*/

function formatRespObj(playersResp) {
    let formattedRespObj = {players: [], wr: [], qb: [], rb: [], te: [], def: [], k: []};

    // Note, this can probably be prettier
    for (let i = 0; i < playersResp.length; i++) {

        switch (playersResp[i].position) {
            case 'WR':
                formattedRespObj.wr.push(playersResp[i]);
                break;
            case 'QB':
                formattedRespObj.qb.push(playersResp[i]);
                break;
            case 'RB':
                formattedRespObj.rb.push(playersResp[i]);
                break;
            case 'TE':
                formattedRespObj.te.push(playersResp[i]);
                break;
            case 'DEF':
                formattedRespObj.def.push(playersResp[i]);
                break;
            case 'K':
                formattedRespObj.k.push(playersResp[i]);
                break;
            default:
                break;
        }
    }

    formattedRespObj.players = [
      ...formattedRespObj.wr,
      ...formattedRespObj.qb,
      ...formattedRespObj.rb,
      ...formattedRespObj.te,
      ...formattedRespObj.def,
      ...formattedRespObj.k
    ]
    return formattedRespObj;
}

/* Fetch from the NFL API. Their ADP (average draft position) url only sends back 100 players at a time,
so we map through the fetch with offsets of 100 each time and combine them all */

export const fetchPlayers = () => {
    return dispatch => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const urls = [
          "http://api.fantasy.nfl.com/v1/players/editordraftranks?count=100&format=json",
          "http://api.fantasy.nfl.com/v1/players/editordraftranks?count=200&offset=100&format=json",
          "http://api.fantasy.nfl.com/v1/players/editordraftranks?count=300&offset=200&format=json",
          "http://api.fantasy.nfl.com/v1/players/editordraftranks?count=400&offset=300&format=json"
        ];
        dispatch(fetchPlayersRequest())
        urls.map(url=> {
            fetch(proxyurl + url)
                .then(res => res.json())
                .then(response => {
                    console.log(response.players);
                    let formattedRespObj = formatRespObj(response.players);
                    dispatch(loadPlayers(formattedRespObj));
                    console.log('success:', formattedRespObj);
                })
                .catch(error => {
                    console.error('Error:', error);
                    dispatch(fetchPlayersError(error));
                })
        })
    }
};

export const FETCH_PLAYERS_ERROR = 'FETCH_PLAYERS_ERROR';
export const fetchPlayersError = error => ({
    type: FETCH_PLAYERS_ERROR,
    error
});

export const FETCH_PLAYERS_REQUEST = 'FETCH_PLAYERS_ERROR';
export const fetchPlayersRequest = loading => ({
    type: FETCH_PLAYERS_REQUEST,
    loading
});
