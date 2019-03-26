import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';

const msp = (state, ownProps) => ({
    errors: state.errors,
    formType: "Log In!"
});

const mdp = dispatch => ({
    action: user => dispatch(login(user))
});

export default connect(msp, mdp)(SessionForm);