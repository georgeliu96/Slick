import { merge } from 'lodash';
import { RECEIVE_CHANNEL, RECEIVE_CHANNELS, REMOVE_CHANNEL} from '../actions/channel_actions'

const ChannelsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CHANNELS: 
            return merge({}, state, action.channels);
        case RECEIVE_CHANNEL: 
            return merge({}, state, {[action.channel.id]: action.channel})
        case REMOVE_CHANNEL: {
            const newState = merge({}, state);
            delete newState[action.channelId];
            return newState;
        }
        default: 
            return state; 
    }
}

export default ChannelsReducer;