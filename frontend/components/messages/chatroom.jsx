import React from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions/channel_actions';
import SideBarContainer from './sidebar_container';

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            channels: [],
            currentChannel: this.props.match.params.channelId || -1
        }
    }    

    componentDidMount() {
        const that = this;
        this.props.fetchChannels().then(() => {
            that.setState({
                channels: Object.values(that.props.channels),
                currentChannel: that.props.channels[that.props.match.params.channelId || Object.values(that.props.channels)[0].id]
            })
            that.props.history.push(`/messages/${this.state.currentChannel.id}`)
        });
    }

    render() {
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