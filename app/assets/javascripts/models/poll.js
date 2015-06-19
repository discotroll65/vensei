Vensei.Models.Poll = Backbone.Model.extend({
  urlRoot: 'api/polls',

  battle: function(){
    this._battle = this._battle || new Vensei.Models.Battle();
    return this._battle;
  },

  parse: function(payload){
    if (payload.battle){
      this.battle().set(this.battle().parse(payload.battle));
      delete payload.battle;
    }

    return payload;
  }
});
