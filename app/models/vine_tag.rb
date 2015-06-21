class VineTag < ActiveRecord::Base
  validates :vine_id, :tag_id, presence: true

  belongs_to :vine
  belongs_to :tag
end
