import React from 'react';

class Sidebar extends React.Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const keytype = (navigator.appVersion.indexOf("Mac")!=-1) ? "⌘" : "Ctrl";
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <h1 className="workspace-name">Workspace Name Placeholder</h1>
                    <label className="sidebar-username">{this.props.currentUser ? this.props.currentUser.username : ""}</label>
                </div>
                <div className="sidebar-search">
                    <i class="fas fa-search"></i>
                    Jump to...
                    <p className="hidden-search-sidebar">{keytype} + K</p>
                </div>

            </div>
        )
    }
}

export default Sidebar;