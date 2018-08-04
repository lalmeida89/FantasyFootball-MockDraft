import React from 'react'


const SideBarIcon = ({handleClick, isOpen}) => {
  return <span style={{position: 'absolute', top: '50px'}}onClick={handleClick}>
    {isOpen ?
      <i className="fas fa-angle-double-right"></i> :
      <i className="fas fa-angle-double-left"></i>
    }
  </span>
}

export default SideBarIcon
