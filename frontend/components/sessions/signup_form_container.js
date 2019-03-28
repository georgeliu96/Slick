import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = (state) => ({
    errors: Object.values(state.errors),
    formType: "Sign up"
});

const mdp = dispatch => ({
    action: user => dispatch(signup(user))
    //TODO: fetchuser and get a default channel for that user 
});

export default connect(msp, mdp)(SessionForm);