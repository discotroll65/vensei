class AddTextToVines < ActiveRecord::Migration
  def change
    add_column :vines, :text, :string, presence: true
  end
end
