# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  user_image_url  :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord 

    validates :username, :user_image_url, :email, :password_digest, :session_token, presence: true 
    validates :email, :session_token, uniqueness: true 
    validates :password, length: {minimum: 6}, allow_nil: true 

    after_initialize :ensure_session_token, :ensure_image
    attr_reader :password 

    has_many :messages 

    has_many :user_channels,
        class_name: :UserChannel,
        foreign_key: :user_id

    has_many :channels,
        through: :user_channels,
        source: :channel 


    def password=(password)
        @password = password 
        self.password_digest= BCrypt::Password.create(password)
    end 

    def reset_session_token! 
        self.update!(session_token: self.class.generate_session_token)
        self.session_token 
    end 

    
    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        user && user.is_password?(password) ? user : nil 
    end 
    
    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    private 
    def ensure_session_token 
        self.session_token ||= self.class.generate_session_token
    end 

    def ensure_image 
        self.user_image_url ||= "https://ca.slack-edge.com/T03GU501J-UFA742WTH-g1380d400f3d-512"
    end 
    
    def self.generate_session_token 
        SecureRandom::urlsafe_base64 
    end 

end 
