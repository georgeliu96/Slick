import { connect } from 'react-redux';
import NewChannelForm from './new_channel_form';
import { createChannel } from '../../actions/channel_actions';
import { withRouter } from 'react-router-dom';

const msp = state => (
    {
        channel: {
            name: "",
            description: "",
    }
})

const mdp = dispatch => ({
    createChannel: channel => dispatch(createChannel(channel))
})

export default withRouter(connect(msp, mdp)(NewChannelForm));
