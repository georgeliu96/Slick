Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do 
    resources :users, only: %i(create index show) 
    resource :session, only: %i(create destroy show) 
    resources :channels, only: %i(index create show destroy)
    post "/dm_channels", to: "channels#create_dm"
  end 

  mount ActionCable.server, at: '/cable'

end
