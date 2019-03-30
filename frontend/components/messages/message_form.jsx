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
        return (
            <div> 
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" value={this.state.body} onChange={this.update("body")} placeholder="Message #general"/>
                    <input type="submit"/>
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