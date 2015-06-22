Vensei.Views.BrowsedPoll = Backbone.CompositeView.extend({
  template: JST['polls/browsed_poll'],

  className: "browsed-poll-background no-guess",

  events: {
    "click .replay" : "replayCurrentVines",
    "click .vote" : "voteFromClick",
    "click .skip" : "skipChoosing"
  },

  initialize: function(options){
    this.parentView = options.parentView;
    this.battle = options.battle;
    this.user = options.user;
    this.vine1 = options.vine1;
    this.vine2 = options.vine2;
    this.vine1Votes = this.vine1.get('total_votes');
    this.vine2Votes = this.vine2.get('total_votes');
    this.chartRgb = "0, 250, 0";
    this.resultsDelay = 6000;

    this.votes_choice = null;
    this.winner = null;

    this.addPollChart(this.vine1, this.vine2);
    console.log("sensing poll key press");
    $('body').one('keydown', this.checkKey.bind(this));
  },

  checkKey: function(event){
    // left arrow keycode = 37
    // right arrow keycode = 39
    // up = 38
    // down = 40
    if (event.keyCode === 38 || event.keyCode === 40){
      this.vote(event.keyCode);
      $('body').off('keydown');
      setTimeout(
        this.parentView.nextTwoVines.bind(this.parentView), this.resultsDelay
      );
    } else if (event.keyCode === 32){
      this.skipChoosing();
    }
    else {
      $('body').one('keydown', this.checkKey.bind(this));
    }
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
    setTimeout(
      this.parentView.nextTwoVines.bind(this.parentView), this.resultsDelay
    );
  },

  skipChoosing: function(){
    $('body').off('keydown');
    this.parentView.nextTwoVines();
  },

  vote: function(keycode){
    console.log("voting");
    (keycode === 38) ? this.voteUp() : this.voteDown();
  },

  voteDown: function(){
    $('.vote').prop('disabled', 'true');
    this.renderPollChart(this.vine2);
    setTimeout(
      function(){
        $('.voting-result-text').empty();
      }, this.resultsDelay
    );
    console.log("voted right");
  },

  voteUp: function(){
    $('.vote').prop('disabled', 'true');
    this.renderPollChart(this.vine1);
    setTimeout(
      function(){
        $('.voting-result-text').empty();
      }, this.resultsDelay
    );
    console.log("voted left");
  },

  renderPollChart: function(vine_vote){
    options = this.handleVineVote(vine_vote);
    this.pollChartView.drawChart(
      this.pollChartView.canvas, options.data, options.chartColor
    );
  },

  handleVineVote: function(vine_vote){
    this.createPollVote(vine_vote);
    this.interpretVineVote(vine_vote);
    this.handleScore(this.votes_choice, this.winner, vine_vote);

    return {
      data: [this.vine2Votes, this.vine1Votes],
      chartColor: this.chartRgb
    };
  },

  makeScoreChanges: function(opts){
    $('.browsed-poll-background')
      .removeClass("no-guess").addClass(opts.colorClass);
    $('button.vote').removeClass("btn-primary").addClass(opts.buttonClass);
    $('.no-guess').removeClass("no-guess").addClass(opts.colorClass);
    this.chartRgb = opts.chartRgb;

    this.user.set("score", this.user.get("score") + opts.addedPoints);
  },

  handleScore: function(votes_choice, winner, vine_vote){
    var author, opts, message;
    author = vine_vote.escape('vine_author');

    if(votes_choice === winner){
      opts = {colorClass: "winner", buttonClass: "btn-success", addedPoints: 3,
        chartRgb: "0, 250, 0"};

      message = "Most folks also picked "+ author +"'s vine! + 3 points";
    }else {
      opts = {colorClass: "loser", buttonClass: "btn-danger",addedPoints: -5,
        chartRgb: "250, 0, 0"};

      message = "Most think"+ author +"'s vine not as funny. - 5 points";
    }

    this.makeScoreChanges(opts);
    this.user.save();
    this.showNextCountdown(message);
  },

  showNextCountdown: function(message){
    var content = JST['polls/afterBrowsedVote']({
      // message: message,
      time: this.resultsDelay / 1000
    });
    $('.directions').html(message).addClass('lower-margin');

    $('.skip').html(content);
    $('.replay').empty();
    $('.next-two-vines').TimeCircles(
      { time: {
          Days: { show: false },
          Hours: { show: false },
          Minutes: { show: false },
          Seconds: { color: "#C0C8CF" }
        }
      }
    );
  },

  interpretVineVote: function(vine_vote){
    if(vine_vote === this.vine1){
      this.vine1Votes++ ;
      this.votes_choice = this.vine1Votes;
    } else{
      this.vine2Votes++ ;
      this.votes_choice = this.vine2Votes;
    }
    this.winner = Math.max(this.vine1Votes, this.vine2Votes);
  },

  createPollVote: function(vine_vote){
    var pollVote  = new Vensei.Models.PollVote({
      user_id: window.CURRENT_USER_ID,
      vine_vote_id: vine_vote.id,
      poll_id: this.battle.get('proto_poll_id')
    });
    pollVote.save();
  },


  addPollChart: function(vine1, vine2){
    this.pollChartView = new Vensei.Views.PollChart({
      vine1: vine1,
      vine2: vine2
    });
    this.addSubview('.poll-chart-container', this.pollChartView);
  },

  replayCurrentVines: function(){
    this.parentView.removeBrowsedPollView();
    $('.vine-1').removeClass('playing').removeClass('done').addClass('away');
    $('.vine-2').removeClass('playing').addClass('away');
    setTimeout(this.parentView.moveVine.bind(this.parentView, 1), 50);
  },

  render: function(){
    var content = this.template({
      vine1: this.vine1,
      vine2: this.vine2
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
