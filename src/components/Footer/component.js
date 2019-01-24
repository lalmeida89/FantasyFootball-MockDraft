import React from 'react';
import '../../styles/footer.css';
import { Transition } from 'react-transition-group';

const duration = 400

const footerStyle = {
  transition: `height ${duration}ms`
}

const footerTransitionStyles = {
  entering: { height: 0 },
  entered: { height: '50px' },
  exiting: { height: 0 },
  exited: { height: 0}
}

class Footer extends React.Component {
  render(){
    const {draftedPlayers, rosters, isOpen,
          showRosters, showDraftedPlayers
          } = this.props
    let style={display: 'block'}
    return (
      <Transition in={isOpen} timeout={duration}>
      {(state) => (
      <div className='footer' style={{
        ...footerStyle,
        ...footerTransitionStyles[state]}}>
        <div className={rosters
          ? 'checkedFooter rostersBtn footerButton'
          : 'rostersBtn footerButton'}
          onClick={()=>showRosters()}>
          <i className="fas footerBtn fa-clipboard-list"></i>
          <label style={style}> team rosters </label>
        </div>
        <div className={draftedPlayers
          ? 'checkedFooter draftedPlayersBtn footerButton'
          : 'draftedPlayersBtn footerButton'}
          onClick={()=>showDraftedPlayers()}>
          <i className="fas footerBtn fa-list-ol"></i>
          <label style={style}> players drafted</label>
        </div>
      </div>
    )}
    </Transition>
  )}
}

export default Footer
