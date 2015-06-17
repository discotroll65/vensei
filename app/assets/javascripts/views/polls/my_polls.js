Vensei.Views.MyPolls = Backbone.CompositeView.extend({
  template: JST['polls/my_polls'],

  className: 'my-polls',

  initialize: function(options){
    this.createPoll = options.createPoll;
    if (this.createPoll) {
      this.addCreatePollView();
    }
  },


  events: {
    'click .create-poll': 'addCreatePollView',
    'click .close' : 'removeCreatePollView',
    'click .new-poll-background-modal': 'closePollViewByClick'

  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addCreatePollView: function(){
    this.newPollView = new Vensei.Views.CreatePollView();
    this.addSubview('.new-poll-container', this.newPollView);
  },

  closePollViewByClick: function(event){
    if ($(event.target).attr('class') === 'new-poll-background-modal'){
      this.removeCreatePollView();
    }
  },

  removeCreatePollView: function(){
    this.removeSubview('.new-poll-container', this.newPollView);
  }
});
