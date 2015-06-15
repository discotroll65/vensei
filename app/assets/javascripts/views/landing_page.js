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
    var savedPoll = new Vensei.Views.SavedPoll();
    this.addSubview('.landing-saved-poll', savedPoll);
  }
});
