class VineAuthor < ActiveRecord::Base
  validates :vine_username, :profile_url, presence: true, uniqueness: true

  has_many :vines

  def self.find_or_create_by_api(response_vine)
    vine_author = VineAuthor.find_by(vine_username: response_vine[:vine_author])
    if !vine_author
      vine_author = VineAuthor.create({
        vine_username: response_vine[:vine_author],
        profile_url: response_vine[:vine_author_profile_url]
      })
    end

    vine_author
  end
end
