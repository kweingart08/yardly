Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

# ******* routes for users *******
  get '/users', to: 'users#index'
  get '/users/:id', to: 'users#show'
  post '/users', to: 'users#create'
  delete '/users/:id', to: 'users#delete'
  put '/users/:id', to: 'users#update'

  # ******* routes for employees *******
  get '/employees', to: 'employees#index'
  get '/employees/:id', to: 'employees#show'
  post '/employees', to: 'employees#create'
  delete '/employees/:id', to: 'employees#delete'
  put '/employees/:id', to: 'employees#update'

  # ******* routes for services *******
  get '/services', to: 'services#index'
  get '/services/:id', to: 'services#show'
  post '/services', to: 'services#create'
  delete '/services/:id', to: 'services#delete'
  put '/services/:id', to: 'services#update'

  # ******* routes for reviews *******
  get '/reviews', to: 'reviews#index'
  get '/reviews/:id', to: 'reviews#show'
  post '/reviews', to: 'reviews#create'
  delete '/reviews/:id', to: 'reviews#delete'
  put '/reviews/:id', to: 'reviews#update'


end
