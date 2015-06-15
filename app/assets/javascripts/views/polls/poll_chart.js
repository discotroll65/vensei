Vensei.Views.PollChart = Backbone.View.extend({
  className: 'poll-chart',
  tagName: 'canvas',
  id: 'myChart',
  width: 400,
  height: 400,


  template: JST['polls/poll_chart'],

  initialize: function(vine1, vine2){
    this.vine1 = vine1;
    this.vine2 = vine2;
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
