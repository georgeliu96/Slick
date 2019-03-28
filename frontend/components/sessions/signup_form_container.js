import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = (state, ownProps) => ({
    errors: state.errors,
    formType: "Sign Up!",
    link: "/signin",
    link_text: "Sign In"
});

const mdp = dispatch => ({
    action: user => dispatch(signup(user))
    //TODO: 
});

export default connect(msp, mdp)(SessionForm);