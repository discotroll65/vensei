Vensei.Views.MyPolls = Backbone.CompositeView.extend({
  template: JST['polls/my_polls'],

  className: 'my-polls',

  initialize: function(options){
    this.createPoll = options.createPoll;
    if (this.createPoll) {
      this.addCreatePollView();
    }
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'remove', this.removePollItemView);
    this.listenTo(this.collection, 'add', this.addPollItemView);

    this.collection.each(this.addPollItemView.bind(this));
  },


  events: {
    'click .new-poll': 'addCreatePollView',
    'click .close' : 'removeCreatePollView',
    'click .new-poll-background-modal': 'closePollViewByClick'

  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addPollItemView: function(poll){
    var pollItemView = new Vensei.Views.PollItemView({
      model: poll
    });

    this.addSubview('.polls', pollItemView);
  },

  removePollItemView: function(poll){
    this.removeModelSubview('.polls', poll);
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
