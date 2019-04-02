import React from 'react';
import { Link } from 'react-router-dom';

const SessionButtons = (props) => {
    return props.currentUser ? (
        <>
        <Link to="/messages/1" className="workspaces-link"><button className="workspaces-button">
            Your Workspaces 
        </button></Link>
        <button onClick={props.logout}>Logout</button>
        </>
    ) : (
        <>
        <Link to="/signin" className="signin-button">Sign In</Link>
        <Link to="/get-started" className="getstarted-button">GET STARTED</Link>
        </>
    )
};

export default SessionButtons