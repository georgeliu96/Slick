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
u1 = User.create!({username: "mike", password: "password", email: "mike@email.com"})
u2 = User.create!({username: "marcus", password: "password", email: "marcus@email.com"})
u3 = User.create!({username: "stacy", password: "password", email: "stacy@email.com"})
u4 = User.create!({username: "elizabeth", password: "password", email: "elizabeth@email.com"})
u5 = User.create!({username: "jj", password: "password", email: "jj@email.com"})
u6 = User.create!({username: "julien", password: "password", email: "julien@email.com"})
u7 = User.create!({username: "sarah", password: "password", email: "sarah@email.com"})
u8 = User.create!({username: "kwasi", password: "password", email: "kwasi@email.com"})
u9 = User.create!({username: "lytton", password: "password", email: "lytton@email.com"})

default_channel = Channel.create!({name: "general", description: "General channel", direct_message?: false, workspace_id: 1})
default_channel.user_ids = User.all.collect(&:id)
test_channel = Channel.create!({name: "Best Channel", description: "best channel ever created", direct_message?:false, workspace_id: 1})
test_channel.user_ids = User.all.collect(&:id)  
c1 = Channel.create!({name: "Job seekers", description: "Come here for the best jobs!", direct_message?:false, workspace_id: 1})
c1.user_ids = User.all.collect(&:id)  
c2 = Channel.create!({name: "App Academy", description: "App Academy professional", direct_message?:false, workspace_id: 1})
c2.user_ids = User.all.collect(&:id)  
c3 = Channel.create!({name: "02-04-19 Cohort", description: "02-04-19 Cohort", direct_message?:false, workspace_id: 1})
c3.user_ids = User.all.collect(&:id)  
c4 = Channel.create!({name: "Gamers Channel", description: "Come here if you're looking for fellow gamers", direct_message?:false, workspace_id: 1})
c4.user_ids = User.all.collect(&:id)  