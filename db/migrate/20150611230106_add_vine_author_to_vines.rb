class AddVineAuthorToVines < ActiveRecord::Migration
  def change
    add_column :vines, :vine_author, :string, presence: true

    add_index(:vines, :vine_author)
  end

end
