import * as ChannelApi from '../util/channels_api_util';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

const receiveChannels = channels => ({
    type: RECEIVE_CHANNELS,
    channels
});

const receiveChannel = channel => ({
    type: RECEIVE_CHANNELS,
    channel 
});

const removeChannel = channel => ({
    type: REMOVE_CHANNEL,
    channelId: channel.id 
});

export const fetchChannels = () => dispatch => (
    ChannelApi.fetchChannels().then(channels => (
        dispatch(receiveChannels(channels))
    ))
);

export const fetchChannel = id => dispatch => (
    ChannelApi.fetchChannel(id).then(channel => (
        dispatch(receiveChannel(channel))
    ))
);

export const createChannel = channel => dispatch => (
    ChannelApi.createChannel(channel).then(channel => (
        dispatch(receiveChannel(channel))
    ))
);

export const createDM = channel => dispatch => (
    ChannelApi.createDM(channel).then(channel => (
        dispatch(receiveChannel(channel))
    ))
);

export const deleteChannel = id => dispatch => (
    ChannelApi.deleteChannel(id).then(channel => (
        dispatch(removeChannel(channel))
    ))
);