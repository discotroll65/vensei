class CreateVineTags < ActiveRecord::Migration
  def change
    create_table :vine_tags do |t|
      t.integer :vine_id, null: false
      t.integer :tag_id, null: false
    end

    add_index :vine_tags, :vine_id
    add_index :vine_tags, :tag_id

  end
end
