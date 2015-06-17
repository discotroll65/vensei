class Api::BattlesController < ApplicationController
  def show
    @battle = Battle.find(params[:id])
    render :show
  end

  def index
    @battles = Battle.includes(
      {challenger_vine: :vine_author},
      {acceptor_vine: :vine_author},
      {polls: :poll_votes}
      ).all
    render :index
  end

  def create
    vine1 = Vine.find_or_create_by_url(vine_params[:vine1_url])
    vine2 = Vine.find_or_create_by_url(vine_params[:vine2_url])


    vine_ids = [vine1.id, vine2.id]

    @battle = Battle.find_or_create_by_vine_ids(
      { challenger_vine_id: vine_ids.min, acceptor_vine_id: vine_ids.max }
    )

    if @battle.save
      render json: @battle
    else
      render json: @battle.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def vine_params
    params.require(:battle).permit(:vine1_url, :vine2_url)
  end

end
