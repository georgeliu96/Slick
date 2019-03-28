import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            first_render: true 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        //TODO redirect to a specific message channel for the logged-in user
        this.props.action(this.state).then(()=>this.props.history.push(`/coming-soon`));
    }

    handleInput(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value
            });
        };
    }

    render() {
        if (this.props.location.state && this.state.first_render) {
            this.setState({email: this.props.location.state.email, first_render: false});
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
                    <input type="text" onChange={this.handleInput("email")} value={this.state.email} />
                </label>
                <br></br>
                <input type="submit" value={this.props.formType}/>
            </form>
            </>
        )
    }

}

export default SessionForm;