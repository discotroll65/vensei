json.array! @battles do |battle|
  next if battle.seen_by?(current_user)
  json.extract! battle, :challenger_vine_id, :acceptor_vine_id, :proto_poll_id

  json.vines battle.vines do |vine|
    json.extract! vine, :id, :text, :vine_url, :src_url, :thumbnail_url
    json.vine_author vine.vine_author.vine_username
    json.author_profile_url vine.vine_author.profile_url
    json.total_votes battle.proto_poll.poll_votes.where(
      "vine_vote_id = ?", vine.id
    ).length
  end
end
