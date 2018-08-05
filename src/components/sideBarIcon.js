import React from 'react'

const SideBarIcon = ({isOpen}) => {
  return <div className='sidebarIcon'>
    {isOpen ?
      <i className="fas fa-arrow-right arrow-icon"></i> :
      <i className="fas fa-arrow-left arrow-icon"></i>
    }
  </div>
}

export default SideBarIcon
