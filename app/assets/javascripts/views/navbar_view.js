Vensei.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],

  className: 'group',

  initialize: function(options){
    this.user = options.user;
    this.listenTo(this.user, 'sync', this.render);
  },

  render: function(){
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);
    $('.score').addClass('highlighted');
    setTimeout(
      function(){
        $('.score').removeClass('highlighted');
      }, 1000
    );
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
