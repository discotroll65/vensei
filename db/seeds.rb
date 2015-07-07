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

deleting = File.readlines('bin/test_deleting')
deleting = deleting.map do |url|
  url.gsub!("\"", "")
  url[0..-3].strip
end

parsed_vines = parsed_vines - deleting

#Seed your vines
vine_client = Vine.make_vine_client

parsed_vines.each do |vine_url|
  Vine.find_or_create_by_url(vine_url, vine_client)
end

#Also Seed Battles
vine_array = Vine.all.to_a
vine_array.shuffle
while vine_array.length >= 2
  vine1 = vine_array.pop
  vine2 = vine_array.pop
  sorted_vines = [vine1, vine2].sort{|x,y| x.id <=> y.id}

  Battle.create(
    challenger_vine_id: sorted_vines[0].id,
    acceptor_vine_id: sorted_vines[1].id
  )
end

#make a poll
demo_battle = Battle.create(challenger_vine_id: 1, acceptor_vine_id: 50 )
demo_battle.polls.create(
  user_id: 2,
  battle_id: Battle.last.id,
  name: "demo_poll",
  presentation_poll: true
)

#make Goku
goku = User.create(username: 'Goku', password: 'password')
goku_start_polls ={
  "SSJ sloth vs dancers" => [
    "https://vine.co/v/hnWE0jbzJK1", "https://vine.co/v/OtKDugqbwjz"
    ],
  "DragonTales vs DragonBallZ" => [
    "https://vine.co/v/M1hgp6DZh3q", "https://vine.co/v/O0vObB25TaO"
    ],
  "Crazy vs Gorilla Phone" => [
    "https://vine.co/v/OvrtdYJBrzJ", "https://vine.co/v/O6BL1Ub6rXU"
    ],
  "Athlete vs Rap Battle" => [
    "https://vine.co/v/OBWq5WLU95l", "https://vine.co/v/ehzUzjYIa66"
    ],
  "Cool Kids vs Chickens" => [
    "https://vine.co/v/MFFihIBAOtg", "https://vine.co/v/eiHrbHlmBYK"
    ],
  "Sass vs Yass" => [
    "https://vine.co/v/hE6tZYHQqJu", "https://vine.co/v/ee1MhZr59Le"
    ]
}
goku_start_polls.each do |poll_name, poll_combo|

  vine1 = Vine.find_or_create_by_url(poll_combo[0], vine_client)
  vine2 = Vine.find_or_create_by_url(poll_combo[1], vine_client)

  vine_ids = [vine1.id, vine2.id]

  if vine_ids.none?{|id| id == nil}
    vine_ids.sort!{|challenger_id, acceptor_id| challenger_id <=> acceptor_id}
  end

  battle = Battle.find_or_create_by_vine_ids(
    {
      challenger_vine_id: vine_ids[0] == 0 ? nil : vine_ids[0],
      acceptor_vine_id: vine_ids[1] == 0 ? nil : vine_ids[1],
    }
  )

  if battle.valid?
    poll = battle.polls.create(
      name: poll_name,
      user_id: goku.id,
      battle_id: battle.id,
      presentation_poll: false
    )
  end

end
