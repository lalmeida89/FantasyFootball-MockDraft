import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {teamCountChange} from '../../actions/draftPreferencesAction'
import '../../styles/draftPreferences.css';

class DraftSetup extends Component {

  handleOnChange = number => {
    this.props.dispatch(teamCountChange(number))
  }

  render() {
    //settingsPage is set to true to start. This component renders at the start of the app.
    //It's just a reduxForm with select and radio buttons whose values then get passed to the
    //draftPreferences component and then saved in the store
    const {handleSubmit, teamCount, showSettingsPage} = this.props;
    if (showSettingsPage){
    return (
      <div className='reduxFormDiv'>
      <form className="draftDetails" onSubmit={handleSubmit}>
        <div className="topHalf">
        <h3 className='redux-header' style={{textAlign:'center'}}> Customize Your Draft </h3>
        <div className="countAndOrder">
        <div className="teamCount">
          <label><b className='labelHeader'>No. of Teams</b></label>
          <div>
            <Field
              className='positionCount'
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
          <label><b className='labelHeader'>Draft Position</b></label>
          <div>
            <Field
              name="draftOrder"
              component="select"
              className='positionCount'>
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

        <div className='rosterSetup'>
          <h3 className='rosterHeader'> Roster Settings </h3>
          <div className='mainStarters'>

              <label>QB </label>
              <Field name='qbCount' className='positionCount' component='select'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </Field>

              <label>RB </label>
              <Field name='rbCount' className='positionCount' component='select'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
              </Field>

              <label>WR </label>
              <Field name='wrCount' className='positionCount' component='select'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
              </Field>

              <label>TE </label>
              <Field name='teCount' className='positionCount' component='select'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </Field>

              <label> KICKER </label>
              <Field name='kCount' className='positionCount' component='select'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </Field>

              <label> DST </label>
              <Field name='dstCount' className='positionCount' component='select'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </Field>

              <label>BENCH </label>
              <Field name='benchCount' className='positionCount' component='select'>
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

              <label> WR / RB </label>
              <Field name='wrRbFlexCount' className='positionCount' component='select'>
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

              <label> WR / TE </label>
              <Field name='wrTeFlexCount' className='positionCount' component='select'>
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

              <label> RB / TE </label>
              <Field name='rbTeFlexCount' className='positionCount' component='select'>
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

              <label> WR / RB / TE </label>
              <Field name='wrRbTeFlexCount' className='positionCount' component='select'>
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

              <label > QB / WR / RB / TE </label>
              <Field name='qbWrRbTeFlexCount' className='positionCount' component='select'>
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
    <button className='submitButton' type="submit">Submit</button>
</form>
</div>
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
       draftOrder: 1,
       qbCount: '1',
       rbCount: '2',
       wrCount: '2',
       teCount: '1',
       rbTeFlexCount: '0',
       wrRbFlexCount: '0',
       wrTeFlexCount: '0',
       wrRbTeFlexCount: '1',
       qbWrRbTeFlexCount: '0',
       dstCount: '1',
       kCount: '1',
       benchCount: '6'
   },
   enableReinitialize : true
})(DraftSetup);

export default connect (mapStateToProps)(DraftSetup)
