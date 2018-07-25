export const SHOW_POSITION = 'SHOW_POSITION';
export const SHOW_NOTES = 'SHOW_NOTES';
export const SHOW_SCHEDULE = 'SHOW_SCHEDULE';
export const SHOW_MENU = 'SHOW_MENU';
export const HIDE_MENU = 'HIDE_MENU';
export const SHOW_TEAM_MENU = 'SHOW_TEAM_MENU';
export const HIDE_TEAM_MENU = 'HIDE_TEAM_MENU';
export const SHOW_CURRENT_TEAM = 'SHOW_CURRENT_TEAM';

/* Depending on the button click on the intro component, we can filter what position we'd like to see,
setting the props to be the displayPlayers and then rendering the displayPlayers. Notes and Schedules just
sets them to true or false so that we can just see news and notes from a player or their schedule based
on what button is clicked*/


export const showPosition = displayPlayers => ({
    type: SHOW_POSITION,
    displayPlayers
});

export const showNotes = notes => ({
  type: SHOW_NOTES,
  notes
})

export const showSchedule = schedule => ({
  type: SHOW_SCHEDULE,
  schedule
})

export const showMenu = menu => ({
  type: SHOW_MENU,
  menu
})

export const hideMenu = menu => ({
  type: HIDE_MENU,
  menu
})



export const showCurrentTeam = (currentTeam, teamNumber) => ({
    type: SHOW_CURRENT_TEAM,
    currentTeam,
    teamNumber
});

export const hideTeamMenu = menu => ({
  type: HIDE_TEAM_MENU,
  menu
})

export const showTeamMenu = menu => ({
  type: SHOW_TEAM_MENU,
  menu
})
