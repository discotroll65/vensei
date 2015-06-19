Vensei.Views.SavedPoll = Backbone.View.extend({
  initialize: function(){
    this.poll = this.model;
    this.listenTo(this.poll, 'sync', this.render);
  },

  template: JST['polls/saved_poll'],

  render: function(){
    var content = this.template({
      poll: this.poll
    });
    this.$el.html(content);
    return this;
  },

  className: 'live-saved-poll-place-holder'

});
