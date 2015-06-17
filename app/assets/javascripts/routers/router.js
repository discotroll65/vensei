Vensei.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.user = options.user;
  },

  routes:{
    '' : "landingPage",
    'browse-battles' : 'browseBattles',
    'new-poll' : 'newPoll',
    'polls' :  'polls'
  },

  newPoll: function(){
    this.myPolls({createPoll: true});
  },

  polls: function(){
    this.myPolls({createPoll: false});
  },

  myPolls: function(options){
    var view = new Vensei.Views.MyPolls(options);
    this._swapView(view);
  },

  landingPage: function(){
    this.battles = new Vensei.Collections.Battles();
    this.battles.fetch();
    var view = new Vensei.Views.LandingPage();
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
