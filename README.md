# Production Readme

## SlackClone Name Pending

Live Site: [SlackClone Name-Pending](https://slack-clone-aa.herokuapp.com "Slack Clone")

![alt text][slackdemo]

[slackdemo]: https://github.com/saphknight/SlackClone-Name-Pending/blob/master/storage/slack-demo.PNG "Slack Demo"

SlackClone Name Pending is a imitation of the popular messaging webapp, Slack. 

## Installation

After cloning, make sure to run the following commands. 

* `bundle install`
* `npm install` 
* `bundle exec rails db:setup` 

## Features

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)  [![forthebadge](https://forthebadge.com/images/badges/made-with-ruby.svg)](https://forthebadge.com)

SlackClone makes use of a Ruby on Rails backend, and a React-Redux frontend. The main feature of chatting is done through action-cables in Rails. 

The main features that were implemented were chatting and the creation of channels. 

### Messages
Initially, before creating channels, the app functioned as one giant workspace. Message loading was done everytime someone subscribed to the channel. This would render all the previous messages for the channel as soon as someone joined. One issue with this was that a user that was currently on the site would not be able to see a new user's credentials if they signed up while the first user was still signed in. 

![alt text][missinguser]

[missinguser]: https://github.com/saphknight/SlackClone-Name-Pending/blob/master/storage/missing-user.png "Missing User Info"


This was resolved by checking the current state and fetching the last message's owner-credentials if that user could not be found. 

```javascript 
if (!(this.props.users[this.state.users[this.state.users.length - 1]])) {
    if (this.state.users.length > 0) {
        this.props.fetchUser(this.state.users[this.state.users.length - 1])
    }
}
```

### Channels 
Upon creating, channels, the backend channel needed to be changed such that each individual user channel would load seperate messages. This was achieved by adding the identifier of the channel id to our channels. Without this check, all messages would still be applied to the same channel. 

```javascript
  def subscribed
    # stream_from "some_channel"
    
    channel = Channel.find_by(id: params[:id])
    stream_for channel
    load(params[:id])
  end
```

Initially, creating a channel would not show up in the Sidebar and would need a refresh. In order to cause the sidebar to re-render, the form component was nested under the sidebar and had a function passed down to the child. This function would change the state of the sidebar and cause a re-render upon creation of the channel. 

```HTML
<!--Inside sidebar.jsx-->
<NewChannelContainer hidden={this.state.hidden} hideChannel={this.hideChannel}/>
```

```javascript
//Inside new_channel_form.jsx
handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(this.state).then(() => {
        this.props.hideChannel();
    })
    this.setState({
        name: "",
        description: ""
    })
}
```