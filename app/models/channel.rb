# == Schema Information
#
# Table name: channels
#
#  id              :bigint(8)        not null, primary key
#  name            :string           not null
#  description     :string           not null
#  direct_message? :boolean          not null
#  workspace_id    :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Channel < ApplicationRecord 

    validates :name, :description, :workspace_id, presence: true 
    validates :direct_message?, inclusion: {in: [true, false]} 

    has_many :user_channels

    has_many :users,
        through: :user_channels,
        source: :user 
    
    has_many :messages

end 
