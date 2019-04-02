class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    
    channel = Channel.find_by(id: params[:id])
    stream_for channel
    load(params[:id])
  end

  def speak(data)
    channel = Channel.find_by(id: params[:id])
    message = Message.create(body: data['message'], channel_id: channel.id, user_id: data['id'])
    socket = {message: [message.body, data['id']], type: 'message'}
    ChatChannel.broadcast_to(channel, socket)
    load(params[:id])
  end 

  def load(id)
    channel = Channel.includes(:messages).find_by(id: params[:id])
    messages = channel.messages.collect(&:body)
    users = channel.messages.collect(&:user_id)
    socket = { messages: [messages, users], type: 'messages' }
    ChatChannel.broadcast_to(channel, socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
