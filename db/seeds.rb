# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all 
Message.destroy_all
Channel.destroy_all

demo_user = User.create!({username: "demo", password: "password", email: "demo@email.com"})
second_user = User.create!({username: "user2", password: "password", email: "user2@email.com"})

default_channel = Channel.create!({name: "general", description: "General channel", direct_message?: false, workspace_id: 1})
default_channel.user_ids = User.all.collect(&:id)
test_channel = Channel.create!({name: "test", description: "TEST", direct_message?:false, workspace_id: 1})
test_channel.user_ids = User.all.collect(&:id)

test_dm = Channel.create!({name: "test_dm", description:"Test DM", direct_message?:true, workspace_id: 1})
test_dm.user_ids = [demo_user.id]