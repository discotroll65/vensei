class Battle < ActiveRecord::Base
  has_many :polls
  has_many :poll_votes, through: :polls

  validates :challenge_vine_id, :acceptor_vine_id, presence: true
  validates_uniqueness_of :challenge_vine_id, scope: :acceptor_vine_id
end
