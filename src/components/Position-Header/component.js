import React from 'react';

//what the dropdown will render will be based on the the prop we pass to displayPlayers based on
//what is set in the showPosition function. initially it will show all players but buttons
//bellow will change the value and render a different position header
class PositionHeader extends React.Component {
  render(){
    const {qb, wr, rb, te, def, k, displayPlayers, menu} = this.props
    if (displayPlayers === wr){
      return <div> Wide Receivers { menu ? <i className="fas menu-arrow fa-chevron-up"></i> : <i className="fas menu-arrow fa-chevron-down"></i> }</div>
    }else if (displayPlayers === rb){
      return <div> Running Backs { menu ? <i className="fas menu-arrow fa-chevron-up"></i> : <i className="fas menu-arrow fa-chevron-down"></i> }</div>
    }else if (displayPlayers === qb){
      return <div> Quarterbacks { menu ? <i className="fas menu-arrow fa-chevron-up"></i> : <i className="fas menu-arrow fa-chevron-down"></i> }</div>
    }else if (displayPlayers === te){
      return <div> Tight Ends { menu ? <i className="fas menu-arrow fa-chevron-up"></i> : <i className="fas menu-arrow fa-chevron-down"></i> }</div>
    }else if (displayPlayers === def){
      return <div> DST { menu ? <i className="fas menu-arrow fa-chevron-up"></i> : <i className="fas menu-arrow fa-chevron-down"></i> }</div>
    }else if (displayPlayers === k){
      return <div> Kickers { menu ? <i className="fas menu-arrow fa-chevron-up"></i> : <i className="fas menu-arrow fa-chevron-down"></i> }</div>
    }else {
      return <div> All Players { menu ? <i className="fas menu-arrow fa-chevron-up"></i> : <i className="fas menu-arrow fa-chevron-down"></i> }</div>
    }
  }
}

export default PositionHeader
