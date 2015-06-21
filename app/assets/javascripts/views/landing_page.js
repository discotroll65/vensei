Vensei.Views.LandingPage = Backbone.CompositeView.extend({
  template: JST["landing_page"],

  initialize: function(){
    this.listenTo(
      this.model, 'fetched', this.addSavedPollView.bind(this, this.model)
    );
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  className: 'landing-page',

  addSavedPollView: function(poll){
    this.savedPollView = new Vensei.Views.SavedPoll({
      battle: poll.battle(),
      model: poll,
      demo: true,
    });

    this.interval = this.savedPollView.interval;
    this.addSubview('.landing-saved-poll', this.savedPollView);
  }
});
