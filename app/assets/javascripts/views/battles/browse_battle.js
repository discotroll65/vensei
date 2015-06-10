Vensei.Views.BrowseBattles = Backbone.CompositeView.extend({
  template: JST['battles/browse_battle'],

  className: "browse-battles",

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
