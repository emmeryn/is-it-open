Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :merchants
      resources :collections
    end
  end

  devise_for :users

  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root to: 'home#index'
end
