Vensei.Views.PollChart = Backbone.View.extend({
  className: 'poll-chart',

  tagName: 'div',

  template: JST['polls/poll_chart'],

  initialize: function(vine1, vine2){
    this.vine1 = vine1;
    this.vine2 = vine2;
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.canvas = this.$('#live-poll-chart')[0];
    setTimeout(this.drawChart.bind(this, this.canvas, [0,0]), 0);
    return this;
  },

  chartData: function(vineVoteArray, rgb){
    var data = {
      labels: ["Vine2", "Vine1"],
      datasets: [
        {
          label: "Vine Battle",
          fillColor: "rgba("+ rgb +",0.5)",
          strokeColor: "rgba("+ rgb +",0.8)",
          highlightFill: "rgba("+ rgb +",0.75)",
          highlightStroke: "rgba("+ rgb +",1)",
          data: vineVoteArray
        }
      ]
    };
    return data;
  },

  drawChart: function(canvas, vineVoteArray, rgb){
    var ctx = canvas.getContext("2d");
    this.vinePoll = new Chart(ctx).HorizontalBar(
      this.chartData(vineVoteArray, rgb)
    );
  }

});
