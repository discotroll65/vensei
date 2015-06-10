# Vensei

[Heroku link][heroku]

[heroku]: http://vensei.herokuapp.com

## Minimum Viable Product
Vensei lets you know how your vine tastes match up against the public in real time. Inspired by Poll Everywhere, Vensei is built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [ ] Vote on Vines 
- [ ] Create Vine matchup polls 
- [ ] See matchup poll results as they come in when people vote via web portal
- [ ] Earn points for correctly choosing winner of matchup having > 25 votes
- [ ] See a leaderboard of top users
- [ ] Vote on Vines by tag name
- [ ] See matchup poll results as they come in when people vote via SMS (text message)

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Vine Embedding (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, the basic layout of the landing page will
be done, and users will be able to see two vines load every 15 seconds. The most 
important part of this phase will be figuring out the vine gem, and pushing the 
app to Heroku and ensuring that
everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Voting on posts, having graph live update (~2 days)

I will add API routes to serve voting data of specific vine matchups as JSON,
and then add Backbone models and collections that fetch data from those routes.
By the end of this phase, users will be able to see graphs update live as votes
are created in the console.

[Details][phase-two]

### Phase 3: Generating new routes for new polls on the fly (~2 days)
By the end of this phase, Users will be able to display a newly created
fragment for voters to go to in a web browser in order to vote on a vine
battle. I will have to figure out how to generate new fragments on the fly,
and make a voting view. 

[Details][phase-three]

### Phase 4: Keeping track of User score (~2 days)
If a user is logged in, and they choose the winning vine in a battle having 25
or more votes, then they'll receive a certain number of points. If they are wrong
they'll lose more points than if they were right. This means that it will be harder
to consistently maintain a high score if you get as many right as you get wrong. I
will also need to have an icon keep score

[Details][phase-four]

### Bonus Features (TBD)
- [ ] Leaderboard
- [ ] Users can vote on Vines via tag
- [ ] Statistics are integrated, so that status of "too close to call" can be integrated if p-value less than .05
- [ ] SMS integration with Twilio API
- [ ] User can set timer on one's self so that if they don't stop vensei-ing before timer runs out, they will Rick Roll themselves and their score will be reset to 0. 
- [ ] Gravitar integration

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md

