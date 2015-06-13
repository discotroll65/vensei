class AddVineAuthorIdToVinesTable < ActiveRecord::Migration
  def change
    add_column :vines, :vine_author_id, :integer, null: false

    add_index :vines, :vine_author_id
  end
end
