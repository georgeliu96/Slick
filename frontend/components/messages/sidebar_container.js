import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../actions/user_actions'

const msp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    channels: ownProps.channels
})

const mdp = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

export default withRouter(connect(msp, mdp)(Sidebar));