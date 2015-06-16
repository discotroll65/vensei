class AddProtoPollToBattles < ActiveRecord::Migration
  def change
    add_column :battles, :proto_poll_id, :integer
    add_index :battles, :proto_poll_id, unique: true
  end
end
