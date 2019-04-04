import { connect } from 'react-redux';
import NewDMForm from './new_dm_form';
import { createDM } from '../../actions/channel_actions';
import { fetchUsers } from '../../actions/user_actions'

const msp = state => (
    {
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

export default connect(msp, mdp)(NewDMForm);
