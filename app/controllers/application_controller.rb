class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :signed_in?, :dummy_user

private
  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def dummy_user
    @dummy_user ||= User.find_by(session_token: session[:dummy_token])
  end

  def sign_in_dummy_user!(dummy_user)
    @dummy_user = dummy_user
    session[:dummy_token] = dummy_user.reset_session_token!
  end

  def sign_in!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def sign_out!
    current_user.reset_session_token!
    session[:session_token] = nil
    dummy_user.reset_session_token! if dummy_user
    session[:dummy_token] = nil
  end

  def signed_in?
    !!current_user
  end

  def ensure_signed_in!
    redirect_to new_session_url unless current_user
  end

end
