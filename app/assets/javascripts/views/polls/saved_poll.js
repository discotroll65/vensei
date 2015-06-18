Vensei.Views.SavedPoll = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['polls/saved_poll'],

  render: function(){
    var content = this.template({
      poll: this.model
    });
    this.$el.html(content);
    return this;
  },

  className: 'live-saved-poll-place-holder'

});
