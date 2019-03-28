import React from 'react';
import { Link } from 'react-router-dom';

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
        let email_value = ""
        if (this.props.location.state) {
            email_value = this.props.location.state.email
        }
        return (
            <>
            <Link to={this.props.link} className="link">{this.props.link_text}</Link>
            <form onSubmit={this.handleSubmit} className="form">
                <label className="form username">Username:
                    <input type="text" onChange={this.handleInput("username")} />
                </label>
                <br></br>
                <label className="form password">Password:
                    <input type="password" onChange={this.handleInput("password")} />
                </label>
                <br></br>
                <label className="form email">Email:
                    <input type="text" onChange={this.handleInput("email")} value={email_value} />
                </label>
                <br></br>
                <input type="submit" value={this.props.formType}/>
            </form>
            </>
        )
    }

}

export default SessionForm;