
export const loadPlayers = formattedRespObj => ({
    type: 'FETCH_PLAYERS_SUCCESS',
    players: formattedRespObj.players,
    wr: formattedRespObj.wr,
    qb: formattedRespObj.qb,
    rb: formattedRespObj.rb,
    te: formattedRespObj.te
});

function formatRespObj(playersResp) {
    let formattedRespObj = {players: [], wr: [], qb: [], rb: [], te: []};

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
            default:
                break;
        }
    }

    //formattedRespObj.players = [...formattedRespObj.wr, ...formattedRespObj.qb, ...formattedRespObj.rb, ...formattedRespObj.te];
    //formattedRespObj.players = { wr: formattedRespObj.wr,}
    return formattedRespObj;
}

export const fetchPlayers = () => {
    return dispatch => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2017&format=json"; // site that doesn’t send Access-Control-*
        dispatch(fetchPlayersRequest())
        fetch(proxyurl + url)
            .then(res => res.json())
            .then(response => {
                let formattedRespObj = formatRespObj(response.players);
                dispatch(loadPlayers(formattedRespObj));
                console.log('success:', formattedRespObj);
                //dispatch(fetchPlayersSuccess(response.players))
            })
            .catch(error => {
                console.error('Error:', error);
                dispatch(fetchPlayersError(error));
            });
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
