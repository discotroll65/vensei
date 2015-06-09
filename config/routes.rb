Rails.application.routes.draw do
  get 'sessions/new'

  root 'static_pages#root'
  resource :session, only:[:new, :create, :destroy]
  resources :users, only: [:new, :create]

end
