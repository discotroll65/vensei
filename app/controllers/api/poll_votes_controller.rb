class Api::PollVotesController < ApplicationController
  def create
    @poll_vote = PollVote.new(poll_vote_params)
    if @poll_vote.save
      update_poll
      render json: @poll_vote
    else
      render json: @poll_vote.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def poll_vote_params
    params.require(:poll_vote).permit(:user_id, :vine_vote_id, :poll_id)
  end

  def update_poll
    poll = @poll_vote.poll
    if @poll_vote.vine_vote_id == poll.challenger_vine.id
      poll.update(challenger_vine_votes: poll.challenger_vine_votes + 1)
    elsif @poll_vote.vine_vote_id == poll.acceptor_vine.id
      poll.update(acceptor_vine_votes: poll.acceptor_vine_votes + 1)
    end
  end
end
