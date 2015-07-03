vine_url1 = "https://vine.co/v/eeLXnZabFeu"
vine_url2 = "https://vine.co/v/e71zl61jgw9"

def make_vine_client
  TwitterVine::Client.setup do |config|
    config.api_key = "#{ENV["TWITTER_API_KEY"]}"
    config.api_secret = "#{ENV["TWITTER_API_SECRET"]}"
    config.oauth_token = "#{ENV["TWITTER_OAUTH_TOKEN"]}"
    config.oauth_secret = "#{ENV["TWITTER_OAUTH_SECRET"]}"
  end

  TwitterVine::Client
end



tc = ::Twitter::REST::Client.new do |config|
  config.consumer_key        = "#{ENV["TWITTER_API_KEY"]}"
  config.consumer_secret     = "#{ENV["TWITTER_API_SECRET"]}"
  config.access_token        = "#{ENV["TWITTER_OAUTH_TOKEN"]}"
  config.access_token_secret = "#{ENV["TWITTER_OAUTH_SECRET"]}"
end
opts = {}
opts[:include_entities] = true
opts[:lang] ||= "en"
opts[:count] ||= 10
vine_criteria = "\"vine.co/v/\" #{vine_url2} -RT"
puts "Using search criteria [#{vine_criteria}]" if TwitterVine::DEBUG
#_normalize(tc.search(vine_criteria, opts))
vc = make_vine_client
response_vine = vc.search(vine_url2, {count: 1})[0]



puts "hmm"

#vine text:
doc.xpath("//div")[0]
  .children[1].children[1].children[3].children[10].children[0].text
#hashtag regex
hashtag_regex = /#([A-Za-z0-9]+)/
