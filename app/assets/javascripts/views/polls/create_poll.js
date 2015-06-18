Vensei.Views.CreatePollView = Backbone.View.extend({
  template: JST['polls/create_poll'],

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  events: {
    'click .create-poll': 'createPoll'
  },

  createPoll: function(event){
    event.preventDefault();
    poll_attrs = $('form').serializeJSON();
    this.model = new Vensei.Models.Poll(poll_attrs);
    var poll = this.model;
    poll.save({}, {
      success: function(){
        Backbone.history.navigate('polls/'+ poll.id, {trigger: true});
      },

      error: function(poll, response){
        $('.errors').empty();
        var errors = $.parseJSON(response.responseText);

        errors.forEach(function(error){
          var first_word = error.split(' ')[0];
          if (first_word === "Challenger" || first_word === "Acceptor" ){
            $('.errors').append(
              error.split(' ').splice(2).join(' ') + '<br>'
            );
          } else {
            $('.errors').append(
              error + '<br>'
            );
          }
        });
        setTimeout(function(){
          $('.errors').empty();
        }, 3500);
      }
    });
  }

});
