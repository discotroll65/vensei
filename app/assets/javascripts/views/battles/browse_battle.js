Vensei.Views.BrowseBattles = Backbone.CompositeView.extend({
  template: JST['battles/browse_battle'],

  className: "browse-battles",

  initialize: function(){
    this.setupBattle();
    this.listenTo(this.vines, 'sync', this.setupBattle);
  },

  setupBattle: function(){
    this.collection.reset(this.collection.shuffle(), {silent:true});
    this.vines = this.collection;
    this.vine1 = this.collection.shift();
    this.vine2 = this.collection.shift();

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
    this.addBrowsedPollView();
    this.attachSubviews();
    if(this.vines.length > 0){
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
    "click .replay" : "replayCurrentVines"
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
      $('body').keydown(that.checkKey.bind(that));

    } else {
      that.moveVine(2);
    }
  },

  checkKey: function(event){
    // left arrow keycode = 37
    // right arrow keycode = 39
    if (event.keyCode === 39 || event.keyCode === 37){
      this.vote(event.keyCode);
      $('body').off('keydown');
      setTimeout(this.nextTwoVines.bind(this), 2000);
    }
  },

  vote: function(keycode){
    (keycode === 39) ? this.voteRight() : this.voteLeft();
  },

  voteRight: function(){
    $('.voting-result-text')
      .text("You voted for "+ this.vine2.escape('vine_author') +"'s vine.");
    setTimeout(
      function(){
        $('.voting-result-text').empty();
      }, 2000
    );
    console.log("voted right");
  },

  voteLeft: function(){
    $('.voting-result-text')
      .text("You voted for "+ this.vine1.escape('vine_author') +"'s vine.");
    setTimeout(
      function(){
        $('.voting-result-text').empty();
      }, 2000
    );
    console.log("voted left");
  },

  nextTwoVines: function(){
    this.removeBrowsedPollView();
    this.setupBattle();
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
