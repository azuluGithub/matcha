import React from 'react';

const ScrollBar = (props) => {
    return (
        <div className="my_scrollable">
            { props.children }
        </div>
    )
}

export default ScrollBar;