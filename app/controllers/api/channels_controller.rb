class Api::ChannelsController < ApplicationController 

    def index 
        @channels = Channel.all 
    end 

    def show 
        @channel = Channel.find_by(id: params[:id])
    end 

    def create 
        @channel = Channel.new(channel_params, workspace_id: 1, direct_message?: false)
        # TODO: change line 12 to specific workspace upon implementing workspaces
        if @channel.save 
            # TODO: will eventually select only users in the specific workspace
            users = User.all
            users.each do |user| 
                UserChannel.create(channel_id: @channel.id, user_id: user.id)
            end 
            render "api/channels/show"
        else 
            render json: @channel.errors.full_messages, status: 422
        end 
    end 

    def create_dm 
        @channel = Channel.new(channel_params, workspace_id: 1, direct_message?: true) 
        if @channel.save  
            # HOW TO ADD OTHER USERS TO THIS DM?
            UserChannel.create(channel_id: @channel.id, user_id: current_user.id)
            render "api/channels/show"
        else 
            render json: @channel.errors.full_messages, status: 422 
        end 
    end 

    def destroy 
        @channel = Channel.find_by(id: params[:id])
        if @channel 
            @channel.destroy 
            render :show 
        else 
            render json: ["No such channel"], status: 404 
        end 
    end 

    private 
    def channel_params 
        params.require(:channel).permit(:name, :description)
    end 
end 