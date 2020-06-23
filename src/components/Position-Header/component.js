import React from 'react';

//what the dropdown will render will be based on the the prop we pass to displayPlayers based on
//what is set in the showPosition function. initially it will show all players but buttons
//bellow will change the value and render a different position header
class PositionHeader extends React.Component {
  render(){
    const {
      qb,
      wr,
      rb,
      te,
      def,
      k,
      displayPlayers,
      menu
    } = this.props

    const displayHeader = position => {
      let msg;
      if (position === wr){
        msg = 'WR'
      }else if (position === rb){
        msg = 'RB'
      }else if (position === qb){
        msg = 'QB'
      }else if (position === te){
        msg = 'TE'
      }else if (position === def){
        msg = 'DS'
      }else if (position === k){
        msg = 'PK'
      }else {
        msg = 'POS'
      }
      return msg
    }

    return (
      <div className='positionHeader-display'>
        <h4> {displayHeader(this.props.position)} </h4>
      </div>
    )
  }
}

export default PositionHeader
