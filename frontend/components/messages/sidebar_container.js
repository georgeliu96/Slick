import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { fetchUsers } from '../../actions/user_actions'

const msp = state => ({
    currentUser: state.entities.users[state.session.id]
})

const mdp = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(msp, mdp)(Sidebar);