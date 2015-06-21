class PollsController < ApplicationController
  def show
    make_guest_user unless current_user
    redirect_to "/#polls/#{params[:id]}"
  end

  private
  def make_guest_user
    user = User.new(
      username: "guest_" + Faker::Hacker.noun +  rand(1..999).to_s,
      password: "password"
    )
    user.save
    sign_in!(user)
  end
end
