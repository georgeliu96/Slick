import React from 'react';

class SessionForm extends React.Component {
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
        this.props.action(this.state);
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
                <label className="form username">Username:
                    <input type="text" onChange={this.handleInput("username")} />
                </label>
                <label className="form password">Password:
                    <input type="password" onChange={this.handleInput("password")} />
                </label>
                <label className="form email">Email:
                    <input type="text" onChange={this.handleInput("email")} />
                </label>
                <input type="submit" value={this.props.formType}/>
            </form>
        )
    }

}

export default SessionForm;