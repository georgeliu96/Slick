import { connect } from 'react-redux';
import { fetchUsers, fetchUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';
import Channel from './channel';

const msp = (state, ownProps) => {
    return{
    users: state.entities.users,
    channel: state.entities.channels[ownProps.match.params.channelId],
    currentUser: state.entities.users[state.session.id]
}}

const mdp = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id))
})

export default withRouter(connect(msp, mdp)(Channel));