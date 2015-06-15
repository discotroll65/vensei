class Vine < ActiveRecord::Base
  validates :vine_url, :src_url, :vine_author, :text, presence: true
  validates :vine_url, :src_url, uniqueness: true

  belongs_to :vine_author

  has_many(
    :challenged_battles,
    class_name: "Battle",
    foreign_key: :challenger_vine_id
  )

  has_many(
    :accepted_battles,
    class_name: "Battle",
    foreign_key: :acceptor_vine_id
  )

end
