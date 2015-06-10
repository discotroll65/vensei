Vensei.Views.LandingPage = Backbone.CompositeView.extend({
  template: JST["landing_page"],

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  className: 'landing-page',

  initialize: function(){
    var liveBattle = new Vensei.Views.LiveBattle();
    this.addSubview('.landing-live-battle', liveBattle);
  }
});
