import React from 'react';
import { Link } from 'react-router-dom';

class SessionButtons extends React.Component {

    componentDidMount() {
        this.props.fetchChannels();
    }

    render() {
        return (this.props.currentUser) ? (
            <>
            <Link to={`/messages`} className="workspaces-link"><button className="workspaces-button">
                Your Workspaces 
            </button></Link>
            <button onClick={this.props.logout}>Logout</button>
            </>
        ) : (
            <>
            <Link to="/signin" className="signin-button">Sign In</Link>
            <Link to="/get-started" className="getstarted-button">GET STARTED</Link>
            </>
        )
    }

}

export default SessionButtons