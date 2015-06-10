Vensei.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  events: {
    "click .sign-out" : "signOutUser"
  },

  signOutUser: function(event){
    event.preventDefault();
    $.ajax({
      url: '/session',
      type: "delete",
      dataType: "json",
      success: function(){
        window.location = '/session/new';
      }
    });

  }
});
