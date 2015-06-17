class Battle < ActiveRecord::Base
  has_many :polls

  belongs_to(
    :proto_poll,
    class_name: "Poll",
  )

  has_many(
    :proto_poll_voters,
    through: :proto_poll,
    source: :voters
  )

  has_many :poll_votes, through: :polls
  has_many :voters, through: :polls


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
  validates :proto_poll, uniqueness: true
  validates_uniqueness_of :challenger_vine_id, scope: :acceptor_vine_id

  after_create :ensure_proto_poll

  def vines
    [self.challenger_vine, self.acceptor_vine]
  end

  def ensure_proto_poll
    vine1_id = self.challenger_vine_id
    vine2_id = self.acceptor_vine_id
    if !self.proto_poll && vine1_id && vine2_id
      proto_poll = self.polls.create(
        name: "Vines #{vine1_id} and #{vine2_id} proto_poll",
        user_id: 1
      )
      self.proto_poll = proto_poll
      self.save
    end
  end

  def seen_by?(user)
    self.proto_poll_voters.include?(user)
  end

  def self.find_or_create_by_vine_ids(vine_ids_hash)
    battle = Battle.find_by(
      challenger_vine_id: vine_ids_hash[:challenger_vine_id],
      acceptor_vine_id: vine_ids_hash[:acceptor_vine_id]
    )

    unless battle
      battle = Battle.create(vine_ids_hash)
    end

    battle
  end

end
