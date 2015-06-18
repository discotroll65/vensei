Vensei.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.user = options.user;
  },

  routes:{
    '' : "landingPage",
    'browse-battles' : 'browseBattles',
    'new-poll' : 'newPoll',
    'polls' :  'polls',
    'polls/:id' : 'showPoll'
  },

  newPoll: function(){
    this.myPolls({createPoll: true});
  },

  polls: function(){
    this.myPolls({createPoll: false});
  },

  showPoll: function(id){
    var poll = new Vensei.Models.Poll({id: id});
    poll.fetch();
    var view = new Vensei.Views.SavedPoll({
      model: poll
    });
    this._swapView(view);
  },

  myPolls: function(options){
    var view = new Vensei.Views.MyPolls(options);
    this._swapView(view);
  },

  landingPage: function(){
    this.battles = new Vensei.Collections.Battles();
    this.battles.fetch();
    
    var poll = new Vensei.Models.Poll({id: 46});
    poll.fetch();

    var view = new Vensei.Views.LandingPage({
      model: poll
    });
    this._swapView(view);
  },

  browseBattles: function(){
    if(!this.battles){
      this.battles = new Vensei.Collections.Battles();
      this.battles.fetch();
    }

    var view = new Vensei.Views.BrowseBattles({
      collection: this.battles,
      user: this.user
    });

    this._swapView(view);
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
