import React from 'react';
import App from '../app';

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
        this.props.cable.subscriptions.subscriptions[0].speak({ message: this.state.body });
        this.setState({body: ""});
    }

    render() { //App.cable undefined here
        return (
            <div> 
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" value={this.state.body} onChange={this.update("body")} placeholder="Type Message Here"/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default MessageForm;