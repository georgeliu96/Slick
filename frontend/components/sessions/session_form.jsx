import React from 'react';
import SplashFooter from './splash_footer';
import Typed from 'typed.js';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            first_render: true,
            failed: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoUser = this.demoUser.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const that = this;
        this.props.action(this.state).then(()=>{
            that.props.history.push(`/messages/`)
            window.location.reload();
        }, ()=>
        {
            that.setState({failed: true});}
        );
    }

    demoUser(e) {
        e.preventDefault();
        this.setState({
            username: "",
            password: "",
            email: ""
        }); 
        new Typed(".form-input-username", {
            strings: ['demo'],
            typeSpeed: 70,
        })
        new Typed(".form-input-password", {
            strings: ['^1000password'],
            typeSpeed: 70,

        })
        new Typed(".form-input-email", {
            strings: ['^2000demo@email.com'],
            typeSpeed: 70
        })

        setTimeout(() => {
            this.props.demoLogin({username: "demo", password: "password", email: "demo@email.com"})
                .then(()=>{
                    this.props.history.push('/messages/');
                    window.location.reload();
                });
            }, 
        3500);
    }
    

    handleInput(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value,
                failed: false
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
        const header = (this.props.formType === "Sign up") ? ("Sign up for Slick") : ("Log in to Slick");
        return (
            <div className="background">
                <div className="form-container">
                    {errors}
                    <div className="session-container">
                        <h2 className="session-form-header">{header}</h2>
                        <div className="inner-form-container">
                            <p className="session-form-desc">Enter your <b>username</b>, <b>password</b>, and <b>email</b>.</p>
                            <form className="session-form">
                                <input type="text" name="username" onChange={this.handleInput("username")} value={this.state.username} className="session-form-input form-input-username" placeholder="username"/>
                                <br></br>
                                <input type="password" name="password" onChange={this.handleInput("password")} value={this.state.password} className="session-form-input form-input-password" placeholder="password"/>
                                <br></br>
                                <input type="text" name="email" onChange={this.handleInput("email")} value={this.state.email} className="session-form-input form-input-email" placeholder="you@example.com"/>
                                <br></br>
                                <input type="submit" className="session-submit-button" value={this.props.formType} onClick={this.handleSubmit}/>
                                <input type="submit" className="session-submit-button" value="Demo User" onClick={this.demoUser} />
                            </form>
                        </div>
                    </div>
                </div>
                <SplashFooter/>
            </div>
        )
    }

}

export default SessionForm;