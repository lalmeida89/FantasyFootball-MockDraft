import React from 'react';

import {Button} from '../../styledComponents/dropdown';
import PositionHeader from './../Position-Header';

export class PositionDropdownMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showMenu: false,
      currentPositionSelected: ''
    }
  }
  renderDropdownMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }));
  }

  render(){
    const {showMenu, currentPositionSelected} = this.state;
    const {
      allPlayers,
      qb,
      rb,
      wr,
      te,
      def,
      k,
      filterByPosition
    } = this.props;

    const displayPosition = position => {
      this.setState({currentPositionSelected: position})
      filterByPosition(position);
    }

    return(
        <div className='dropdownMenu-wrapper' onClick={()=> this.renderDropdownMenu()}>
          <PositionHeader position={currentPositionSelected}/>
          {showMenu ?
            <div>
              <div className='dropdownMenu-container'>
                <p className='dropdownMenu-options'>
                  <span onClick={()=>displayPosition(allPlayers)}>All</span>
                  <span onClick={()=>displayPosition(qb)}>QB</span>
                  <span onClick={()=>displayPosition(rb)}>RB</span>
                  <span onClick={()=>displayPosition(wr)}>WR</span>
                  <span onClick={()=>displayPosition(te)}>TE</span>
                  <span onClick={()=>displayPosition(def)}>DST</span>
                  <span onClick={()=>displayPosition(k)}>PK</span>
                </p>
              </div>
            <div className='dropdownMenu-outerDiv'></div>
            </div>
            : null }

      </div>
    )
  }
}
