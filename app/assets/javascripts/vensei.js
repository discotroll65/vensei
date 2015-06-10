window.Vensei = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Vensei.Routers.Router({
      $rootEl: $("#content")
    });

    var navbar = new Vensei.Views.Navbar({
      router: router
    });

    $("#nav").html(navbar.render().$el);
    if (CURRENT_USER_ID.length > 0){
      Backbone.history.start();
    }
  }
};

$(document).ready(function(){
  Vensei.initialize();
});
