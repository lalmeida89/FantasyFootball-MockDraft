import React from 'react';
import {connect} from 'react-redux';
import { Transition } from 'react-transition-group';

import {
  showFavorites,
  showRosters,
  showDraftedPlayers
} from '../actions/showActions'
import '../styles/footer.css'

const duration = 400

const footerStyle = {
  transition: `height ${duration}ms`
}

const footerTransitionStyles = {
  entering: { height: '50px' },
  entered: { height: '50px' },
  exiting: { height: 0 },
  exited: { height: 0}
}

class Footer extends React.Component {
  render(){
    const {draftedPlayers, rosters, dispatch} = this.props
    console.log(this.props)
    let style={display: 'block'}
    return (
      <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
      <div className='footer' style={{
        ...footerStyle,
        ...footerTransitionStyles[state]}}>
        <div className={rosters
          ? 'checkedFooter rostersBtn footerButton'
          : 'rostersBtn footerButton'}
          onClick={()=>dispatch(showRosters())}>
          <i className="fas footerBtn fa-clipboard-list"></i>
          <label style={style}> team rosters </label>
        </div>
        <div className={draftedPlayers
          ? 'checkedFooter draftedPlayersBtn footerButton'
          : 'draftedPlayersBtn footerButton'}
          onClick={()=>dispatch(showDraftedPlayers())}>
          <i className="fas footerBtn fa-list-ol"></i>
          <label style={style}> players drafted</label>
        </div>
      </div>
    )}
    </Transition>
    )
  }
}

export const mapStateToProps = ({renderReducer}) => {
  return ({
    draftedPlayers: renderReducer.showDraftedPlayers,
    showFavorites: renderReducer.showFavorites,
    rosters: renderReducer.showRosters
  })
}

export default connect (mapStateToProps)(Footer)
