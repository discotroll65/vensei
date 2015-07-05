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
    var that = this;
    var poll = new Vensei.Models.Poll({id: id});
    poll.fetch({
      error: function(poll, response){
        $('.errors').empty();
        var errors = $.parseJSON(response.responseText);

        errors.forEach(function(error){
          $('.errors').append( error + '<br>');
        });

        setTimeout(function(){
          $('.errors').empty();
        }, 3500);
      },

      success: function(){
        var view = new Vensei.Views.SavedPoll({
          model: poll,
          battle: poll.battle()
        });
        that._swapView(view);
      }
    });
  },

  myPolls: function(options){
    var polls = new Vensei.Collections.Polls();
    polls.fetch();
    settings = $.extend({}, options, {
      collection: polls
    });
    var view = new Vensei.Views.MyPolls(settings);
    this._swapView(view);
  },

  landingPage: function(){
    this.battles = new Vensei.Collections.Battles();
    this.battles.fetch();

    var poll = new Vensei.Models.Poll();

    poll.urlRoot = 'api/polls/demo';
    poll.fetch({
      success: function(){
        poll.trigger('fetched');
      }
    });
    poll.urlRoot = 'api/polls';

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
    if(this._currentView){
      clearInterval(this._currentView.interval);
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();

    if (!Vensei.initialTourComplete){
      Vensei.initialTourComplete = true;
      $( ".help" ).trigger( "click" );
    }
  }
});
