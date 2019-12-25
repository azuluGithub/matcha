import React from 'react';
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const SidebarIcon = ({handleClick, isOpen}) => {
  return <span onClick={handleClick}>
    {isOpen ? <FaArrowCircleLeft /> : <FaArrowCircleRight/>}
  </span>
}

export default SidebarIcon;