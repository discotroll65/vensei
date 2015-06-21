class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :label, null: false
    end

    add_index :tags, :label, unique: true
  end
end
