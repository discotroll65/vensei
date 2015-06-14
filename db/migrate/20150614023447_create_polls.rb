class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.integer :battle_id, null: false

      t.timestamps null: false
    end

    add_index :polls, :user_id
    add_index :polls, :battle_id
    add_index :polls, :name, unique: true
  end
end
