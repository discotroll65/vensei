json.array! @battles do |battle|
  json.partial! 'api/battles/battle', battle: battle
end
