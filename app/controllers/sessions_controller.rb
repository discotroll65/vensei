class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username], params[:user][:password]
    )
    if @user
      make_dummy_user if @user.username == "Goku"
      sign_in!(@user)
      redirect_to root_url
    else
      @user = User.new
      flash.now[:errors] = ["Invalid username / password"]
      render :new
    end
  end

  def destroy
    sign_out!
    respond_to do |format|
      format.html do
        redirect_to new_session_url
      end
      format.json do
        render json: {}
      end
    end
  end

  private
  def make_dummy_user
    dummy_user = User.new(
      username: Faker::Hacker.noun + rand(1..999).to_s, password: "password"
    )
    sign_in_dummy_user!(dummy_user)
  end
end
