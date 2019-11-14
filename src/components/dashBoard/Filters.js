import React from 'react';

const Filters = ({sexPref, handleChange,  ageRange, popularityRange}) => {
    const popularityResult =  popularityRange !== "" && popularityRange > 0 ? popularityRange + " to 1000" : ""; 
    const ageResult =  ageRange !== "" ? "18 to " + ageRange + " years" : ""; 
    return (
        <div className="sortDiv">
        <div >
            <input
                type="hidden"
                name="sexPref"
                value={sexPref}
                onChange={handleChange}
             /><br/>            
            <div>
                <span className="sortBy">Filters</span><br/><hr/><br/>
                <span className="filterTitle">Filter by age:</span><span className="filterInfo"> 18 - 70</span><br/>
                <input
                    type="range"
                    className="form-control"
                    name="ageRange"
                    min="18"
                    max="70"
                    onChange={handleChange}
                />
                <div className="filterRange">{ ageResult }</div>
            </div>
            <br/><hr/><br/>
            <div >
                <span className="filterTitle">Filter by popularity: </span><span className="filterInfo">0 - 1000</span><br/>
                <input
                    type="range"
                    className="form-control"
                    name="popularityRange"
                    min="0"
                    max="1000"
                    onChange={handleChange}
                />
                <div className="filterRange">{ popularityResult }</div>
            </div>
            <br/><hr/><br/>
            <span className="filterTitle">Filter by tags: </span><span className="filterTags">photography</span><span className="filterTags">art</span><span className="filterTags">music</span><span className="filterTags">coding</span><span className="filterTags">gym</span><br/>
            <input
                className="form-control"
                type="text"
                name="searchedTag"
                placeholder="Enter one of the tags from the above..."
                onChange={handleChange}
             /><br/><hr/><br/>
             <span className="filterTitle">Filter by location: </span>
            <input
                className="form-control"
                type="text"
                name="city"
                placeholder="Enter the name of a city or town..."
                onChange={handleChange}
             /><br/>
        </div> 
        </div>
    )
}

export default Filters;