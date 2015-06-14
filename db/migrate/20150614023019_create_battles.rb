class CreateBattles < ActiveRecord::Migration
  def change
    create_table :battles do |t|
      t.integer :challenger_vine_id, null: false
      t.integer :acceptor_vine_id, null: false

      t.timestamps null: false
    end

    add_index :battles, [:challenger_vine_id, :acceptor_vine_id], unique: true
  end
end
