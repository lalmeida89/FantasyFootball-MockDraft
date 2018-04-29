export const SHOW_QB = 'SHOW_QB';
export const SHOW_WR = 'SHOW_WR';
export const SHOW_RB = 'SHOW_RB';
export const SHOW_TE = 'SHOW_TE';

export const showQB = displayPlayers => ({
    type: SHOW_QB,
    displayPlayers
});

export const showRB = displayPlayers => ({
    type: SHOW_RB,
    displayPlayers
});

export const showWR = displayPlayers => ({
    type: SHOW_WR,
    displayPlayers
});

export const showTE = displayPlayers => ({
    type: SHOW_TE,
    displayPlayers
});
