class DeleteSavedPollFormPollvotesAddPresentationPollToPolls < ActiveRecord::Migration
  def up
    remove_column :poll_votes, :save_poll

    add_column :polls, :presentation_poll, :string, null: false, default: false
    add_index :polls, :presentation_poll
  end

  def down
    add_column :poll_votes, :save_poll, :string, null: false, default: false
    add_index :poll_votes, :save_poll

    remove_column :polls, :presentation_poll
  end
end
