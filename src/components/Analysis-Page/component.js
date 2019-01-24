import React from 'react';
import '../../styles/finalPage.css'
import ShowAllTeams from './ShowAllTeams'

const AnalysisPage = props => {
  return <ShowAllTeams teams={props.teams} draftPos={props.draftPos} finalPage={props.finalPage} />
}

export default AnalysisPage
