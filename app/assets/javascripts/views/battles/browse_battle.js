Vensei.Views.BrowseBattles = Backbone.CompositeView.extend({
  template: JST['battles/browse_battle'],

  className: "browse-battles",

  initialize: function(options){
    this.user = options.user;
    this.collection.length && this.setupBattle();
    this.listenTo(this.collection, 'sync', this.setupBattle);
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
    "transitionend .vine.playing" : "grabMovedVine"
  },

  grabMovedVine: function (event){
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
    if(event.originalEvent.propertyName === "top"){
      this.playVine(vine);
    }
  },

  playVine: function(vine){
    this.ensureVidLoaded(vine);
    this._currentVid.play();
    $(this._currentVid).one(
      'ended', this.handleVineEnd.bind(this._currentVid, this)
    );
  },

  ensureVidLoaded: function(vine){
    this.addSourceToVideo(this._currentVid, vine.get('src_url'), "video/mp4");
    this._currentVid.addEventListener(
      "progress", this.progressHandler.bind(this), false
    );
  },

  handleVineEnd: function(that){
    // this here is this._currentVid, that is the view
    var $target = $(this);

    this.removeEventListener('ended', that.handleVineEnd.bind(this, that));
    this.removeEventListener('progress', that.progressHandler.bind(that));


    if ($(this).attr('class').split(" ").indexOf("vine-vid-1") === -1){
      that.addBrowsedPollView();
    } else {
      $('.vine-1').addClass('done');
      that.moveVine(2);
    }
  },

  addBrowsedPollView: function(){
    this.browsedPollView = new Vensei.Views.BrowsedPoll({
      parentView: this,
      battle: this.battle,
      vine1: this.vine1,
      vine2: this.vine2
    });

    this.addSubview('.browsed-poll', this.browsedPollView);
  },

  removeBrowsedPollView: function(){
    this.removeSubview('.browsed-poll', this.browsedPollView);
  },

  resetBrowsedPollView: function(){
    this.browsedPollView && this.removeBrowsedPollView();
    this.addBrowsedPollView();
  },

  nextTwoVines: function(){
    this.removeBrowsedPollView();
    this.setupBattle();
  },

  handleScore: function(votes_choice, winner, vine_vote){
    var message, author;
    author = vine_vote.escape('vine_author');
    if(votes_choice === winner){
      message = "Most folks also picked "+ author +"'s vine! + 3 points";
      $('.browsed-poll-background').removeClass("no-guess").addClass("winner");
      $('button.vote').removeClass("btn-primary").addClass("btn-success");
      $('.no-guess').removeClass("no-guess").addClass("winner");
      this.chartRgb = "0, 250, 0";

      this.user.set("score", this.user.get("score") + 3);
    }else {
      message = "Most think"+ author +"'s vine not as funny. - 5 points";
      $('.browsed-poll-background').removeClass("no-guess").addClass("loser");
      $('button.vote').removeClass("btn-primary").addClass("btn-danger");
      $('.no-guess').removeClass("no-guess").addClass("loser");
      this.chartRgb = "250, 0, 0";

      this.user.set("score", this.user.get("score") - 5);
    }
    this.user.save();
    $('.key-vote-prompt').html('<h2>' + message + '</h2>');
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
