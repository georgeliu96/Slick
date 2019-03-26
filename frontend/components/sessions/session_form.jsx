import React from 'react';

class SessionForm extends React.component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state);
    }

    handleInput(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value
            });
        };
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Username:
                    <input type="text" onChange={this.handleInput("username")} />
                </label>
                <label>Password:
                    <input type="password" onChange={this.handleInput("password")} />
                </label>
                <label>Email:
                    <input type="text" onChange={this.handleInput("email")} />
                </label>
            </form>
        )
    }

}

export default SessionForm;