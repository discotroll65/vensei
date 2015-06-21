proto_user = User.create(
  username: "proto_user",
  password: SecureRandom::urlsafe_base64
)
guest = User.create(username: "guest", password: "password")


parsed_vines = File.readlines('bin/urls_of_funnyvines')[0].split(',')
parsed_vines = parsed_vines.map do |vine_url|
  vine_url.gsub!("\"", "")
  vine_url.strip
end
parsed_vines.uniq!
#Seed your vines
vine_client = Vine.make_vine_client

parsed_vines.each do |vine_url|
  before_count = Vine.all.count
  Vine.find_or_create_by_url(vine_url, vine_client)
end

#Also Seed Battles
vine_array = Vine.all.to_a
vine_array.shuffle
while vine_array.length >= 2
  vine1 = vine_array.pop
  vine2 = vine_array.pop
  sorted_vines = [vine1, vine2].sort{|x,y| x.id <=> y.id}

  Battle.create!(
    challenger_vine_id: sorted_vines[0].id,
    acceptor_vine_id: sorted_vines[1].id
  )
end

#make a poll
demo_battle = Battle.create(challenger_vine_id: 1, acceptor_vine_id: 80 )
demo_battle.polls.create(
  user_id: 2,
  battle_id: Battle.last.id,
  name: "demo_poll",
  presentation_poll: true
)
