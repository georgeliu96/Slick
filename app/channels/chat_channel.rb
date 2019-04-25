class ChatChannel < ApplicationCable::Channel
  def subscribed    
    channel = Channel.find_by(id: params[:id])
    stream_for channel
    load(params[:id])
  end

  def speak(data)
    channel = Channel.find_by(id: params[:id])
    message = Message.create(body: data['message'], channel_id: channel.id, user_id: data['id'])
    socket = {message: [message.body, data['id']], type: 'message'}
    ChatChannel.broadcast_to(channel, socket)
    ChannelNotificationsChannel.broadcast_to(
      "notifications",
      channel: channel.id,
      message: message.id
    )  
  end 

  def load(id)
    channel = Channel.includes(:messages).find_by(id: params[:id])
    messages = channel.messages.order(:created_at).collect(&:body)
    users = channel.messages.collect(&:user_id)
    socket = { messages: [messages, users], type: 'messages' }
    ChatChannel.broadcast_to(channel, socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
