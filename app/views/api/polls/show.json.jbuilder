json.extract! @poll, :id, :name, :user_id, :presentation_poll

json.battle do
  json.partial! 'api/battles/battle', battle: @battle
end

json.challenger_vine_votes @poll.vine_votes.where(
  id: @cha_vine.id).count
json.acceptor_vine_votes @poll.vine_votes.where(
  id: @acc_vine.id).count
