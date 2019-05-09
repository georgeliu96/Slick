import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = (state) => ({
    errors: Object.values(state.errors),
    formType: "Sign up"
});

const mdp = dispatch => ({
    action: user => dispatch(signup(user)),
    demoLogin: user => dispatch(login(user))
});

export default connect(msp, mdp)(SessionForm);