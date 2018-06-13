import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {teamCountChange} from '../actions/draftPreferencesAction'

class DraftSetup extends Component {

  handleOnChange = number => {
    this.props.dispatch(teamCountChange(number))
  }

  render() {
    const { handleSubmit, teamCount } = this.props;
    console.log(this.props, teamCount)
    if (this.props.showSettingsPage){
    return (
      <form className="draftDetails" onSubmit={handleSubmit}>
        <div className="topHalf">
        <div className="scoringRules">
          <label>League Scoring</label>
          <div>
            <label><Field name="scoring" component="input" type="radio" value="standard" checked='true'/> Standard</label>
            <label><Field name="scoring" component="input" type="radio" value="halfPPR" disabled/> Half PPR (Coming Soon!)</label>
            <label><Field name="scoring" component="input" type="radio" value="PPR" disabled /> PPR (Coming Soon!)</label>
          </div>
        </div>
        <div className="draftType">
          <label>Draft Type</label>
          <div>
            <label><Field name="drafting" component="input" type="radio" value="snake" checked='true'/> Snake</label>
            <label><Field name="drafting" component="input" type="radio" value="auction" disabled/> Auction (Coming Soon!)</label>
          </div>
        </div>
        <div className="countAndOrder">
        <div className="teamCount">
          <label>Number of Teams</label>
          <div>
            <Field
              name="numberOfTeams"
              component="select"
              onChange={event=>this.handleOnChange(event.currentTarget.value)}>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
              <option value="32">32</option>
            </Field>
          </div>
        </div>

        <div className="draftPosition">
          <label>Draft Position</label>
          <div>
            <Field name="draftOrder" component="select">
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
              { teamCount >= 5 ? <option value="5">5th</option> : null }
              { teamCount >= 6 ? <option value="6">6th</option> : null }
              { teamCount >= 7 ? <option value="7">7th</option> : null }
              { teamCount >= 8 ? <option value="8">8th</option> : null }
              { teamCount >= 9 ? <option value="9">9th</option> : null }
              { teamCount >= 10 ? <option value="10">10th</option> : null }
              { teamCount >= 11 ? <option value="11">11th</option> : null }
              { teamCount >= 12 ? <option value="12">12th</option> : null }
              { teamCount >= 13 ? <option value="13">13th</option> : null }
              { teamCount >= 14 ? <option value="14">14th</option> : null }
              { teamCount >= 15 ? <option value="15">15th</option> : null }
              { teamCount >= 16 ? <option value="16">16th</option> : null }
              { teamCount >= 17 ? <option value="17">17th</option> : null }
              { teamCount >= 18 ? <option value="18">18th</option> : null }
              { teamCount >= 19 ? <option value="19">19th</option> : null }
              { teamCount >= 20 ? <option value="20">20th</option> : null }
              { teamCount >= 21 ? <option value="21">21st</option> : null }
              { teamCount >= 22 ? <option value="22">22nd</option> : null }
              { teamCount >= 23 ? <option value="23">23rd</option> : null }
              { teamCount >= 24 ? <option value="24">24th</option> : null }
              { teamCount >= 25 ? <option value="25">25th</option> : null }
              { teamCount >= 26 ? <option value="26">26th</option> : null }
              { teamCount >= 27 ? <option value="27">27th</option> : null }
              { teamCount >= 28 ? <option value="28">28th</option> : null }
              { teamCount >= 29 ? <option value="29">29th</option> : null }
              { teamCount >= 30 ? <option value="30">30th</option> : null }
              { teamCount >= 31 ? <option value="31">31st</option> : null }
              { teamCount >= 32 ? <option value="32">32nd</option> : null }

            </Field>
          </div>
        </div>
        </div>
        </div>

        <div className="bottomHalf">
        <div className='rosterSetup'>
          <h3> Roster Settings </h3>
          <div className='mainStarters'>
          <div>
            <label>QB </label>
            <Field name='qbCount' component='select'>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </Field>
          </div>
          <div>
            <label>RB </label>
            <Field name='rbCount' component='select'>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
            </Field>
          </div>
          <div>
            <label>WR </label>
            <Field name='wrCount' component='select'>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
            </Field>
          </div>
          <div>
            <label>TE </label>
            <Field name='teCount' component='select'>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </Field>
          </div>
          </div>
          <div className="flexPlayers">
            <h4> FLEX </h4>
          <div>
            <label> WR / RB </label>
            <Field name='wrRbFlexCount' component='select'>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Field>
          </div>
          <div>
            <label> WR / TE </label>
            <Field name='wrTeFlexCount' component='select'>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Field>
          </div>
          <div>
            <label> RB / TE </label>
            <Field name='rbTeFlexCount' component='select'>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Field>
          </div>
          <div>
            <label> WR / RB / TE </label>
            <Field name='wrRbTeFlexCount' component='select'>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Field>
          </div>
          <div>
            <label> QB / WR / RB / TE </label>
            <Field name='qbWrRbTeFlexCount' component='select'>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Field>
          </div>
          </div>
          <div className="finalThree">
            <div>
              <label> DST </label>
              <Field name='dstCount' component='select'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </Field>
            </div>
            <div>
              <label> KICKER </label>
              <Field name='kCount' component='select'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </Field>
            </div>
            <div>
              <label>BENCH </label>
              <Field name='benchCount' component='select'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </Field>
            </div>
          </div>
        </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }

    else if(!this.props.showSettingsPage){
      return null
    }
  }
}
export const mapStateToProps = ({draftPreferencesReducer}) => {
  return ({
    teamCount: draftPreferencesReducer.teamCount,
    showSettingsPage: draftPreferencesReducer.showSettingsPage
  })
}
// Decorate the form component
DraftSetup = reduxForm({
  form: 'draft-settings', // a unique name for this form
  initialValues: {
       numberOfTeams: 12,
       draftOrder: 7,
       qbCount: 1,
       rbCount: 2,
       wrCount: 2,
       teCount: 1,
       wrRbFlexCount: 0,
       wrTeFlexCount: 0,
       wrRbTeFlexCount: 1,
       qbWrRbTeFlexCount: 0,
       dstCount: 1,
       kCount: 1,
       benchCount: 6
   },
   enableReinitialize : true
})(DraftSetup);

export default connect (mapStateToProps)(DraftSetup)
