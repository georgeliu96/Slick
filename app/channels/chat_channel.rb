class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    
    channel = Channel.find_by(id: params[:id])
    stream_for channel
    load
  end

  def speak(data)
    channel = Channel.find_by(id: params[:id])
    message = Message.create(body: data['message'], channel_id: channel.id, user_id: data['id'])
    socket = {message: [message.body, data['id']], type: 'message'}
    ChatChannel.broadcast_to(channel, socket)
    load
  end 

  def load 
    messages = Message.all.collect(&:body)
    users = Message.all.collect(&:user_id)
    channel = Channel.find_by(id: params[:id])
    socket = { messages: [messages, users], type: 'messages' }
    ChatChannel.broadcast_to(channel, socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
