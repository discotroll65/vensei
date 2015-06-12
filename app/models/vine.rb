class Vine < ActiveRecord::Base
  validates :vine_url, :src_url, :vine_author, :text, presence: true
  validates :vine_url, :src_url, uniqueness: true

end
