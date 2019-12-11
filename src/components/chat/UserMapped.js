import React from 'react';

const UserMapped = ({ firstname, lastname }) => {
    return (
        <div style={{margin:"5px",width:"300px",backgroundColor:"pink",color:"crimson"}}>
            <span>{ firstname }</span>
            <span>{ lastname }</span>
        </div>
    )
}

export default UserMapped
