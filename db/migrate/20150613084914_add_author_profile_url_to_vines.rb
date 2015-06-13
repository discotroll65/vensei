class AddAuthorProfileUrlToVines < ActiveRecord::Migration
  def change
    add_column :vines, :author_profile_url, :string
  end
end
