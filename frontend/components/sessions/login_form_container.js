import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = state => ({
    errors: state.errors,
    formType: "Log In!",
    link: "/get-started",
    link_text: "Get Started"
});

const mdp = dispatch => ({
    action: user => dispatch(login(user))
});

export default connect(msp, mdp)(SessionForm);