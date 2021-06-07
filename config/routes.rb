Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :merchants
    end
  end

  root to: 'home#index'
  get 'home', to: 'home#index'
  devise_for :users
end
