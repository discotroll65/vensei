class Vine < ActiveRecord::Base
  validates :vine_url, :src_url, :vine_author, presence: true
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

  has_many :vine_tags
  has_many :tags, through: :vine_tags

  def self.find_or_create_by_url(vine_url, vine_client)
    vine = Vine.find_by(vine_url: vine_url)
    unless vine
      response_vine = TwitterVine.parse(vine_url)
      vine = Vine.make_vine_from_api(response_vine)
    end

    vine
  end

  def self.make_vine_from_api(response_vine)
    return Vine.new unless response_vine
    vine_author = VineAuthor.find_or_create_by_api(response_vine)

    new_vine_attrs = {
      vine_url: response_vine[:vine_url],
      src_url: response_vine[:vine_src],
      text: response_vine[:vine_text],
      thumbnail_url: response_vine[:vine_thumbnail]
    }


    vine = vine_author.vines.create!(new_vine_attrs)
    vine.build_hashtags(response_vine)
    vine
  end

  def build_hashtags(response_vine)
    hashtags = response_vine[:vine_hashtags]
    if response_vine[:tweet_hashtags]
      hashtags = hashtags.concat(response_vine[:tweet_hashtags])
    end

    hashtags.each do |hashtag|
      self.tags.create(label: hashtag)
    end
  end

  def self.make_vine_client
    TwitterVine::Client.setup do |config|
      config.api_key = "#{ENV["TWITTER_API_KEY"]}"
      config.api_secret = "#{ENV["TWITTER_API_SECRET"]}"
      config.oauth_token = "#{ENV["TWITTER_OAUTH_TOKEN"]}"
      config.oauth_secret = "#{ENV["TWITTER_OAUTH_SECRET"]}"
    end

    TwitterVine::Client
  end

end
