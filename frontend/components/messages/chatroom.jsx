import React from 'react';
import MessageForm from './message_form';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [], users: [] };
        // this.bottom = React.createRef();
    }

    
    
    componentDidMount() {
        this.props.fetchUsers();
        App.cable.subscriptions.create({
            channel: "ChatChannel"
        }, {
            received: data => {
                switch (data.type) {
                    case "message": {
                        this.setState({
                            messages: this.state.messages.concat(data.message[0]),
                            users: this.state.users.concat(data.message[1])
                        });
                        break;
                    }
                    case "messages": {
                        this.setState({messages: data.messages[0], users: data.messages[1]});
                        break;
                    }
                }
            },
            speak: function(data) {return this.perform("speak", data);},
            load: function() {return this.perform("load");}
        });
    }

    // loadChat(e) {
    //     e.preventDefault();
    //     App.cable.subscriptions.subscriptions[0].load();        
    // }
     
    // componentDidUpdate() {
    //     // debugger 
    //     this.bottom.current.scrollIntoView();
    // }

    componentDidUpdate() {
        document.getElementById('bottom').scrollIntoView();
    }

    render() {
    
        const messageList = this.state.messages.map((message, index) => (
            <li key={index}>
                <label className="chat-user">{this.props.users[this.state.users[index]] ? this.props.users[this.state.users[index]].username : ""}</label>    
                <br></br>{message}
            </li>
        ))
        return (
            <div className="chatroom-container">
                <div className="workspace-title">Slack Channel</div>
                <div><ul className="message-list">{messageList}</ul>
                <div id='bottom' />
                <MessageForm/>
                </div>
            </div>
        )
    }
}

const msp = state => ({
    users: state.entities.users
});

const mdp = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(msp, mdp)(ChatRoom);