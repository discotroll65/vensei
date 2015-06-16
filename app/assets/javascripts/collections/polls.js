Vensei.Collections.Polls = Backbone.Collection.extend({
  model: Vensei.Models.Poll,

  url: 'api/polls',

  getOrFetch: function(id){
    var poll = this.get(id);
    var collection = this;
    if(poll){
      poll.fetch();
    } else{
      poll = new Vensei.Models.Poll({id: id});
      poll.fetch({
        success: function(){
          collection.add(poll);
        }
      });
    }
    return poll;
  }
});
