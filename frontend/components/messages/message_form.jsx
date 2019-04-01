import React from 'react';
import { connect } from 'react-redux';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {body: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => {
            this.setState({[field]: e.currentTarget.value});
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body, id: this.props.currentUser.id});
        this.setState({body: ""});
    }

    render() { 
        $(document).ready(function () {    
            $(".toggle-smile").hover(function () {    
                $(".toggle-smile")
                   .addClass("fa-laugh")
                   .removeClass("fa-smile");
                }, function () {
                $(".toggle-smile")
                    .addClass("fa-smile")
                    .removeClass("fa-laugh");
            });    
        });
        return (
            <div className="message-form"> 
                <form onSubmit={this.handleSubmit.bind(this)} className="msg-form">
                    <input type="text" className="message-input" value={this.state.body} onChange={this.update("body")} placeholder="Message #general"/>
                    <i className="fas fa-plus"></i>
                    {/* <i className="far fa-laugh"></i> */}
                    <i className="far toggle-smile fa-smile"></i>
                    <i className="at-sym">@</i>
                </form>
            </div>
        )
    }
}

const msp = state => ({
    // TODO: will use this to show username for each channel when entities is created
    currentUser: state.entities.users[state.session.id]
})


export default connect(msp)(MessageForm);