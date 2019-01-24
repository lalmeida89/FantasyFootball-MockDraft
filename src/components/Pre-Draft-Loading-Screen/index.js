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

  componentWillUnmount() {
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
            <div className="progressBar-container">
                <div className="bar">
                  <span className="bar-unfill">
                  <span className="bar-fill"></span>
                  </span>
                </div>
              </div>
            <p className='loading-subtext'>{textThatChanges}</p>
            <p className='loading-mainText'>
              You can click on player to see the most recent player news and their schedule for the season.
              You can change what is being shown in the side bar by toggling between the two buttons in the footer.
              You can even make the side bar completely disappear by clicking on the arrow icon to the left of it.

            </p>
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
