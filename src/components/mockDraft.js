import React, { Component } from 'react';
import Intro from './intro';
import RightSide from './rightSide';
import Footer from './footer';
import SideBarIcon from './sideBarIcon'

export default class MockDraft extends Component {
  state = {
    isOpen: true
  }

  toggleSideBar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  render() {
    const {isOpen} = this.state
    return (
      <div className="sidebar-container">
        <RightSide isOpen={isOpen} />
        <Footer isOpen={isOpen} />
        <Intro isOpen={isOpen} />
        <div className="sideBar-icon">
          <SideBarIcon
            isOpen={this.state.isOpen}
            handleClick={this.toggleSideBar}
          />
        </div>
      </div>
  )
  }
}
