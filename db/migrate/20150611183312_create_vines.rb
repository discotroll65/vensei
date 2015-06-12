class CreateVines < ActiveRecord::Migration
  def change
    create_table :vines do |t|
      t.string :vine_url, null: false, unique: true
      t.string :src_url, null: false, unique: true

      t.timestamps null: false
    end
  end
end
