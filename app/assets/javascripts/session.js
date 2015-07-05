window.Guest = {
	initialize: function(){
		$(".guest-login").on( "click", this.guestLogin.bind(this) );
	},

	guestLogin: function(event){
    event.preventDefault();
		var that = this;
		$username = $('#username');
		$password = $('#password');
		$submitButton = $('.login-button');

		this.slowtype($username, 'Goku', function(){
			that.slowtype($password, 'password', function(){
				$submitButton.click();
			});
		});
	},

	slowtype: function($el, word, callback){

		var typing = setInterval(function(){
			$el.val( $el.val() + word.slice(0,1) );
			word = word.substr(1);

			if (!word){
				clearInterval(typing);
				callback();
			}
		}, 40);
	}
};

$(function(){
  Guest.initialize();
});
