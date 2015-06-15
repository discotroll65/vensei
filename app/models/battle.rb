class Battle < ActiveRecord::Base
  has_many :polls
  has_many :poll_votes, through: :polls

  belongs_to(
    :challenger_vine,
    class_name: 'Vine',
    foreign_key: :challenger_vine_id
  )

  belongs_to(
    :acceptor_vine,
    class_name: 'Vine',
    foreign_key: :acceptor_vine_id
  )

  validates :challenger_vine_id, :acceptor_vine_id, presence: true
  validates_uniqueness_of :challenger_vine_id, scope: :acceptor_vine_id

  def vines
    [self.challenger_vine, self.acceptor_vine]
  end

end
