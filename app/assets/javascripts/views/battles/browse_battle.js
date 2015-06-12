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

  playVine: function (event){
    var $target = $(event.currentTarget);
    var $vid = $target.find('video');
    var vine = ($target.attr('class') === 'vine-1') ? this.vine1 : this.vine2 ;
    $vid.attr("src", vine.src_url)
      .prop("autoplay", true)
      .prop("loop",true);
  }

});
