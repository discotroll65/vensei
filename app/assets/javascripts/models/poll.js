Vensei.Models.Poll = Backbone.Model.extend({
  urlRoot: 'api/polls',

  battle: function(){
    this._battle = this._battle || new Vensei.Models.Battle();
    return this._battle;
  },

  voters: function(){
    this._voters = this._voters || new Vensei.Collections.Users();
    return this._voters;
  },

  parse: function(payload){
    if (payload.battle){
      this.battle().set(this.battle().parse(payload.battle));
      delete payload.battle;
    }

    if (payload.voters){
      this.voters().set(payload.voters);
      delete payload.voters;
    }
    return payload;
  }
});
