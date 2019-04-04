class Api::ChannelsController < ApplicationController 

    def index 
        @channels = Channel.all.includes(:user_channels)
    end 

    def show 
        @channel = Channel.includes(:user_channels).find_by(id: params[:id])
    end 

    def create 
        @channel = Channel.new(channel_params)
        @channel.workspace_id = 1
        @channel["direct_message?"] = false;
        # TODO: change line 12 to specific workspace upon implementing workspaces
        if @channel.save 
            # TODO: will eventually select only users in the specific workspace
            @channel.users << User.all
            render "api/channels/show"
        else 
            render json: @channel.errors.full_messages, status: 422
        end 
    end 

    def create_dm 
        @channel = Channel.new(channel_params) 
        @channel.workspace_id = 1
        @channel["direct_message?"] = true
        ids = [] 
        params["channel"][:users].each do |_,v| 
            ids << v["id"]
        end 
        ids << current_user.id
        @channel.user_ids = ids
        if @channel.save  
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