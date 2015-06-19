json.array! @battles do |battle|
  next if battle.seen_by?(current_user)
  json.partial! 'api/battles/battle', battle: battle
end
