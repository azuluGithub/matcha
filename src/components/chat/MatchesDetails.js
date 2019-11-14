import React from 'react';

const MatchesDetails = () => {
    return (
        <div>
            <div className="container2 newsCard">
                <div className="newsImg">
                    <img src="" alt="avatar" style={{width:"60px", height:"60px"}} className="rounded-circle"/>
                </div>
                <div className="newsContent">
                    <p className="newsTime"></p>
                    <span className="newsMsg" >Lebo m, 28</span>
                    <p className="newsTime"></p>
                </div>
                <div className="overlay">
                    <div className="text"></div>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default MatchesDetails;