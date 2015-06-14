class Poll < ActiveRecord::Base
  belongs_to :battle
  has_many :poll_votes

  validates :name, presence: true, uniquness: true
  validates :user_id, :battle_id, presence: true
end
