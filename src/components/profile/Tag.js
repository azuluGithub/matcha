import React, { Component } from 'react';

const tagStyle = {
    display: "inline-block",
    backgroundColor: "rgba(226, 210, 115, 0.3)",
    fontWeight: "100",
    color: "rgba(94, 23, 116, 0.7)",
    padding:"3px",
    borderRadius: "3px",
    margin: "3px",
    fontSize: "14px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
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