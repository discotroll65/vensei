class AddUniquenessToVines < ActiveRecord::Migration
  def down
    drop_table :vines

    create_table :vines do |t|
      t.string :vine_url, null: false, unique: true
      t.string :src_url, null: false, unique: true

      t.timestamps null: false
    end
  end

  def up
    remove_column(:vines, :vine_url)
    remove_column(:vines, :src_url)

    add_column(:vines, :vine_url, :string)
    add_column(:vines, :src_url, :string)

    add_index(:vines, :vine_url, unique: true)
    add_index(:vines, :src_url, unique: true)
  end
end
