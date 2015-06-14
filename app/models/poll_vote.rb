class PollVote < ActiveRecord::Base
  belongs_to :poll

  validates :user_id, :vine_vote_id, :poll_id, :save_poll, presence: true
  validates_uniqueness_of :user_id, scope: :poll_id
end
