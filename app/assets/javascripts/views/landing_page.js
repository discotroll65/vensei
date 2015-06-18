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
    this.listenTo(this.model, 'sync', this.addSavedPollView );
  },

  addSavedPollView: function(poll){
    var savedPollView = new Vensei.Views.SavedPoll({
      model: poll
    });

    this.addSubview('.landing-saved-poll', savedPollView);

  }
});
