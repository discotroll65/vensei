class AddThumbnailUrlToVines < ActiveRecord::Migration
  def change
    add_column :vines, :thumbnail_url, :string
  end
end
