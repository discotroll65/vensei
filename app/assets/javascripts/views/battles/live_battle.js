Vensei.Views.LiveBattle = Backbone.View.extend({
  template: JST['battles/live_battle'],

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  className: 'live-battle-place-holder'

});
