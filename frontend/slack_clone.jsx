import React from 'react';
import ReactDOM from 'react-dom';
// import * as SessionUtil from './util/session_api_util';
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root');
    const store = configureStore();
    //Testing
    // window.signup = SessionUtil.signup;
    // window.login = SessionUtil.login;
    // window.logout = SessionUtil.logout;
    //Testing
    
    ReactDOM.render(<Root store={store}/>, root)
});
