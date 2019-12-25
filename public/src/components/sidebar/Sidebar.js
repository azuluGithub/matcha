import React, { Component } from 'react';
import SidebarContent from './SidebarContent';

export default class Sidebar extends Component {
    render() {
        const {sexPref, handleChange,  ageRange, popularityRange} = this.props;
        return <div className="dash-sidebar">
                    <SidebarContent
                        sexPref={sexPref}
                        handleChange={handleChange}
                        ageRange={ageRange}
                        popularityRange={popularityRange}
                    />
            </div>
        }
}
