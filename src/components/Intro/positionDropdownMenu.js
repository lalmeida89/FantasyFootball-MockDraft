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
      isOpen,
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
              <div className='dropdownMenu-container'
              id={!isOpen ?
                'dropdownMenu-container-extended':
                'dropdownMenu-container-shortened'}>
                <span className='dropdownMenu-options'>
                  <p><span onClick={()=>displayPosition(allPlayers)}>ALL</span></p>
                  <p><span onClick={()=>displayPosition(qb)}>QB</span></p>
                  <p><span onClick={()=>displayPosition(rb)}>RB</span></p>
                  <p><span onClick={()=>displayPosition(wr)}>WR</span></p>
                  <p><span onClick={()=>displayPosition(te)}>TE</span></p>
                  <p><span onClick={()=>displayPosition(def)}>DST</span></p>
                  <p><span onClick={()=>displayPosition(k)}>PK</span></p>
                </span>
              </div>
            <div className='dropdownMenu-outerDiv'></div>
            </div>
            : null }

      </div>
    )
  }
}
