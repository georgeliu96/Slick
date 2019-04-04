import { connect } from 'react-redux';
import NewChannelForm from './new_channel_form';
import { createChannel } from '../../actions/channel_actions';

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

export default connect(msp, mdp)(NewChannelForm);
