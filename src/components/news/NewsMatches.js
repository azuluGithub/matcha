import React from 'react';

const NewsMatches = () => {
    return (
        <div className="container2 newsCard">
            <div className="newsImg">
            {/*<img src={} alt="avatar" style={{width:"60px", height:"60px"}} className="rounded-circle"/>
            */}</div>
            <div className="newsContent">
                <span className="newsMsg" >Lebo m, matched with you</span>
                <p className="newsTime">19 August, 5pm</p>
            </div>
            <div className="overlay">
                <div className="text"></div>
            </div>
        </div>
    )
}

export default NewsMatches;
