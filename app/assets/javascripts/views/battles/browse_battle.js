Vensei.Views.BrowseBattles = Backbone.CompositeView.extend({
  template: JST['battles/browse_battle'],

  className: "browse-battles",

  initialize: function(options){
    this.user = options.user;
    this.collection.length && this.setupBattle();
    this.listenTo(this.collection, 'sync', this.setupBattle);
    this.chartRgb = "0, 250, 0";
  },

  setupBattle: function(){
    this.collection.reset(this.collection.shuffle(), {silent:true});
    this.battles = this.battles || this.collection;

    this.battle = this.battles.shift();
    this.vines = this.battle.vines();
    this.vine1 = this.vines.shift();
    this.vine2 = this.vines.shift();

    this.render();
  },


  render: function(){
    var filler = new Vensei.Models.Vine();
    this.vine1 = this.vine1 || filler;
    this.vine2 = this.vine2 || filler;

    var content = this.template({
      vine1: this.vine1,
      vine2: this.vine2
    });

    this.$el.html(content);

    this.resetBrowsedPollView();

    this.attachSubviews();
    if(this.collection.length > 0){
      setTimeout(this.moveVine.bind(this, 1), 50);
    }
    return this;
  },

  moveVine: function(number){
    var $vine = $('.vine-' + number);
    $vine.removeClass('away').addClass('playing');
  },

  events: {
    "transitionend .vine.playing" : "playVine",
    "click .replay" : "replayCurrentVines",
    "click .vote" : "voteFromClick",
    "click .skip" : "skipChoosing"
  },

  playVine: function (event){
    var number;
    var vine;
    var that = this;
    var $target = $(event.currentTarget);
    var $vid = $target.find('video');
    if($vid.attr('class').split(" ").indexOf("vine-vid-1") === -1){
      vine = this.vine2;
    } else{
      vine = this.vine1;
    }


    this._currentVid = $vid[0];
    this.addSourceToVideo(this._currentVid, vine.get('src_url'), "video/mp4");
    $vid.attr("poster", vine.get('thumbnail.url'));
    this._currentVid.addEventListener(
      "progress", this.progressHandler.bind(this), false
    );

    this._currentVid.play();
    var handleVineFinish = this.handleVineEnd.bind(this._currentVid, this);

    $(this._currentVid).one('ended', handleVineFinish);
  },

  handleVineEnd: function(that){
    // this here is the video, that is the view
    var $target = $(this);
    this.removeEventListener('ended', that.handleVineEnd.bind(this, that));
    if ($(this).attr('class').split(" ").indexOf("vine-vid-1") === -1){
      $('.poll-content').removeClass('away');
      $('.poll-content').addClass('polling');
      console.log("sensing poll key press");
      $('body').one('keydown', that.checkKey.bind(that));

    } else {
      that.moveVine(2);
    }
  },

  checkKey: function(event){
    // left arrow keycode = 37
    // right arrow keycode = 39
    // up = 38
    // down = 40
    if (event.keyCode === 38 || event.keyCode === 40){
      this.vote(event.keyCode);
      $('body').off('keydown');
      setTimeout(this.nextTwoVines.bind(this), 2000);
    } else if (event.keyCode === 32){
      this.skipChoosing();
    }
    else {
      $('body').one('keydown', this.checkKey.bind(this));
    }
  },

  skipChoosing: function(){
    $('body').off('keydown');
    this.nextTwoVines();
  },

  vote: function(keycode){
    console.log("voting");
    (keycode === 38) ? this.voteUp() : this.voteDown();
  },

  voteDown: function(){
    this.renderPollChart(this.vine2);

    setTimeout(
      function(){
        $('.voting-result-text').empty();
      }, 2000
    );
    console.log("voted right");
  },

  voteUp: function(){
    this.renderPollChart(this.vine1);


    setTimeout(
      function(){
        $('.voting-result-text').empty();
      }, 2000
    );
    console.log("voted left");
  },

  voteFromClick: function(event){
    event.preventDefault();
    $('body').off('keydown');
    var $target = $(event.currentTarget);
    if ($target.attr('class').split(" ").indexOf("vote-1") === -1){
      this.voteDown();
    } else{
      this.voteUp();
    }
    setTimeout(this.nextTwoVines.bind(this), 2000);
  },

  nextTwoVines: function(){
    this.removeBrowsedPollView();
    this.setupBattle();
  },

  renderPollChart: function(vine_vote){
    var pollChartView = this.browsedPollView.subviews(
      '.poll-chart-container')._wrapped[0];
    options = this.handleVineVote(vine_vote);
    pollChartView.drawChart(
      pollChartView.canvas, options.data, options.chartColor
    );
  },

  handleVineVote: function(vine_vote){
    var vine1Votes, vine2Votes, votes_choice, winner;
    var vote  = new Vensei.Models.PollVote({
      user_id: window.CURRENT_USER_ID,
      vine_vote_id: vine_vote.id,
      poll_id: this.battle.get('proto_poll_id')
    });
    vote.save();

    var battleVines = this.battle.vines();
    vine1Votes = this.vine1.get('total_votes');
    vine2Votes = this.vine2.get('total_votes');

    if(vine_vote === this.vine1){
      vine1Votes++ ;
      votes_choice = vine1Votes;
    } else{
      vine2Votes++ ;
      votes_choice = vine2Votes;
    }

    winner = Math.max(vine1Votes, vine2Votes);
    this.handleScore(votes_choice, winner, vine_vote);

    return {data: [vine2Votes, vine1Votes], chartColor: this.chartRgb};
  },

  handleScore: function(votes_choice, winner, vine_vote){
    var message, author;
    author = vine_vote.escape('vine_author');
    if(votes_choice === winner){
      message = "Most folks also picked "+ author +"'s vine! + 3 points";
      $('.poll-content').removeClass("no-guess").addClass("winner");
      $('button.vote').removeClass("btn-primary").addClass("btn-success");
      $('.no-guess').removeClass("no-guess").addClass("winner");
      this.chartRgb = "0, 250, 0";

      this.user.set("score", this.user.get("score") + 3);
      this.user.save();
    }else {
      message = "Most think"+ author +"'s vine not as funny. - 5 points";
      $('.poll-content').removeClass("no-guess").addClass("loser");
      $('button.vote').removeClass("btn-primary").addClass("btn-danger");
      $('.no-guess').removeClass("no-guess").addClass("loser");
      this.chartRgb = "250, 0, 0";

      this.user.set("score", this.user.get("score") - 5);
      this.user.save();
    }
    $('.key-vote-prompt').html('<h2>' + message + '</h2>');
  },

  addBrowsedPollView: function(){
    this.browsedPollView = new Vensei.Views.BrowsedPoll({
      vine1: this.vine1,
      vine2: this.vine2
    });

    this.addSubview('.poll-content', this.browsedPollView);
  },

  removeBrowsedPollView: function(){
    this.removeSubview('.poll-content', this.browsedPollView);
  },

  resetBrowsedPollView: function(){
    this.browsedPollView && this.removeBrowsedPollView();
    this.addBrowsedPollView();
  },

  replayCurrentVines: function(){
    $('.poll-content').removeClass('polling');
    $('.poll-content').addClass('away');
    $('.vine-1').removeClass('playing').addClass('away');
    $('.vine-2').removeClass('playing').addClass('away');
    setTimeout(this.moveVine.bind(this, 1), 50);
  },

  addSourceToVideo: function(element, src, type) {
    var source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
  },

  progressHandler: function(e) {
    if( this._currentVid.duration ) {
        var percent = (
          this._currentVid.buffered.end(0)/this._currentVid.duration) * 100;
        console.log( percent );
        if( percent >= 100 ) {
            console.log("loaded!");
        }
        this._currentVid.currentTime++;
    }
  }

});
