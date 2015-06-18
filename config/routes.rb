Rails.application.routes.draw do

  root 'static_pages#root'
  resource :session, only:[:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: {format: :json} do
    resources :vines, only:[:create, :index, :show]
    resources :battles, only: [:index]
    get '/polls/demo' => 'polls#demo'
    resources :polls, only: [:index, :show, :create]
    resources :poll_votes, only: [:create]
    resources :users, only: [:show, :update]
  end

end
