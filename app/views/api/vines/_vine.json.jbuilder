json.extract!(
  vine, :id, :text, :vine_url, :src_url, :thumbnail_url
)

json.vine_author vine.vine_author.vine_username
json.author_profile_url vine.vine_author.profile_url
