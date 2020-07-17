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

/*let dummyText = `Cupcake ipsum dolor. Sit amet chocolate chocolate I love lollipop dragée.
  I love jelly I love jujubes toffee. I love jujubes caramels brownie I love carrot cake sesame snaps fruitcake gingerbread.
  Cookie brownie gummies powder jelly. Jelly tiramisu I love. I love cookie tiramisu jelly beans.
  Chocolate cake I love lemon drops carrot cake. Danish jelly-o dragée lemon drops caramels jelly beans gummies.
  Chocolate tootsie roll jelly fruitcake. Cupcake jelly-o I love chocolate jelly-o I love. Fruitcake sugar plum tootsie roll.
  Chocolate jelly beans cake jelly I love. Pudding chocolate apple pie icing lollipop cake.`*/

const dummyText = `Welcome to my Mock Draft App. This app is not finished yet but feel free to play around with it.
  The concept of a Mock Draft is to practice drafting so you can see which players will most likely be available to you
  during a real draft. The AI will draft for the other teams in your league. When it is your turn to draft, click on 
  any player and you can see his schedule and projected stats for the upcoming season, as well as where he is in
  the team's current depth chart. If you like all that you see, you can click the draft button and add the player to your team.
  Feel free to play around and click on all the buttons and see all the different features I've implemented (so far!). Just click Demo to get started!`

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
