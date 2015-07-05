Vensei.Views.HelpIcon = Backbone.CompositeView.extend({

	template: JST['help'],

	initialize: function(){
		this.addTour();
	},

	events: {
		'click .help': 'startTour'
	},

	addTour: function(){
		Vensei.tour = new Shepherd.Tour({
			defaults: {
				classes: 'shepherd-theme-arrows'
			}
		});

		Vensei.tour.addStep('welcomeStep', {
			title: 'Welcome to Vensei!',
			text: "Vensei lets you make live-updating polls that" +
			" compare the comedic value of two Vines. As your audience"+
			" submits their responses over the web or sms, polls"+
			" update live. If you\'ve ever used Poll"+
			" Everywhere, this should be very familiar!",
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [
				{
					text: 'Next',
					action: Vensei.tour.next,
					classes: 'shepherd-button-example-primary'
				},

				{
					text: 'End Tutorial',
					classes: 'shepherd-button-secondary',
					action: Vensei.tour.complete
				}
			]
		});

		Vensei.tour.addStep('cardStep', {
			title: 'Live demo',
			text: "This is a live demo; play the vids and vote!",
			attachTo: '.computer',
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [
				{
					text: 'Next',
					action: Vensei.tour.next,
					classes: 'shepherd-button-example-primary'
				},

				{
					text: 'End Tutorial',
					classes: 'shepherd-button-secondary',
					action: Vensei.tour.complete
				}
			]
		});

		Vensei.tour.addStep('cardStep', {
			title: 'Live Updates',
			text: "Like all Vensei Polls, this poll updates live when"+
			" anyone votes; have a friend vote and see it update!",
			attachTo: '.computer',
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [
				{
					text: 'Next',
					action: Vensei.tour.next,
					classes: 'shepherd-button-example-primary'
				},

				{
					text: 'End Tutorial',
					classes: 'shepherd-button-secondary',
					action: Vensei.tour.complete
				}
			]
		});

		Vensei.tour.addStep('cardStep', {
			title: 'Creating polls',
			text: "Create polls by entering in the urls of two Vines.",
			attachTo: '.new-poll',
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [
				{
					text: 'Next',
					action: Vensei.tour.next,
					classes: 'shepherd-button-example-primary'
				},

				{
					text: 'End Tutorial',
					classes: 'shepherd-button-secondary',
					action: Vensei.tour.complete
				}
			]
		});

		Vensei.tour.addStep('cardStep', {
			title: 'Browsing Polls',
			text: "Make sure your headphones are on! Clicking this button will play "+
			"Vines for you to browse and compare.",
			attachTo: '.browse-battles',
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [
				{
					text: 'Next',
					action: Vensei.tour.next,
					classes: 'shepherd-button-example-primary'
				},

				{
					text: 'End Tutorial',
					classes: 'shepherd-button-secondary',
					action: Vensei.tour.complete
				}
			]
		});

		Vensei.tour.addStep('cardStep', {
			title: 'Get points for knowing what people think are funny',
			text: "As you vote on browsed vines, if your choice matches the Vine"+
			" that most people thought was funnier, you'll get points. Otherwise,"+
			" you'll lose points. Score is displayed in the navbar up top.",
			scrollTo: true,
			attachTo: '.response-block',
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [
				{
					text: 'Next',
					action: Vensei.tour.next,
					classes: 'shepherd-button-example-primary'
				},

				{
					text: 'End Tutorial',
					classes: 'shepherd-button-secondary',
					action: Vensei.tour.complete
				}
			]
		});

		Vensei.tour.addStep('finalStep', {
			title: 'Have Fun Exploring!',
			text: 'Enjoy your stay. You can relaunch this tour by clicking on the question mark in the bottom right of your screen.',
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			buttons: [
				{
					text: 'Got It!',
					classes: 'shepherd-button-secondary',
					action: Vensei.tour.complete
				}
			]
		});
	},

	startTour: function() {
		if (Vensei.tour) {
			Vensei.tour.complete();
		}

		Vensei.tour.start();
	},

	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}

});
