# == Schema Information
#
# Table name: user_channels
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserChannel < ApplicationRecord

    belongs_to :user 
    belongs_to :channel 

end 
