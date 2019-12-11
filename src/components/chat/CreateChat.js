import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChat } from '../../store/actions/profileActions';

class CreateChat extends Component {

    state = {
        senderId: "hkdkdjidjdjfjf+_jdjdj)_", //auth id
        senderName: "dlonra", //auth name
        senderUrl: "http://matchedUserImage==", //auth img
        message: "", //message from input field
        receiverId: "fjd7890udjdjd0d=fdidfj_", //id from link
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.create_Chat(this.state);
        this.setState({
            message : "",
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [ name ] : value,
        })
    }

    render() {
        return (
            <div className="createChatBox">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input onChange={this.handleChange} type="text" className="form-control" value={this.state.message}  name="message" placeholder="Type a message..."  required/>
                    </div>
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create_Chat: (chat) => dispatch(createChat(chat))
    }
}

export default connect(null, mapDispatchToProps) (CreateChat);