class Api::PollsController < ApplicationController
  def index
    @polls = Poll.all
    render :index
  end

  def show
    @poll = Poll.find(params[:id])
    render json: @poll
  end

  def create
    vine_client = Vine.make_vine_client
    vine1 = Vine.find_or_create_by_url(poll_params[:vine1_url], vine_client)
    vine2 = Vine.find_or_create_by_url(poll_params[:vine2_url], vine_client)


    vine_ids = [vine1.id, vine2.id]

    @battle = Battle.find_or_create_by_vine_ids(
      { challenger_vine_id: vine_ids.min, acceptor_vine_id: vine_ids.max }
    )

    @poll = @battle.polls.create(
      name: poll_params[:name],
      user_id: current_user.id,
      battle_id: @battle.id,
      presentation_poll: true
    )

    if @poll.save
      render json: @poll
    else
      render json: @poll.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def poll_params
    params.require(:poll).permit(:vine1_url, :vine2_url, :name)
  end

end
