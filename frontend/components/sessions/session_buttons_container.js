import { connect } from 'react-redux';
import Session from './session_buttons';
import { logout } from '../../actions/session_actions';
import { fetchChannels } from '../../actions/channel_actions';

const msp = state => ({
    currentUser: state.session.id, 
    channels: Object.values(state.entities.channels)
});

const mdp = dispatch => ({
    logout: () => dispatch(logout()),
    fetchChannels: () => dispatch(fetchChannels())
});

export default connect(msp, mdp)(Session);