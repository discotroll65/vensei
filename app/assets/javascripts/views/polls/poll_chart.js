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
    setTimeout(this.drawChart.bind(this, this.canvas, [70,50]), 0);
    return this;
  },

  chartData: function(vineVoteArray){
    var data = {
      labels: ["Vine1", "Vine2"],
      datasets: [
        {
          label: "Vine Battle",
          fillColor: "rgba(0,220,0,0.5)",
          strokeColor: "rgba(0,220,0,0.8)",
          highlightFill: "rgba(0,220,0,0.75)",
          highlightStroke: "rgba(0,220,0,1)",
          data: [70, 50]
        }
      ]
    };
    return data;
  },

  drawChart: function(canvas, vineVoteArray){
    var ctx = canvas.getContext("2d");
    var VinePoll = new Chart(ctx).HorizontalBar(
      this.chartData(vineVoteArray)
    );
  }

});
