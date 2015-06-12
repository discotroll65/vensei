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

    $vid.attr("src", vine.get('src_url')).prop("autoplay", true);
    var handleVineFinish = this.handleVineEnd.bind($vid[0], this);

    $vid[0].addEventListener('ended', this.handleVineEnd.bind($vid[0], this), true);
  }

});
