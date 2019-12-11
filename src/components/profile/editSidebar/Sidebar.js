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
        return <div className="edit-sidebar-container">
                    <div className="sidebar-icon">
                        <SidebarIcon
                            isOpen={this.state.isOpen}
                            handleClick={this.toggleSidebar}
                        />
                    </div>
                    <SidebarContent
                        handleEmailSubmit={this.props.handleEmailSubmit}
                        handlePasswordSubmit={this.props.handlePasswordSubmit}
                        update_profile_err={this.props.update_profile_err}
                        update_email_err={this.props.update_email_err}
                        update_password_err={this.props.update_password_err}
                        tags={this.props.tags}
                        invalid_input={this.props.invalid_input}
                        onDeleteTag={this.props.onDeleteTag}
                        handleSubmit={this.props.handleSubmit}
                        handleChange={this.props.handleChange}
                        onKeyUp={this.props.onKeyUp}
                        isOpen={this.state.isOpen}
                    />
            </div>
        }
}
