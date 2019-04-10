import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import SearchBar from './search_bar';
import { createDM } from '../../actions/channel_actions';

const msp = state => ({
    users: Object.values(state.entities.users),
    currentUser: state.entities.users[state.session.id]
});

const mdp = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    createDM: (channel) => dispatch(createDM(channel))
});

export default connect(msp, mdp)(SearchBar);
