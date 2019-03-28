import { connect } from 'react-redux';
import Session from './session_buttons';
import { logout } from '../../actions/session_actions';

const msp = state => ({
    currentUser: state.session.id 
});

const mdp = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(msp, mdp)(Session);