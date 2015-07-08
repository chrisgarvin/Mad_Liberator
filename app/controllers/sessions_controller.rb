class SessionsController < ApplicationController

  def create
    credentials = request.env['omniauth.auth']['credentials']
    session[:access_token] = credentials['token']
    session[:access_token_secret] = credentials['secret']

      @auth = request.env['omniauth.auth']
      user = User.from_omniauth(env['omniauth.auth'])
      session[:user_id] = user.id
      redirect_to root_path
  end

  def error
    flash[:error] = 'Sign in with Twitter failed'
    redirect_to root_path
  end

  def destroy
    reset_session
    redirect_to root_path, notice: 'Signed out'
  end
end
