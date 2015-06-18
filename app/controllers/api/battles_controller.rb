class Api::BattlesController < ApplicationController
  def index
    @battles = Battle.includes(
      {challenger_vine: :vine_author},
      {acceptor_vine: :vine_author},
      {polls: :poll_votes}
      ).all
    render :index
  end

end
