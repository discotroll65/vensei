Vensei.Views.SavedPoll = Backbone.View.extend({
  template: JST['polls/saved_poll'],

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  className: 'live-saved-poll-place-holder'

});
