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
    @battle = Battle.new(vine_params)

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
