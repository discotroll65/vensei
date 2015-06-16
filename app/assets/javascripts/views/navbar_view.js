Vensei.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],

  initialize: function(){
    this.model = new Vensei.Models.User({id: CURRENT_USER_ID});
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({
      user: this.model
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
