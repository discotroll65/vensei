Vensei.Views.LandingPage = Backbone.CompositeView.extend({
  template: JST["landing_page"],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.addSavedPollView );
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  className: 'landing-page',


  addSavedPollView: function(poll){
    var savedPollView = new Vensei.Views.SavedPoll({
      battle: poll.battle(),
      model: poll,
      demo: true
    });

    this.addSubview('.landing-saved-poll', savedPollView);

  }
});
