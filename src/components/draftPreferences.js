import DraftSetup from './reduxForm'
import React from 'react';
import {connect} from 'react-redux';
import {draftPageSubmit} from '../actions/draftPreferencesAction'


class DraftPage extends React.Component {
  // we simply dispatch the action creator and pass on the values of the form onSubmit
  submit = (values, team) => {
    const { dispatch, myTeam } = this.props;
    dispatch(draftPageSubmit(values, myTeam));
    //console.log(values);
  }
  render() {
    return (
      <DraftSetup onSubmit={this.submit} />
    );
  }
}

export const mapStateToProps = ({draftPreferencesReducer, teamReducer}) => {
  //console.log(draftPreferencesReducer);
  return ({
    teamCount: draftPreferencesReducer.teamCount
  })
}

export default connect(mapStateToProps)(DraftPage)
