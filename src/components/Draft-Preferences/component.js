import React from 'react';
import DraftSetup from './../Redux-Form';

const DraftPage = props => {
  return <DraftSetup onSubmit={props.submit} />
}

export default DraftPage
