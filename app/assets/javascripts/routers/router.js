Vensei.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes:{
    '' : "landingPage",
    'browse-battles' : 'browseBattles'
  },

  landingPage: function(){
    this.vines = new Vensei.Collections.Vines();
    this.vines.fetch();
    var view = new Vensei.Views.LandingPage();
    this._swapView(view);
  },

  browseBattles: function(){
    if(!this.vines){
      this.vines = new Vensei.Collections.Vines();
      this.vines.fetch();
    }
    
    var view = new Vensei.Views.BrowseBattles({
      collection: this.vines
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
