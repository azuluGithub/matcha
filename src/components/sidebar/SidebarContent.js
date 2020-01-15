import React, { Component } from 'react';

class SidebarContent extends Component {
  render() {
    const popularityResult =  this.props.popularityRange !== "" && this.props.popularityRange > 0 ? this.props.popularityRange + " to 2000" : ""; 
    const ageResult =  this.props.ageRange !== "" ? "18 to " + this.props.ageRange + " years" : "";

    return <div>
            {/***************** SORT *********************/}
            <div className="main-filter2">
                  <div className="filter-section">
                    <span className="title-filter">Sort: </span>
                    <select
                        className="form-control form-control-sm mb-2"
                        onChange={this.props.handleChange}
                        name="sortValue"
                      >
                        <option value="">Choose sorting criteria...</option>
                        <option value="age">Age</option>
                        <option value="popularity">Popularity</option>
                      </select>
                  </div>
              </div>
            {/***************** FILTER ******************/}
              <div className="main-filter1">
                <div className="filter-section">
                    <span className="title-filter">Filter by age: </span><span className="range-filter">18 - 70</span><br/>
                    <input
                        type="range"
                        className="form-control"
                        name="ageRange"
                        min="18"
                        max="70"
                        onChange={this.props.handleChange}
                    />
                    <div className="filter-range-value">{ ageResult}</div>
                  </div>

                  <div className="filter-section">
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
                        placeholder="Enter one tag from above..."
                        onChange={this.props.handleChange}
                    />
                </div>

                <div className="filter-section">
                  <span className="title-filter">Filter popularity: </span><span className="range-filter">0 - 2000</span><br/>
                    <input
                      type="range"
                      className="form-control"
                      name="popularityRange"
                      min="0"
                      max="2000"
                      onChange={this.props.handleChange}
                    />
                    <div className="filter-range-value">{ popularityResult }</div>
                </div>
                <div className="filter-section">
                  <span className="title-filter">Filter by location: </span>
                    <input
                        className="form-control inputField"
                        type="text"
                        name="city"
                        placeholder="Enter city or town..."
                        onChange={this.props.handleChange}
                    />
                </div>
              <div className="filter-section">
                <input
                    type="hidden"
                    name="sexPref"
                    onChange={this.props.handleChange}
                />
              </div>
          </div>
          </div>
  }
}

export default SidebarContent;