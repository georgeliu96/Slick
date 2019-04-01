import React from 'react';

class Sidebar extends React.Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const keytype = (navigator.appVersion.indexOf("Mac")!=-1) ? "⌘" : "Ctrl";
        return (
            <div className="sidebar">
                <div className="sidebar-header sidebar-div">
                    <div className="inner-sidebar-header">
                        <h1 className="workspace-name">Workspace Name</h1> 
                        <i class="fas fa-chevron-down"></i>
                        <label className="sidebar-username"><i class="fas fa-circle"></i> {this.props.currentUser ? this.props.currentUser.username : ""}</label>
                    </div>
                    <i class="far fa-bell"></i>
                </div>
                <div className="sidebar-search sidebar-div">
                    <div>
                    <i class="fas fa-search"></i>
                    Jump to...</div>
                    <p className="hidden-search-sidebar">{keytype} + K</p>
                </div>
                <div className="all-channels sidebar-div" tabIndex='1'>
                    <i class="far fa-comment-dots"></i>All Threads
                </div>
                <div className="channels-list sidebar-div">
                    <p className="channels-list-header">
                        Channels
                    </p>
                    <ul className="channels-list-index">
                        <li className="channel 1" tabIndex="2">
                            # <b className="channel-name 1">general</b> 
                        </li>
                    </ul>
                </div>
                <div className="add-channel sidebar-div">
                    <i class="fas fa-plus"></i> Add a channel 
                </div>
                <div className="dms-list sidebar-div">
                    <div className="dms-list-header">
                        <p className="dms-list-label">Direct Messages</p> 
                        <i class="fas fa-plus-circle"></i>
                    </div>
                    <ul className="dms-list-index">
                        <li className="dm 1" tabIndex="3">
                            <p className="dm-label"><i class="fas fa-circle"></i>Placeholder DM</p>
                            <i class="far fa-times-circle"></i>
                        </li>
                        
                    </ul>
                </div>
                <div className="apps-list sidebar-div">
                    <p className="apps-list-header">
                        Apps
                    </p>
                    <i class="fas fa-plus-circle"></i>
                </div>
            </div>
        )
    }
}

export default Sidebar;