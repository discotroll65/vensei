json.array! @battles do |battle|
  json.extract! battle, :challenger_vine_id, :acceptor_vine_id
  json.vines battle.vines
end
