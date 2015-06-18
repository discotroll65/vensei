Vensei.Views.BrowsedPoll = Backbone.CompositeView.extend({
  template: JST['polls/browsed_poll'],

  className: "browsed-poll-background away no-guess",

  events: {
    "click .replay" : "replayCurrentVines",
    "click .vote" : "voteFromClick",
    "click .skip" : "skipChoosing"
  },

  initialize: function(options){
    this.vine1 = options.vine1;
    this.vine2 = options.vine2;
    this.addPollChart(this.vine1, this.vine2);
  },

  addPollChart: function(vine1, vine2){
    var view = new Vensei.Views.PollChart({
      vine1: vine1,
      vine2: vine2
    });
    this.addSubview('.poll-chart-container', view);
  },

  render: function(){
    var content = this.template({
      vine1: this.vine1,
      vine2: this.vine2
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
