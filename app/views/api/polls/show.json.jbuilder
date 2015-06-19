json.extract! @poll, :id, :name, :user_id, :presentation_poll
json.battle do
  json.partial! 'api/battles/battle', battle: @battle
end
