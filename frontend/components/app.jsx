import React from 'react';
// import SessionButtonsContainer from './sessions/session_buttons_container';
import SplashPageContainer from './sessions/splash_page_container';
import LoginFormContainer from './sessions/login_form_container';
import SignupFormContainer from './sessions/signup_form_container';
import MessagesNav from './messages/messages_nav';
import NavBar from './sessions/nav_bar';
import { Route, Switch } from 'react-router-dom';
import ComingSoon from './coming_soon';

const App = () => {
    return (
    <div>
        <header>
            <Switch>
                <Route path="/messages" component={MessagesNav} />
                <Route path="/" component={NavBar} />
            </Switch>
        </header>
        <Route exact path="/" component={SplashPageContainer}/>
        <Route path="/signin" component={LoginFormContainer} />
        <Route path="/get-started" component={SignupFormContainer} />
        <Route path="/coming-soon" component={ComingSoon} />
    </div>)
}

export default App;