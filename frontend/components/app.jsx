import React from 'react';
import SessionButtonsContainer from './sessions/session_buttons_container';
import LoginFormContainer from './sessions/login_form_container';
import SignupFormContainer from './sessions/signup_form_container';
import { Route } from 'react-router-dom';

const App = () => {
    return (
    <div>
        <header>
            <h1>Slack Clone</h1>
            <SessionButtonsContainer/>
        </header>
        <Route path="/signin" component={LoginFormContainer} />
        <Route path="/get-started" component={SignupFormContainer} />
    </div>)
}

export default App;