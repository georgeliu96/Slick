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
            hiddenLogout: true
        };
        this.hideChannel = this.hideChannel.bind(this);
        this.hideDM = this.hideDM.bind(this);
        this.toggleLogout = this.toggleLogout.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleHome = this.handleHome.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsers();
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

    handleLogout() {
        this.props.logout().then(() => (
            this.props.history.push('/')    
        ))
    }

    handleHome() {
        this.props.history.push('/')
    }

    render() {

        const keytype = (navigator.appVersion.indexOf("Mac")!=-1) ? "⌘" : "Ctrl";
        const channels = this.props.channels.map((channel, index) => {
            if (!channel.direct_message) {
                return   <Link to={`/messages/${channel.id}`} key={channel.id} className="channel-Link" onClick={() => this.setState({currentChannel: this.props.channels[index]})}>
                <li className={`channel ${channel.id}`} tabIndex={channel.id}>
                  
                        # <b className={`channel-name ${channel.id}`}>{channel.name}</b>
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
                    return <Link to={`/messages/${channel.id}`} key={channel.id} className="channel-Link" onClick={() => this.setState({currentChannel: this.props.channels[index]})}>
                    <li className={`dm ${channel.id}`} tabIndex={channel.id}>
                            <p className="dm-label"><i className="fas fa-circle"></i>{new_name}</p>
                                <i className="far fa-times-circle" onClick={() => this.props.deleteChannel(channel.id)}></i>
                        </li>
                    </Link>
                }
            }
        })
        return <>
        <NewChannelContainer hidden={this.state.hidden} hideChannel={this.hideChannel}/>
        <NewDMContainer hidden={this.state.hiddenDM} hideDM={this.hideDM}/>
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
            <ChannelContainer currentChannel={this.state.currentChannel} />
        </div>
        </>
    }
}

export default Sidebar;