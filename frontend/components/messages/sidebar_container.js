import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../actions/user_actions';
import { createChannel } from '../../actions/channel_actions';

const msp = state => ({
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels),
    channel: {
        name: "",
        description: ""
    }
})

const mdp = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    createChannel: channel => dispatch(createChannel(channel))
})

export default withRouter(connect(msp, mdp)(Sidebar));