import React from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

const SidebarIcon = ({handleClick, isOpen}) => {
  return <span onClick={handleClick}>
    {isOpen ? <FaTimes /> : <FaBars/>}
  </span>
}

export default SidebarIcon;