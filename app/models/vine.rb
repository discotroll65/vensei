class Vine < ActiveRecord::Base
  validates :vine_url, :src_url, :vine_author, :text, presence: true
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

  def self.find_or_create_by_url(vine_url, vine_client)
    vine = Vine.find_by(vine_url: vine_url)
    unless vine
      response_vine = vine_client.search(vine_url, {count: 1})[0]
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
      text: response_vine[:text],
      thumbnail_url: response_vine[:vine_thumbnail]
    }

    vine = vine_author.vines.create(new_vine_attrs)
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
