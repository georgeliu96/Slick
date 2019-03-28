import React from 'react';
import { Link } from 'react-router-dom';

class SplashPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            email: "",
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({submitted: true});
        debugger 
        this.props.history.push(
            {
                pathname: '/get-started',
                state: { email: this.state.email}
            }
        );
    }

    handleInput(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value
            });
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.changePics, 4000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changePics() {
        const pics = document.getElementsByClassName("splash-pic");
        const classNames = ["pic1", "pic2", "pic3"];
        for (let i = 0; i < pics.length; i++) {
            const curr = pics[i].className.split(" ")[1];
            const next = classNames[(classNames.indexOf(curr) + 1) % 3];
            pics[i].className += " outgoing";
            setTimeout(()=> {
                pics[i].className = `splash-pic ${next} ingoing`;
                setTimeout(() => {
                    pics[i].className = pics[i].className.split(" ").slice(0, 2).join(" ");
                    }, 500);
            }, 500);
        }
    }

    render(){ 
        return (
            <div className="splash-div">
                <h1 className="splash-desc">
                    Imagine what you'll accomplish together
                </h1>
                <div className="app-desc">
                    Slack is a collaboration hub for work, no matter what work you do. It’s a place where conversations happen, decisions are made, and information is always at your fingertips. With Slack, your team is better connected.
                </div>
                <form className="splash-form" onSubmit={this.handleSubmit}>
                    <input type="text" className="splash-email" placeholder="Email address" required onChange={this.handleInput("email")}/> 
                    <input type="submit" className="splash-started" value="GET STARTED" />
                    <p className="splash-signin">Already using Slack? <Link to="/signin" className="splash-link">Sign in.</Link></p>
                </form>
                <img src="https://a.slack-edge.com/7a156/marketing/img/home/hero/Slack-Customer-Away.jpg" className="splash-pic pic1"/>
                <img src="https://a.slack-edge.com/7a156/marketing/img/home/hero/Slack-Customer-Autodesk.jpg" className="splash-pic pic2"/>
                <img src="https://a.slack-edge.com/7a156/marketing/img/home/hero/Slack-Customer-Molly-Moon-Ice-Cream.jpg" className="splash-pic pic3"/>
            </div>
    );}
}

export default SplashPage;