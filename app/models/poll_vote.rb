class PollVote < ActiveRecord::Base
  belongs_to :poll
  belongs_to(
    :voter,
    class_name: "User",
    foreign_key: :user_id
  )

  validates :user_id, :vine_vote_id, :poll_id, presence: true
  validates :user_id, uniqueness: {scope: :poll_id}
end
