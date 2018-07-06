import DraftSetup from './reduxForm'
import React from 'react';
import {connect} from 'react-redux';
import {draftPageSubmit} from '../actions/draftPreferencesAction'


class DraftPage extends React.Component {
  submit = (values) => {
    const { dispatch, myTeam } = this.props;
    // Do something with the form values
    dispatch(draftPageSubmit(
      values.numberOfTeams,
      values.draftOrder,
      values.qbCount,
      values.rbCount,
      values.wrCount,
      values.teCount,
      values.wrRbFlexCount,
      values.wrTeFlexCount,
      values.rbTeFlexCount,
      values.wrRbTeFlexCount,
      values.qbWrRbTeFlexCount,
      values.dstCount,
      values.kCount,
      values.benchCount,
      myTeam
    ));
    console.log(values);
  }
  render() {
    return (
      <DraftSetup onSubmit={this.submit} />
    );
  }
}

export const mapStateToProps = ({draftPreferencesReducer, teamReducer}) => {
  console.log(draftPreferencesReducer);
  return ({
    teamCount: draftPreferencesReducer.teamCount,
    myTeam: teamReducer.myTeam
  })
}

export default connect(mapStateToProps)(DraftPage)
