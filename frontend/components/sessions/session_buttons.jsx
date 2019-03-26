import React from 'react';
import { Link } from 'react-router-dom';

const SessionButtons = (props) => {
    return props.currentUser ? (
        <button>
            Your Workspaces 
        </button>
    ) : (
        <>
        <Link to="/signin">Sign In</Link>
        <Link to="/get-started">GET STARTED</Link>
        </>
    )
};

export default SessionButtons