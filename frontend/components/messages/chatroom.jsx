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
        document.getElementById('bottom').scrollIntoView(false);
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
        return (
            <div className="chatroom-container">
                <div className="workspace-header-bar">
                    <div className="channel-title"># general</div>
                    <div className="channel-icons">
                        <i className="far fa-star"></i>
                        <i className="far fa-user"><b> 30</b></i>
                        <i className="fas fa-map-pin"><b> 2</b></i>
                        <i className="far fa-edit"><b> Add a topic</b></i>
                    </div>
                </div>
                <div className="message-list-div"><ul className="message-list">{messageList}<div id='bottom' /></ul>
                
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