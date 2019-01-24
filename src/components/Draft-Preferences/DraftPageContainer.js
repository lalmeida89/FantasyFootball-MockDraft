import React from 'react';
import DraftPage from './component'

// we simply dispatch the action creator and pass on the values of the form onSubmit
class DraftPageContainer extends React.Component {
  submitForm = (values, team) => {
    const { draftPageSubmit, myTeam } = this.props;
    draftPageSubmit(values, myTeam);
  }
  render() {
    return (
      <DraftPage submit={this.submitForm} />
    );
  }
}

export default DraftPageContainer
