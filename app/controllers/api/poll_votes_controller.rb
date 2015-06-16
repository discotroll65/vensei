class Api::PollVotesController < ApplicationController
  def create
    @poll_vote = PollVote.new(poll_vote_params)
    if @poll_vote.save
      render json: @poll_vote
    else
      render json: @poll_vote.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def poll_vote_params
    params.require(:poll_vote).permit(:user_id, :vine_vote_id, :poll_id)
  end
end
