json.extract! channel, :id, :name, :description
json.user_ids channel.user_channels.pluck(:user_id)
json.direct_message channel.direct_message?