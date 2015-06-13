class CreateVineAuthors < ActiveRecord::Migration
  def change
    create_table :vine_authors do |t|
      t.string :vine_username, null: false
      t.string :profile_url, null: false

      t.timestamps null: false
    end

    add_index( :vine_authors, :vine_username, unique: true)
  end
end
