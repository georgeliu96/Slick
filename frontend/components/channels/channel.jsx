import React from 'react';
import MessageForm from '../messages/message_form';
import MessageFooter from '../messages/message_footer';

class Channel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [], users: [] };
    }


    componentDidMount() {
        this.props.fetchUsers();
        this.subscribe();
    }

    subscribe () {
        App.cable.subscriptions.create({
            channel: "ChatChannel",
            id: this.props.currentChannel.id 
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
            load: function(id) {return this.perform("load", id);},
            unsub: function() {App.cable.subscriptions.remove(this);}
        });
    }

    componentDidUpdate(prevProps) {
        document.getElementById('bottom').scrollIntoView(false);
        
        if (prevProps.currentChannel.id !== this.props.currentChannel.id) {
            App.cable.subscriptions.subscriptions[0].unsub(); 
            this.subscribe();
        }
        if (!(this.props.users[this.state.users[this.state.users.length - 1]])) {
            if (this.state.users.length > 0) {
                this.props.fetchUser(this.state.users[this.state.users.length - 1])
            }
        }
    }

    render() {
        $(document).ready(function () {    
            $(".fa-star").click(function () {    
                $('.fa-star').toggleClass("fas far")
        })});

        const messageList = this.state.messages.map((message, index) => (
            (index === 0 || this.state.users[index] !== this.state.users[index-1]) ? ( 
            <li key={index} className="message">
                <div className="message-left"><img src={this.props.users[this.state.users[index]] ? this.props.users[this.state.users[index]].user_image_url : ""} className="profile-pic"></img></div>
                <div className="message-right"><b className="chat-user">{this.props.users[this.state.users[index]] ? this.props.users[this.state.users[index]].username : ""}</b>    
                <br></br><p className="message-body">{message}</p></div>
            </li>
            ):
            (
                <li key={index} className="message same-user">
                    <div className="message-left"></div>
                    <div className="message-right"><p className="message-body">{message}</p></div>
                </li>
            )
        ))
        let channelName = "";
        if (this.props.currentUser) {
            if (this.props.currentChannel && this.props.currentChannel.direct_message) {
                const names = this.props.currentChannel.name.split(", ")
                names.splice(names.indexOf(this.props.currentUser.username), 1)
                channelName = names.join(", ")
            } else if (this.props.currentChannel) {
                channelName = this.props.currentChannel.name
            }
        }
        return (
            <div className="chatroom-container">
                <div className="workspace-header-bar">
                    <div className="channel-title"># {this.props.currentChannel ? channelName : ""}</div>
                    <div className="channel-icons">
                        <i className="far fa-star"></i>
                        <i className="far fa-user"><b> {this.props.currentChannel ? this.props.currentChannel.user_ids.length : 0}</b></i>
                        <i className="fas fa-map-pin"><b> 2</b></i>
                        <i className="far fa-edit"><b> {this.props.currentChannel ? this.props.currentChannel.description || "Add a topic" : ""}</b></i>
                    </div>
                    <MessageFooter/>
                </div>
                <div className="message-list-div"><ul className="message-list">{messageList}<div id='bottom' /></ul>
                
                <MessageForm/>
                </div>
            </div>
        )
    }

}

export default Channel;

