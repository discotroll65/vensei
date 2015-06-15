Vensei.Views.BrowsedPoll = Backbone.View.extend({
  template: JST['polls/browsed_poll'],

  className: "browsed-poll",

  initialize: function(options){
    this.vine1 = options.vine1;
    this.vine2 = options.vine2;
  },

  render: function(){
    var content = this.template({
      vine1: this.vine1,
      vine2: this.vine2
    });
    this.$el.html(content);
    return this;
  }
});
