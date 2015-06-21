class Tag < ActiveRecord::Base
  validates :label, presence: true, uniqueness: true

  has_many :vine_tags
  has_many :vines, through: :vine_tags

end
