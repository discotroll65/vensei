class Api::PollsController < ApplicationController
  def index
    @polls = Poll.all
    render :index
  end

  def show
    @poll = current_user.polls.where(id: params[:id])[0]
    @poll ? (render json: @poll) : (render(
      json: ["Poll does not belong to you!"], status: :unprocessable_entity
    ))
  end

  def demo
    @poll = Poll.find(params[:id])
    render json: @poll
  end


  def create
    vine_ids = fetch_vines_return_ids
    #challenger_id is always less than acceptor_id
    if vine_ids.none?{|id| id == nil}
      vine_ids.sort!{|challenger_id, acceptor_id| challenger_id <=> acceptor_id}
    end

    @battle = Battle.find_or_create_by_vine_ids(
      {
        challenger_vine_id: vine_ids[0] == 0 ? nil : vine_ids[0],
        acceptor_vine_id: vine_ids[1] == 0 ? nil : vine_ids[1],
      }
    )

    if !@battle.valid?
      render json: @battle.errors.full_messages, status: :unprocessable_entity
      return
    end

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

  def fetch_vines_return_ids
    vine_client = Vine.make_vine_client

    vine1 = Vine.find_or_create_by_url(poll_params[:vine1_url], vine_client)
    # vine1_errors = vine_wonky?(vine1, "first")

    vine2 = Vine.find_or_create_by_url(poll_params[:vine2_url], vine_client)
    # vine2_errors = vine_wonky?(vine2, "second")

    [vine1.id, vine2.id]
  end

end
