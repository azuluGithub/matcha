import React, { Component } from 'react';

const tagStyle = {
    display: "inline-block",
    backgroundColor: "white",
    fontWeight: "100",
    color: "salmon",
    padding:"2px",
    borderRadius: "5px",
    margin: "3px",
    fontSize: "13px",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
}

class Tag extends Component {
    onDeleteTag = (e, tag) => {
        this.props.onDeleteTag(tag);
    }
    render() {
        var tag = (
            <span onClick={(e) => this.onDeleteTag(e, this.props.tag)} style={tagStyle} >
                {this.props.tag}
                {" "}
                &#x2716;
            </span>
        );
        return (
            <React.Fragment>
                { tag }
            </React.Fragment>
        )
    }
}
export default Tag;