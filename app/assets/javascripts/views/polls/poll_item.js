Vensei.Views.PollItemView = Backbone.View.extend({
  template: JST['polls/poll_item'],

  className: 'poll-item',

  tagName: 'li',

  render: function(){
    var content = this.template({
      poll: this.model
    });

    this.$el.html(content);
    return this;
  }
});
