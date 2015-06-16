window.Vensei = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
  initialize: function() {
    var user = new Vensei.Models.User(
      {id: CURRENT_USER_ID}
    );
    user.fetch();

    var router = new Vensei.Routers.Router({
      $rootEl: $("#content"),
      user: user
    });

    var navbar = new Vensei.Views.Navbar({
      router: router,
      user: user
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
