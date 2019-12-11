import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

const duration = 1000;

const sidebarStyle = {
  transition: `width ${duration}ms`
}
const sidebarTransitionStyles = {
  entering: { width: 0 },
  entered: { width: '350px' },
  exiting: { width: '350px' },
  exited: { width: 0 }
}
const linkStyle = {
  transition: `opacity ${duration}ms`
}
const linkTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
}
class SidebarContent extends Component {
  renderLinks = () => {
    const popularityResult =  this.props.popularityRange !== "" && this.props.popularityRange > 0 ? this.props.popularityRange + " to 2000" : ""; 
    const ageResult =  this.props.ageRange !== "" ? "18 to " + this.props.ageRange + " years" : "";
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div style={{
          ...linkStyle,
          ...linkTransitionStyles[state]
        }}>
          <div className="filter-the-main">        
            <h5 className="filter-heading">Filters</h5><hr/>
            <span className="title-filter">Filter by age: </span><span className="range-filter">18 - 70</span><br/>
              <input
                type="range"
                className="form-control"
                name="ageRange"
                min="18"
                max="70"
                onChange={this.props.handleChange}
              />
              <div className="filter-range-value">{ ageResult}</div><hr/>
            <br/>
            <div >
                <span className="title-filter">Filter popularity: </span><span className="range-filter">0 - 2000</span><br/>
                <input
                    type="range"
                    className="form-control"
                    name="popularityRange"
                    min="0"
                    max="2000"
                    onChange={this.props.handleChange}
                />
                <div className="filter-range-value">{ popularityResult }</div><hr/>
            </div>
            <br/>
            <span className="title-filter">Filter by tags: </span>
            <div className="all-tags">
              <span className="title-filter-tags">photography</span>
              <span className="title-filter-tags">art</span>
              <span className="title-filter-tags">music</span>
              <span className="title-filter-tags">coding</span>
              <span className="title-filter-tags">gym</span>
            </div>
            <input
                className="form-control inputField"
                type="text"
                name="searchedTag"
                placeholder="Enter one tags from above..."
                onChange={this.props.handleChange}
             /><br/><hr/>
             <span className="title-filter">Filter by location: </span>
            <input
                className="form-control inputField"
                type="text"
                name="city"
                placeholder="Enter city or town..."
                onChange={this.props.handleChange}
             />
             <br/><hr/>
             <span className="title-filter">Filter by gender: </span>
            <input
                className="form-control inputField"
                type="text"
                name="gender"
                value={this.props.gender}
                placeholder="Enter gender..."
                onChange={this.props.handleChange}
             /><br/>
        </div>
        </div>
      )}
    </Transition>
  }
  
  render() {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div className="sidebar" style={{
          ...sidebarStyle,
          ...sidebarTransitionStyles[state]
        }}>
          {this.renderLinks()}
        </div>
      )}
    </Transition>
  }
}

export default SidebarContent;