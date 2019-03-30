import React from 'react';
import { Link } from 'react-router-dom';
import SessionButtonsContainer from './session_buttons_container';

const NavBar = props => {
    return <>
        <ul className="session-nav">
            <li><Link to="/" className="logo"><img className="logo-pic" src={window.logo}/>Slack Clone</Link></li>

            <li><Link to="/coming-soon" className="navbar-link">Why Slack?</Link></li>
            <li><Link to="/coming-soon" className="navbar-link">Solutions</Link></li>
            <li><Link to="/coming-soon" className="navbar-link">Resources</Link></li>
            <li><Link to="/coming-soon" className="navbar-link">Pricing</Link></li>
            <SessionButtonsContainer />
        </ul>
    </>;
}

export default NavBar;