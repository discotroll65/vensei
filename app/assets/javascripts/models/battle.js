Vensei.Models.Battle = Backbone.Model.extend({
  urlRoot: 'api/battles',

  vines: function(){
    this._vines = this._vines || new Vensei.Collections.Vines();
    return this._vines;
  },

  // protoPoll: function(){
  //   this._protoPoll = this._protoPoll || new Vensei.Models. Poll();
  //   return this._protoPoll;
  // },

  parse: function(response){
    if(response.vines) {
      this.vines().set(response.vines);
      delete response.vines;
    }

    // if(response.proto_poll_id){
    //   var polls = new Vensei.Collections.Poll();
    //   var protoPollId = response.protoPollId;
    //   proto_poll = polls.getOrFetch(protoPollId);
    //   this.protoPoll().set(proto_poll);
    // }

    return response;
  }
});
