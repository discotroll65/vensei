class RemoveVineAuthorAttributesFromVinesTable < ActiveRecord::Migration
  def up
    remove_column :vines, :author_profile_url
    remove_column :vines, :vine_author
  end

  def down
    add_column :vines, :author_profile_url, :string

    add_column :vines, :vine_author, :string, presence: true
    add_index(:vines, :vine_author)
  end
end
