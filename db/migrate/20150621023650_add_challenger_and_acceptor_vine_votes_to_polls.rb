class AddChallengerAndAcceptorVineVotesToPolls < ActiveRecord::Migration
  def change
    add_column :polls, :challenger_vine_votes, :integer, null: false, default: 0
    add_column :polls, :acceptor_vine_votes, :integer, null: false, default: 0
  end
end
