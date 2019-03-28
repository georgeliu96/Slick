import React from 'react';
import { Link } from 'react-router-dom';
import SessionButtonsContainer from './session_buttons_container';

const NavBar = props => {
    return <>
        <ul className="session-nav">
            <li><Link to="/" className="logo">Slack Clone</Link></li>

            <li>Why Slack?</li>
            <li>Solutions</li>
            <li>Resources</li>
            <li>Pricing</li>

        </ul>
        <ul className="session-buttons">
            <SessionButtonsContainer />
        </ul>
    </>;
}

export default NavBar;