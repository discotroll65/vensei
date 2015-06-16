Vensei.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.user, 'sync', this.render);
  },

  render: function(){
    var content = this.template({
      user: this.user
    });
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
