import React from 'react';
import DraftPage from './../Draft-Preferences';
import '../../styles/draftPreferences.css';

const demoDraftSettings = {
     numberOfTeams: 12,
     draftOrder: 7,
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
}

let dummyText = `Cupcake ipsum dolor. Sit amet chocolate chocolate I love lollipop dragée.
  I love jelly I love jujubes toffee. I love jujubes caramels brownie I love carrot cake sesame snaps fruitcake gingerbread.
  Cookie brownie gummies powder jelly. Jelly tiramisu I love. I love cookie tiramisu jelly beans.
  Chocolate cake I love lemon drops carrot cake. Danish jelly-o dragée lemon drops caramels jelly beans gummies.
  Chocolate tootsie roll jelly fruitcake. Cupcake jelly-o I love chocolate jelly-o I love. Fruitcake sugar plum tootsie roll.
  Chocolate jelly beans cake jelly I love. Pudding chocolate apple pie icing lollipop cake.`

export default class LandingPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showCustomDraft: false
    }
  }

  handleOnChange = () => {
    console.log(this.state);
    this.setState({
      showCustomDraft: true
    })
  }
  render() {
    //console.table(this.props);
    const {draftPageSubmit, showSettingsPage} = this.props;
    if (showSettingsPage) {
      return (
        <div className='reduxFormDiv'>
          {this.state.showCustomDraft ?
            <DraftPage /> :
          <div className='draftDetails'>
            <h2> Mock Draft App </h2>
            <div className='landingPage-wrapper'>
            <div>
              <p> {dummyText} </p>
            </div>
            <div className='landingPageButton-wrapper'>
              <div>
                <button className='submitButton' onClick={()=>draftPageSubmit(demoDraftSettings)}> Demo </button>
              </div>
              <div>
                <button className='submitButton' onClick={()=>this.handleOnChange()}> Custom </button>
              </div>
            </div>
            </div>
          </div>
        }
        </div>
      )
    } else {
      return null
    }
  }
}
