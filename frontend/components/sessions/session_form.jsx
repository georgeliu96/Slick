import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            first_render: true,
            failed: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoUser = this.demoUser.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const that = this;
        //TODO redirect to a specific message channel for the logged-in user
        this.props.action(this.state).then(()=>{
            this.props.history.push(`/coming-soon`)
            window.location.reload();
        }, ()=>
        {
            that.setState({failed: true});}
        );
    }

    demoUser(e) {
        e.preventDefault();
        this.props.demoLogin({username: "Demo", password: "password", email: "demo@email.com"})
            .then(()=>{
                this.props.history.push('/coming-soon');
                window.location.reload();
            });
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
        const errors = (this.state.failed) ? 
        (<div className="errors">
                {this.props.errors.map((error, index) => (<><i class="fas fa-exclamation-triangle"></i><li key={index}>{error.responseJSON[0]}</li></>))}
        </div>) : (<></>)
        const header = (this.props.formType === "Sign up") ? ("Sign up for Slack Clone") : ("Log in to Slack Clone");
        return (
            <div className="background">
                 {errors}
                <div className="session-container">
                    <h2 className="session-form-header">{header}</h2>
                    <div className="inner-form-container">
                        <p className="session-form-desc">Enter your <b>username</b>, <b>password</b>, and <b>email</b>.</p>
                        <form className="session-form">
                            <input type="text" onChange={this.handleInput("username")} className="session-form-input" placeholder="username"/>
                            <br></br>
                            <input type="password" onChange={this.handleInput("password")} className="session-form-input" placeholder="password"/>
                            <br></br>
                            <input type="text" onChange={this.handleInput("email")} value={this.state.email} className="session-form-input" placeholder="you@example.com"/>
                            <br></br>
                            <input type="submit" className="session-submit-button" value={this.props.formType} onClick={this.handleSubmit}/>
                            <input type="submit" className="session-submit-button" value="Demo User" onClick={this.demoUser} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default SessionForm;