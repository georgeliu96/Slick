import { connect } from 'react-redux';
import NewDMForm from './new_dm_form';
import { createDM } from '../../actions/channel_actions';
import { fetchUsers } from '../../actions/user_actions'
import { withRouter } from 'react-router-dom';

const msp = state => (
    {
        currentUser: state.entities.users[state.session.id],
        users: Object.values(state.entities.users),
        channel: {
            name: "",
            description: "",
            users: []
    }
})

const mdp = dispatch => ({
    createDM: channel => dispatch(createDM(channel)),
    fetchUsers: () => dispatch(fetchUsers())
})

export default withRouter(connect(msp, mdp)(NewDMForm));
