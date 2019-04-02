import React from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions/channel_actions';
import SideBarContainer from './sidebar_container';
import ChannelContainer from '../channels/channel_container';

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            channels: [],
            currentChannel: this.props.match.params.channelId
        }
    }    

    componentDidMount() {
        const that = this;
        this.props.fetchChannels().then(() => {
            that.setState({
                channels: Object.values(that.props.channels),
                currentChannel: that.props.channels[that.props.match.params.channelId]
            })
        });
    }

    render() {
        debugger 
        return (this.state.channels.length > 0) ?  ( 
            <SideBarContainer channels={this.state.channels} currentChannel={this.state.currentChannel}/>
        ) :
        (
            <>
            </>
        )

    }
}

const msp = state => ({
    channels: state.entities.channels
})

const mdp = dispatch => ({
    fetchChannels: () => dispatch(fetchChannels())
})

export default connect(msp,mdp)(ChatRoom);