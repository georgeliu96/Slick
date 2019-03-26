import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';

const msp = (state, ownProps) => ({
    errors: state.errors,
    formType: "Sign Up!"
});

const mdp = dispatch => ({
    action: user => dispatch(signup(user))
});

export default connect(msp, mdp)(SessionForm);