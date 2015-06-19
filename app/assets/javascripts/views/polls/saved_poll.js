Vensei.Views.SavedPoll = Backbone.View.extend({
  template: JST['polls/saved_poll'],

  className: 'live-saved-poll-place-holder',

  initialize: function(){
    this.poll = this.model;
    this.battle = options.battle;
    this.vines = this.battle.vines();
    this.vine1 = this.vines.shift();
    this.vine2 = this.vines.shift();

    this.listenTo(this.poll, 'sync', this.render);
  },


  render: function(){
    var content = this.template({
      poll: this.poll
    });
    this.$el.html(content);
    return this;
  }


});
