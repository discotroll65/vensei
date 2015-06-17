class Api::VinesController < ApplicationController


  def show
    @vine = Vine.includes(:vine_author).find(params[:id])
    render :show
  end

  def index
    @vines = Vine.includes(:vine_author).all
    render :index
  end

  def create
    @vine = Vine.new(vine_params)

    if @vine.save
      render json: @vine
    else
      render json: @vine.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def vine_params
    params.require(:vine).permit(:vine_url)
  end

end
