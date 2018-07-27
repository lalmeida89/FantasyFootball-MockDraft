import React from 'react';
import {connect} from 'react-redux';

import {
  showFavorites,
  showRosters,
  showDraftedPlayers
} from '../actions/showActions'
import '../styles/footer.css'

class Footer extends React.Component {
  render(){
    let style = {display: 'block'}
    return (
      <div className='footer'>
        <div style={style} className='rostersBtn'
          onClick={()=>this.props.dispatch(showRosters())}>
          <i className="fas footerBtn fa-clipboard-list"></i>
          <label style={style}>rosters</label>
        </div>
        <div style={style} className='favesBtn'
          onClick={()=>this.props.dispatch(showFavorites())}>
          <i className="fas footerBtn fa-star"></i>
          <label style={style}>favorites</label>
        </div>
        <div style={style} className='draftedPlayersBtn'
          onClick={()=>this.props.dispatch(showDraftedPlayers())}>
          <i className="fas footerBtn fa-list-ol"></i>
          <label style={style}>drafted</label>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = ({renderReducer}) => {
  return ({

  })
}

export default connect (mapStateToProps)(Footer)
