import React from 'react';
import {connect} from 'react-redux';

const textArray = [
  "Get ready, it's about to start",
  "Loading most recent player data",
  "Bothering GMs for the latest player news",
  "Trying to cheer up our server who's a little down at the moment"
];

class LoadingScreen extends React.Component {
  constructor() {
    super();
    this.state = { textIdx: 0 };
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      let currentIdx = this.state.textIdx;
      this.setState({ textIdx: currentIdx + 1 });
    }, 1500);
  }

  componentDidUnmount() {
    clearInterval(this.timeout);
  }

  render(){
    let textThatChanges = textArray[this.state.textIdx % textArray.length];
    const { renderLoadingScreen } = this.props

    if (!renderLoadingScreen){
      return null
    }

    else if (renderLoadingScreen) {
      return (
        <div className="playerCard-background">
          <div className="loading-page">
            <p><span>{textThatChanges}</span></p>
          </div>
        </div>
      )
    }
  }
}

export const mapStateToProps = ({ draftPreferencesReducer }) => {
  return({
    renderLoadingScreen : draftPreferencesReducer.initialLoading
  })
}

export default connect(mapStateToProps)(LoadingScreen)

/*MarkLausten@carfax.com>
elias.mason@thinkful.com

https://calendly.com/bermudezstephanie/30-mins*/
