import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';
import Channel from './channel';

const msp = (state, ownProps) => {
    return{
    users: state.entities.users,
    channel: state.entities.channels[ownProps.match.params.channelId]
}}

const mdp = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default withRouter(connect(msp, mdp)(Channel));