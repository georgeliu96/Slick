import React from 'react';
import { Link } from 'react-router-dom';
import ChannelContainer from '../channels/channel_container';
import NewChannelContainer from '../channels/new_channel_form_container';
import NewDMContainer from '../channels/new_dm_form_container';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentChannel: this.props.currentChannel,
            hidden: true,
            hiddenDM: true,
            hiddenLogout: true,
            channels: [],
            messages: []
        };
        this.hideChannel = this.hideChannel.bind(this);
        this.hideDM = this.hideDM.bind(this);
        this.toggleLogout = this.toggleLogout.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleMsg = this.handleMsg.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        this.subToNotifications();
    }

    hideChannel() {
        this.setState({
            hidden: true
        })
    }

    toggleLogout() {
        this.setState({
            hiddenLogout: !this.state.hiddenLogout
        })
    }

    hideDM() {
        this.setState({
            hiddenDM: true
        })
    }

    subToNotifications() {
        App.cable.subscriptions.create({
            channel: "ChannelNotificationsChannel",
            currentUser: this.props.currentUser.id
        }, {
            received: data => {
                this.setState({
                    messages: this.state.messages.concat(data.message),
                    channels: this.state.channels.concat(data.channel)
                })
            }
        })
    }

    handleLogout() {
        this.props.logout().then(() => (
            this.props.history.push('/')    
        ))
    }

    handleHome() {
        this.props.history.push('/')
    }

    handleCreate(channel) {
        this.setState({
            currentChannel: channel
        })
    }

    handleChannel(index) {
        const newChannels = this.state.channels;
        const newMessages = this.state.messages; 

        for(let i = newChannels.length - 1; i >=0; i--) {
            if(newChannels[i] === this.props.channels[index].id) {
                newChannels.splice(i, 1);
                newMessages.splice(i, 1);
            }
        }

        this.setState({
            currentChannel: this.props.channels[index],
            channels: newChannels,
            messages: newMessages

        })
    }

    handleMsg(id) {
        const newChannels = this.state.channels;
        const newMessages = this.state.messages; 
        for(let i = newChannels.length - 1; i >=0; i--) {
            if(newChannels[i] === id) {
                newChannels.splice(i, 1);
                newMessages.splice(i, 1);
            }
        }
        this.setState({
            channels: newChannels,
            messages: newMessages
        })
    }

    countChannels(channels, id) {
        let count = 0;
        for(let i = 0; i < channels.length; i++) {
            if (channels[i] === id) {
                count++;
            }
        }
        return count;
    }

    render() {
        const keytype = (navigator.appVersion.indexOf("Mac")!=-1) ? "⌘" : "Ctrl";
        const channels = this.props.channels.map((channel, index) => {
            if (!channel.direct_message) {
                return   <Link to={`/messages/${channel.id}`} key={channel.id} className={`channel-Link`} onClick={() => this.handleChannel(index)}>
                <li className={`channel ${(this.state.currentChannel.id === channel.id) ? "currentChannel" : ""} ${channel.id}`} tabIndex={channel.id}>
                        # <b className={`channel-name ${(this.state.channels.includes(channel.id)) ? "bolden" : ""}`}>{channel.name}</b>
                        {(this.state.channels.includes(channel.id) && (channel.id !== this.state.currentChannel.id)) ? (
                        <b className={`new-msg-count`}>
                            {(this.countChannels(this.state.channels, channel.id) < 10) ? (this.countChannels(this.state.channels, channel.id)) : "9+"}
                        </b>
                        ) : (<b></b>) }
                </li>
                </Link>
            }
        })
        const direct_messages = this.props.channels.map((channel, index) => {
            if (this.props.currentUser) {
                if(channel.direct_message && channel.user_ids.includes(this.props.currentUser.id)) {
                    const names = channel.name.split(", ")
                    names.splice(names.indexOf(this.props.currentUser.username), 1)
                    const new_name = names.join(", ")
                    return <Link to={`/messages/${channel.id}`} key={channel.id} className="channel-Link" onClick={() => this.handleChannel(index)}>
                    <li className={`dm ${channel.id} ${(this.state.currentChannel.id === channel.id) ? "currentChannel" : ""}`}>
                            <p className={`dm-label ${(this.state.channels.includes(channel.id)) ? "bolden" : ""}`}><i className="fas fa-circle"></i>{new_name}</p>
                            {(this.state.channels.includes(channel.id) && (channel.id !== this.state.currentChannel.id)) ? (
                                <b className={`new-msg-count`}>
                                    {(this.countChannels(this.state.channels, channel.id) < 10) ? (this.countChannels(this.state.channels, channel.id)) : "9+"}
                                </b>
                                ) : (
                                    <i className="far fa-times-circle" onClick={() => this.props.deleteChannel(channel.id).then(() => {
                                        this.props.history.push(`/messages/${this.props.channels[0].id}`)
                                        this.setState({currentChannel: this.props.channels[0]})
                                    })}></i>
                                ) }
                                
                        </li>
                    </Link>
                }
            }
        })
        return <>
        <NewChannelContainer hidden={this.state.hidden} hideChannel={this.hideChannel} handleCreate={this.handleCreate}/>
        <NewDMContainer hidden={this.state.hiddenDM} hideDM={this.hideDM} handleCreate={this.handleCreate}/>
        <div className="chatroom-window">
            <div className="sidebar">
                <div className="hidden-width"></div>
                <div className="sidebar-header sidebar-div" onClick={this.toggleLogout}>
                    <div className="inner-sidebar-header">
                        <h1 className="workspace-name">Workspace Name</h1> 
                        <i className="fas fa-chevron-down"></i>
                        <label className="sidebar-username"><i className="fas fa-circle"></i> {this.props.currentUser ? this.props.currentUser.username : ""}</label>
                    </div>
                    <i className="far fa-bell"></i>
                </div>
                <div className={this.state.hiddenLogout ? "logout-div hidden-form" : "logout-div"}>
                    <button onClick={this.handleHome} className="home-button">Home Page</button>
                    <button onClick={this.handleLogout} className="logout-button">Log Out</button>
                </div>
                <div className="sidebar-scroll">
                    <div className="sidebar-search sidebar-div">
                        <div>
                        <i className="fas fa-search"></i>
                        Jump to...</div>
                        <p className="hidden-search-sidebar">{keytype} + K</p>
                    </div>
                    <div className="all-channels sidebar-div" tabIndex='0'>
                        <i className="far fa-comment-dots"></i>All Threads
                    </div>
                    <div className="channels-list sidebar-div">
                        <p className="channels-list-header">
                            Channels
                        </p>
                        <ul className="channels-list-index">
                            {channels}
                        </ul>
                    </div>
                    <div className="add-channel sidebar-div" onClick={() => this.setState({hidden: false})}>
                        <i className="fas fa-plus"></i> Add a channel 
                    </div>
                    <div className="dms-list sidebar-div">
                        <div className="dms-list-header">
                            <p className="dms-list-label">Direct Messages</p> 
                            <i className="fas fa-plus-circle" onClick={() => this.setState({hiddenDM: false})}></i>
                        </div>
                        <ul className="dms-list-index">
                            {direct_messages}                        
                        </ul>
                    </div>
                    <div className="apps-list sidebar-div">
                        <p className="apps-list-header">
                            Apps
                        </p>
                        <i className="fas fa-plus-circle"></i>
                    </div>
                </div>
            </div>
            <ChannelContainer currentChannel={this.state.currentChannel} handleMsg={this.handleMsg} handleCreate={this.handleCreate}/>
        </div>
        </>
    }
}

export default Sidebar;