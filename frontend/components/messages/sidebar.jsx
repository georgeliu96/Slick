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
                    <h1 className="workspace-name">Workspace Name Placeholder</h1>
                    <label className="sidebar-username">{this.props.currentUser ? this.props.currentUser.username : ""}</label>
                    <i class="far fa-bell"></i>
                </div>
                <div className="sidebar-search sidebar-div">
                    <i class="fas fa-search"></i>
                    Jump to...
                    <p className="hidden-search-sidebar">{keytype} + K</p>
                </div>
                <div className="all-channels sidebar-div">
                    All Channels
                </div>
                <div className="channels-list sidebar-div">
                    <p className="channels-list-header">
                        Channels
                    </p>
                    <ul className="channels-list-index ">
                        <li className="channel 1">
                            # general
                        </li>
                    </ul>
                </div>
                <div className="add-channel sidebar-div">
                    <i class="fas fa-plus"></i> Add a channel 
                </div>
                <div className="dms-list sidebar-div">
                    <p className="dms-list-header">
                        Direct Messages
                        <i class="fas fa-plus-circle"></i>
                    </p>
                    <ul className="dms-list-index">
                        <li className="dm 1">
                            Placeholder DM
                        </li>
                    </ul>
                </div>
                <div className="apps-list sidebar-div">
                    <p className="apps-list-header">
                        Apps
                        <i class="fas fa-plus-circle"></i>
                    </p>
                </div>
            </div>
        )
    }
}

export default Sidebar;