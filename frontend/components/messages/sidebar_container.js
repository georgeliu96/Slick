import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { withRouter } from 'react-router-dom';
import { createChannel, deleteChannel } from '../../actions/channel_actions';
import { logout } from '../../actions/session_actions';

const msp = state => {
    return{
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels),
    channel: {
        name: "",
        description: ""
    }
}}

const mdp = dispatch => ({
    createChannel: channel => dispatch(createChannel(channel)),
    deleteChannel: id => dispatch(deleteChannel(id)),
    logout: () => dispatch(logout())
})

export default withRouter(connect(msp, mdp)(Sidebar));