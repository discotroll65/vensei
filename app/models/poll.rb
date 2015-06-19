class Poll < ActiveRecord::Base
  belongs_to :battle

  has_many :poll_votes
  belongs_to(
    :author,
    class_name: "User",
    foreign_key: "user_id"
  )

  has_many(
    :voters,
    through: :poll_votes,
    source: :voter
  )

  has_many(
    :vine_votes,
    through: :poll_votes,
    source: :vine_vote
  )

  has_one :challenger_vine, through: :battle
  has_one :acceptor_vine, through: :battle

  validates :name, presence: true, uniqueness: true
  validates :author, :battle, presence: true
end
