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
    this.listenTo(this.poll, 'sync', this.render);
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

  voteDown: function(){
    $('.vote').prop('disabled', 'true');
    this.handleAndRenderPollChart(this.acceptorVine);

    setTimeout(
      function(){
        $('.voting-result-text').empty();
      }, 2000
    );
    console.log("voted right");
  },

  voteUp: function(){
    $('.vote').prop('disabled', 'true');
    this.handleAndRenderPollChart(this.challengerVine);

    setTimeout(
      function(){
        $('.voting-result-text').empty();
      }, 2000
    );
    console.log("voted left");
  },

  voteFromClick: function(event){
    event.preventDefault();
    $('.vote').prop('disabled', 'true');
    $('body').off('keydown');
    var $target = $(event.currentTarget);
    if ($target.attr('class').split(" ").indexOf("vote-1") === -1){
      this.voteDown();
    } else{
      this.voteUp();
    }
  },

  handleAndRenderPollChart: function(vine_vote){
    this.handleVineVote(vine_vote);
    this.renderPollChart();
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
    var pollVote  = new Vensei.Models.PollVote({
      user_id: window.CURRENT_USER_ID,
      vine_vote_id: vine_vote.id,
      poll_id: this.battle.get('proto_poll_id')
    });
    pollVote.save();
  },


  render: function(){
    var content = this.template({
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

    }
    debugger
    return this;
  }


});
