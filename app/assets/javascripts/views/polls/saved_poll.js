Vensei.Views.SavedPoll = Backbone.CompositeView.extend({
  template: JST['polls/saved_poll'],

  className: 'live-saved-poll-place-holder',

  events: {
    "click .vote" : "voteFromClick",
  },

  initialize: function(options){
    this.poll = this.model;
    this.battle = options.battle;
    this.vines = this.battle.vines();
    this.challengerVine = this.vines.shift();
    this.acceptorVine = this.vines.shift();
    this.challengerVineVotes = this.poll.get('challenger_vine_votes');
    this.acceptorVineVotes = this.poll.get('acceptor_vine_votes');
    this.demo = options.demo;
    this.chartRgb = "0, 250, 0";

    this.addPollChart(this.challengerVine, this.acceptorVine);
    setTimeout(this.renderPollChart.bind(this), 0);

    this.interval = this.checkPollChartUpdated();
    this.listenTo(this.poll, 'change:challenger_vine_votes', this.updatePollChart);
    this.listenTo(this.poll, 'change:acceptor_vine_votes', this.updatePollChart);

  },

  addPollChart: function(challengerVine, acceptorVine){
    this.pollChartView = new Vensei.Views.PollChart({
      vine1: this.challengerVine,
      vine2: this.acceptorVine
    });
    this.addSubview(
      '.saved-poll-chart-container', this.pollChartView
    );
  },

  voteFromClick: function(event){
    event.preventDefault();
    this.alreadyVoted();
    $('body').off('keydown');
    var $target = $(event.currentTarget);
    if ($target.attr('class').split(" ").indexOf("vote-1") === -1){
      this.voteDown();
    } else{
      this.voteUp();
    }
  },

  alreadyVoted: function(){
    $('.vote').prop('disabled', 'true').text('Thanks for voting!');
  },

  voteDown: function(){
    this.handleVoteUpdateChart(this.acceptorVine);
  },

  voteUp: function(){
    this.handleVoteUpdateChart(this.challengerVine);
  },

  handleVoteUpdateChart: function(vine_vote){
    this.handleVineVote(vine_vote);
    this.updatePollChart(this.poll);
  },

  renderPollChart: function(){
    options = {
      data: [this.acceptorVineVotes, this.challengerVineVotes],
      chartColor: this.chartRgb
    };

    this.pollChartView.drawChart(
      this.pollChartView.canvas, options.data, options.chartColor
    );
  },

  checkPollChartUpdated: function(){
    var that = this;
    return setInterval(function(){
      that.poll.fetch();
    }, 1000);
  },

  updatePollChart: function(poll){
    var livePoll = this.pollChartView.vinePoll;
    livePoll.datasets[0].bars[1].value = poll.get('challenger_vine_votes');
    livePoll.datasets[0].bars[0].value = poll.get('acceptor_vine_votes');
    livePoll.update();
  },


  handleVineVote: function(vine_vote){
    this.createPollVote(vine_vote);
    this.interpretVineVote(vine_vote);
  },

  interpretVineVote: function(vine_vote){
    if(vine_vote === this.challengerVine){
      this.challengerVineVotes++ ;
      this.votes_choice = this.challengerVineVotes;
    } else{
      this.acceptorVineVotes++ ;
      this.votes_choice = this.acceptorVineVotes;
    }
    this.winner = Math.max(
      this.challengerVineVotes, this.acceptorVineVotes
    );
  },

  createPollVote: function(vine_vote){
    var voterId;
    if (CURRENT_USER_USERNAME === "Goku"){
      voterId = window.DUMMY_USER_ID;
    } else {
      voterId = window.CURRENT_USER_ID;
    }

    var pollVote  = new Vensei.Models.PollVote({
      user_id: voterId,
      vine_vote_id: vine_vote.id,
      poll_id: this.poll.id
    });
    pollVote.save();
  },


  render: function(){
    var votable;
    var content = this.template({
      poll: this.poll,
      vine1: this.challengerVine,
      vine2: this.acceptorVine
    });
    this.$el.html(content);
    this.attachSubviews();
    if (this.demo){
      this.$('canvas').addClass('demo');
      this.$('.saved-poll-chart-container').addClass('demo');
      this.$('.saved-poll-vine-vid').addClass('demo');
      this.$('.live-saved-poll-place-holder').addClass('demo');
      this.$('.saved-poll-content').addClass('demo');
      this.$('.directions').addClass('demo');
      this.$('.emphasize').removeClass('emphasize');
    }
    if (CURRENT_USER_USERNAME !== "Goku"){
      votable = this.poll.voters().get(CURRENT_USER_ID);
    }else {
      votable = this.poll.voters().get(DUMMY_USER_ID);
    }
    if (votable){
      this.alreadyVoted();
    }
    return this;
  }


});
