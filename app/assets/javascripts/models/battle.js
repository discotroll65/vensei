Vensei.Models.Battle = Backbone.Model.extend({
  urlRoot: 'api/battles',

  vines: function(){
    this._vines = this._vines || new Vensei.Collections.Vines();
    return this._vines;
  },

  parse: function(response){
    if(response.vines) {
      this.vines().set(response.vines);
      delete response.vines;
    }

    return response;
  }
});
