Rails.application.routes.draw do
  namespace :api do
  get 'vines/show'
  end

  root 'static_pages#root'
  resource :session, only:[:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: {format: :json} do
    resources :vines, only:[:create, :index, :show]
  end

end
