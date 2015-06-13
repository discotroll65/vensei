class VineAuthor < ActiveRecord::Base
  validates :vine_username, :profile_url, presence: true, uniqueness: true

  has_many :vines
end
