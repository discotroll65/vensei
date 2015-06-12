Vensei.Views.BrowseBattles = Backbone.CompositeView.extend({
  template: JST['battles/browse_battle'],

  initialize: function(){
    this.vines = this.collection;
    this.vine1 = this.collection.shift();
    this.vine2 = this.collection.shift();
  },

  className: "browse-battles",

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    setTimeout(this.moveVine.bind(this,1), 0);
    return this;
  },

  events: {
    "transitionend .vine" : "playVine"
  },

  moveVine: function(number){
    var $vine = $('.vine-' + number);
    $vine.removeClass('away').addClass('playing');
  },

  handleVineEnd: function(that){
    var $target = $(this);
    this.removeEventListener('ended', that.handleVineEnd.bind(this, that));
    if ($(this).attr('class').split(" ").indexOf("vine-vid-1") === -1){
      $('.vine-2').removeClass('playing');
      $('.vine-2').addClass('done');
      $('.vine-1').removeClass('playing');
      $('.vine-1').addClass('done');
      setTimeout(that.nextTwoVines.bind(that), 500);
    } else {
      that.moveVine(2);
    }
  },

  nextTwoVines: function(){
    this.initialize();
    this.render();
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

    this._currentVid.addEventListener('ended', this.handleVineEnd.bind($vid[0], this), true);
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
