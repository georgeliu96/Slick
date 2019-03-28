import React from 'react';
import { Link } from 'react-router-dom';
import SessionButtonsContainer from './session_buttons_container';

const NavBar = props => {
    return <>
        <ul className="session-nav">
            <li><Link to="/" className="logo"><img className="logo-pic" src={window.logo}/>Slack Clone</Link></li>

            <li>Why Slack?</li>
            <li>Solutions</li>
            <li>Resources</li>
            <li>Pricing</li>
            <SessionButtonsContainer />
        </ul>
    </>;
}

export default NavBar;