class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for 'chat_channel'
    load
  end

  def speak(data) 
    message = Message.create(body: data['message'], channel_id: 1, user_id: data['id'])
    socket = {message: [message.body, 2]}
    ChatChannel.broadcast_to('chat_channel', socket)
    load
  end 

  def load 
    messages = Message.all.collect(&:body)
    users = Message.all.collect(&:user_id)
    socket = { messages: [messages, users], type: 'messages' }
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
