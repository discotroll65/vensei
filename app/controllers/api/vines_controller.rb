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

  def make_vine_client
    TwitterVine::Client.setup do |config|
      config.api_key = "#{ENV["TWITTER_API_KEY"]}"
      config.api_secret = "#{ENV["TWITTER_API_SECRET"]}"
      config.oauth_token = "#{ENV["TWITTER_OAUTH_TOKEN"]}"
      config.oauth_secret = "#{ENV["TWITTER_OAUTH_SECRET"]}"
    end

    TwitterVine::Client

    # vine_client = make_vine_client
    # options.merge(params[:])
    # vines = TwitterVine::Client.search(params[:query], options)
  end
end
