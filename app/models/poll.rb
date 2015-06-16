class Poll < ActiveRecord::Base
  belongs_to :battle

  has_many :poll_votes
  belongs_to :user

  validates :name, presence: true, uniqueness: true
  validates :user, :battle, presence: true
end
