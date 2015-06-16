class PollVote < ActiveRecord::Base
  belongs_to :poll
  belongs_to(
    :voter,
    class_name: "User",
    foreign_key: :user_id
  )

  validates :user_id, :vine_vote_id, :poll_id, presence: true
  validates_uniqueness_of :user_id, scope: :poll_id
end
