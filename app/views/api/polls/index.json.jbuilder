json.array! @polls do |poll|
  json.extract! poll, :user_id, :battle_id, :presentation_poll
  json.poll_votes poll.poll_votes
end
