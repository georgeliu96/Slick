import React from 'react';
import ReactDOM from 'react-dom';
// import * as SessionUtil from './util/session_api_util';
import Root from './components/Root';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root');

    //Testing
    // window.signup = SessionUtil.signup;
    // window.login = SessionUtil.login;
    // window.logout = SessionUtil.logout;
    //Testing

    ReactDOM.render(<Root store={store}/>, root)
});
