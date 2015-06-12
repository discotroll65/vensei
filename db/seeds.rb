# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

TwitterVine::Client.setup do |config|
  config.api_key = "#{ENV["TWITTER_API_KEY"]}"
  config.api_secret = "#{ENV["TWITTER_API_SECRET"]}"
  config.oauth_token = "#{ENV["TWITTER_OAUTH_TOKEN"]}"
  config.oauth_secret = "#{ENV["TWITTER_OAUTH_SECRET"]}"
end

parsed_vines = File.readlines('bin/urls_of_funnyvines')[0].split(',')
parsed_vines = parsed_vines.map do |vine_url|
  vine_url.gsub!("\"", "")
  vine_url.strip
end

parsed_vines.each do |vine_url|
  response_vine = TwitterVine::Client.search(vine_url, {count: 1})[0]
  if response_vine
    new_vine = {
      vine_url: response_vine[:vine_url],
      src_url: response_vine[:vine_src],
      vine_author: response_vine[:vine_author],
      text: response_vine[:text]
    }
    Vine.create(new_vine)
  end
end
