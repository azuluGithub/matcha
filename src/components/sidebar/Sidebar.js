import React, { Component } from 'react';
import SidebarIcon from './SidebarIcon';
import SidebarContent from './SidebarContent';

export default class Sidebar extends Component {
    state = {
        isOpen: false
    }
    toggleSidebar = () => {
        this.setState(prevState => ({
        isOpen: !prevState.isOpen
        }))
    }
   
    render() {
        const {gender, handleChange,  ageRange, popularityRange} = this.props;
        return <div className="sidebar-container">
                    <div className="sidebar-icon">
                        <SidebarIcon
                            isOpen={this.state.isOpen}
                            handleClick={this.toggleSidebar}
                        />
                    </div>
                    <SidebarContent 
                        isOpen={this.state.isOpen}
                        gender={gender}
                        handleChange={handleChange}
                        ageRange={ageRange}
                        popularityRange={popularityRange}
                    />
            </div>
        }
}
