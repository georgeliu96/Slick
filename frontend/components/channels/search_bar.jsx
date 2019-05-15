import React from 'react';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            substr: "",
            show: false
        }
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsers().then(() => {
            this.setState({
                matches: this.props.users
            })
        })
    }

    componentWillUnmount() {
        App.cable.subscriptions.subscriptions.forEach(sub => sub.unsub())
    }

    updateMatches() {
        const newMatches = [];
        for (let i = 0; i < this.props.users.length; i++) {
            if(this.props.users[i].username.slice(0,this.state.substr.length) === this.state.substr) {
                newMatches.push(this.props.users[i])
            }
        }
        this.setState({
            matches: newMatches
        });
    }

    componentDidUpdate(_, prevState) {
        if(prevState.substr !== this.state.substr){
            this.updateMatches();
        }
    }

    handleInput() {
        return (e) => {
            this.setState({
                substr: e.target.value
            })
        }
    }

    handleFocus() {
        this.setState({
            show: true
        });
    }

    handleClick(user) {
        const ids = [user.id, this.props.currentUser.id];
        ids.sort((a,b) => a - b);
        if (!this.existingDM(ids)) {
            this.props.createDM({
                users: [user, this.props.currentUser],
                name: user.username + ", " + this.props.currentUser.username,
                description: `Direct message between 2 people`
            }).then(({ channel }) => {
                this.props.history.push(`/messages/${channel.id}`);
                this.props.handleCreate(channel);
                this.setState({
                    substr: "",
                    show: false
                })
            });
        }
    }

    existingDM(ids) {
        let existing;
        for (let i = 0; i < this.props.channels.length; i++) {
            const channel = this.props.channels[i]
            if(channel.direct_message) {
                const channel_ids = channel.user_ids.sort((a,b) => a - b);
                if (ids.length === channel_ids.length) {
                    for(let i = 0; i < ids.length; i++) {
                        existing = true; 
                        if(ids[i] !== channel_ids[i]) {
                            existing = false;
                        }
                    }
                    if (existing) {
                        this.props.history.push(`${channel.id}`);
                        this.props.handleCreate(channel);
                        this.setState({
                            substr: "",
                            show: false
                        });

                        break;
                    }
                }
            }
        }
        return existing;
    }

    render() {
        const users = (this.state.matches) ? (
            this.state.matches.map((user, index) => {
                if(index < 5 && user && user !== this.props.currentUser) {
                    return (<li className="search-user" key={user.id} onClick={() => this.handleClick(user)}>
                        <img className="search-user-img" src={user.user_image_url}></img><p className="search-user-username">{user.username}</p>
                    </li>)
                }
            })
        ) : ( [] )
        return (this.props.users) ? (
            <div className="search-bar-div">
                <i className="fas fa-search"></i>
                <input type="text"
                    className="search-bar-input"
                    onChange={this.handleInput()}
                    value={this.state.substr}
                    placeholder="Search"
                    onFocus={this.handleFocus}
                    />
                    {/* onBlur={this.handleBlur} */}
                <div className="search-users-list-div">
                    <ul className="search-users-list">
                        {(this.state.substr && this.state.show) ? users : <></>}
                    </ul>
                </div>
            </div>
        ) : (
            <>
            </>
        )
    }

}

export default SearchBar;