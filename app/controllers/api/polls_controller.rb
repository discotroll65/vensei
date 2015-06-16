class Api::PollsController < ApplicationController
  def index
    @polls = Poll.all
    render :index
  end
end
