class CreatePollVotes < ActiveRecord::Migration
  def change
    create_table :poll_votes do |t|
      t.integer :user_id, null: false
      t.integer :vine_vote_id, null: false
      t.integer :poll_id, null: false
      t.boolean :save_poll, null: false, default: false

      t.timestamps null: false
    end

    add_index :poll_votes, [:user_id, :poll_id], unique: true
    add_index :poll_votes, :vine_vote_id
    add_index :poll_votes, :save_poll

  end
end
