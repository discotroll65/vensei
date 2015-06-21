json.extract!(
  @poll,
  :id,
  :name,
  :user_id,
  :presentation_poll, :challenger_vine_votes, :acceptor_vine_votes
)

json.battle do
  json.partial! 'api/battles/battle', battle: @battle
end

json.voters @poll.voters do |voter|
  json.extract! voter, :id
end
