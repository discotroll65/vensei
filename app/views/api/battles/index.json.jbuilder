json.array! @battles do |battle|
  json.extract! battle, :challenger_vine_id, :acceptor_vine_id

  json.vines battle.vines do |vine|
    json.extract! vine, :text, :vine_url, :src_url, :thumbnail_url
    json.vine_author vine.vine_author.vine_username
    json.author_profile_url vine.vine_author.profile_url
  end
end
