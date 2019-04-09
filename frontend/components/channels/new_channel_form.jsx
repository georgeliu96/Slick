import React from 'react';

class NewChannelForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.channel;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createChannel(this.state).then(({ channel }) => { 
            this.props.hideChannel();
            this.props.handleCreate(channel);
        })
        this.setState({
            name: "",
            description: ""
        })
    }

    cancelForm(e) {
        e.preventDefault();
        this.setState({
            name: "",
            description: ""
        })
        this.props.hideChannel();
    }
    

    handleInput(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value
            })
        }
    }

    render() {
        return (
        <div className={this.props.hidden ? "new-channel-form-page hidden-form" : "new-channel-form-page"}>
            <button onClick={this.cancelForm} className="close-form-button"><i className="fas fa-times"></i></button>

            <div className="form-div">
                <h1 className="new-channel-form-header">Create a channel</h1>
                <div className = "channel-form-desc">
                    Channels are where your memebers communicate. They're best when organized around a topic - #leads for example.  
                </div>
                <form className="new-channel-form">
                    <label className="channel-label channel-name-label">Name</label>
                    <input className="channel-input" type="text" value={this.state.name} placeholder="Enter Channel Name" onChange={this.handleInput("name")} required/>
                    <label className="channel-footer channel-name-footer">What is the name of this channel?</label>
                    <label className="channel-label channel-purpose-label">Purpose</label>    
                    <input className="channel-input" type="text" value={this.state.description} placeholder="Enter Description Name" onChange={this.handleInput("description")} required/>
                    <label className="channel-footer channel-purpose-footer">What's this channel about?</label>
                    <div className="channel-buttons-div">
                        <input type="submit" value="Cancel" className="cancel-form" onClick={this.cancelForm}/>
                        <input type="submit" value="Create Channel" className="submit-form" onClick={this.handleSubmit} disabled={!(this.state.name && this.state.description)}/>
                    </div>
                </form>
            </div> 
        </div>

    )}
}

export default NewChannelForm;