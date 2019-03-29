import React from 'react';
import MessageForm from './message_form';

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.bottom = React.createRef();
    }

    componentDidMount() {
        App.cable.subscriptions.create({
            channel: "ChatChannel"
        }, {
            received: data => {
                this.setState({
                    messages: this.state.messages.concat(data.message)
                });
            },
            speak: function(data) {
                return this.perform("speak", data);
            }
        }
        );
        //App.cable exists HERE
    }
     
    componentDidUpdate() {
        this.bottom.current.scrollIntoView();
    }

    render() {
        const messageList = this.state.messages.map(message => (
            <li key={message.id}>
                {message}
                <div ref={this.bottom} />
            </li>
        ))
        return (
            <div className="chatroom-container">
                <div>Chatroom</div>
                <div className="message-list">{messageList}</div>
                <MessageForm cable={App.cable}/>
            </div>
        )
    }
}


export default ChatRoom;