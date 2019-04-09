import React from 'react';

class NewDMForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.channel;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    pickUser(user) {
        const users = this.state.users;
        (users.indexOf(user) === -1) ? (
            users.push(user)
        ) : (
            users.splice(users.indexOf(user), 1)
        )
        const names = this.state.users.map(user => user.username)
        const name = names.join(", ")
        this.setState({
            users,
            name
        })
    }

    handleSubmit() {
        let newState = {}
        const users = this.state.users;
        users.push(this.props.currentUser)
        const names = users.map(user => (
            user.username
        ))
        const name = names.join(', ')
        newState.users = users;
        newState.name = name;
        newState.description = `Direct message between ${users.length} people`     
        this.props.createDM(newState).then(({ channel }) => {
            this.props.hideDM();
            this.props.handleCreate(channel);
        });
        this.setState({
            users: [],
            name: "",
            description: ""
        })
    }

    render() {
        const users = (this.props.users) ? (this.props.users.map(user => (
            <li className={`select-user-dm ${this.state.users.includes(user) ? "selected" : "" }`} key={user.id} onClick={()=>this.pickUser(user)}>
                <img src={user.user_image_url} className="form-pic"></img><b className="form-username">{user.username}</b>
            </li>
        ))) : ("")
        return (
            <div className={this.props.hidden ? "outer-dm-form-div hidden-form" : "outer-dm-form-div"}>
                <button onClick={this.props.hideDM} className="close-form-button"><i className="fas fa-times"></i></button>
                <div className="inner-dm-form-div">
                    <h1 className="dm-form-header">Direct Message</h1>
                    <div className="dm-form-bar">
                        <input type="text" className="dm-form-users-names" value={this.state.name} readOnly/>
                        <button className="create-dm-button" onClick={this.handleSubmit} disabled={this.state.users.length === 0}>Go</button>
                    </div>
                    <ul className="users-list-dm-form">
                        {users}
                    </ul>

                </div>
            </div>
        )
    }
}

export default NewDMForm;