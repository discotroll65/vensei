Vensei.Views.BrowseBattles = Backbone.CompositeView.extend({
  template: JST['battles/browse_battle'],

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

  className: "browse-battles",

  render: function(){
    var content = this.template({
      vine1: this.vine1,
      vine2: this.vine2
    });
    this.$el.html(content);
    this.attachSubviews();
    if(this.vines.length > 0){
      setTimeout(this.moveVine.bind(this, 1), 0);
    }
    return this;
  },

  events: {
    "transitionend .vine" : "playVine",
    "click .replay" : "replayCurrentVines"
  },

  replayCurrentVines: function(){
    $('.vine-1').removeClass('done').addClass('away');
    $('.vine-2').removeClass('done').addClass('away');
    setTimeout(this.moveVine.bind(this, 1), 0);
  },

  moveVine: function(number){
    var $vine = $('.vine-' + number);
    $vine.removeClass('away').addClass('playing');
  },

  handleVineEnd: function(that){
    // this here is the video, that is the view
    var $target = $(this);
    this.removeEventListener('ended', that.handleVineEnd.bind(this, that));
    if ($(this).attr('class').split(" ").indexOf("vine-vid-1") === -1){
      $('.vine-2').removeClass('playing');
      $('.vine-2').addClass('done');
      $('.vine-1').removeClass('playing');
      $('.vine-1').addClass('done');
      $('body').keydown(that.checkKey.bind(that));
      // setTimeout(that.nextTwoVines.bind(that), 500);
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
      this.nextTwoVines();
    }
  },

  vote: function(keycode){
    (keycode === 39) ? this.voteRight() : this.voteLeft();
  },

  voteRight: function(){
    console.log("voted right");
  },

  voteLeft: function(){
    console.log("voted left");
  },


  nextTwoVines: function(){
    this.setupBattle();
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
    this._currentVid.addEventListener("progress", this.progressHandler.bind(this), false);

    this._currentVid.play();
    var handleVineFinish = this.handleVineEnd.bind(this._currentVid, this);

    $(this._currentVid).one('ended', handleVineFinish);
  },


  addSourceToVideo: function(element, src, type) {
    var source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
  },

  progressHandler: function(e) {
    if( this._currentVid.duration ) {
        var percent = (this._currentVid.buffered.end(0)/this._currentVid.duration) * 100;
        console.log( percent );
        if( percent >= 100 ) {
            console.log("loaded!");
        }
        this._currentVid.currentTime++;
    }
  }

});
