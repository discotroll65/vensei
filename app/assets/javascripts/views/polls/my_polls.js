Vensei.Views.MyPolls = Backbone.CompositeView.extend({
  template: JST['polls/my_polls'],

  className: 'my-polls',

  initialize: function(options){
    this.createPoll = options.createPoll;
    if (this.createPoll) {
      this.addCreatePollView();
    }
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addCreatePollView: function(){
    var view = new Vensei.Views.CreatePollView();
    this.addSubview('.new-poll-container', view);
  }
});
