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
  }
};

$(document).ready(function(){
  Vensei.initialize();
});
