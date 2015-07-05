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
				classes: 'shepherd-theme-arrows',
			}
		});

		Vensei.tour.addStep('welcomeStep', {
			title: 'Welcome to Vensei!',
			text: "Vensei is a service which allows users to pin visual bookmarks to a virtual pinboard and share with friends. If you\'ve ever used Pinterest, this should be very familiar!",
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
			title: 'Pins: The Heart of Vensei',
			text: "Each Pin is a Bookmark featuring an image, a link, a description.",
			attachTo: '.card',
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
			title: 'Hovering',
			text: "By hovering over the pin you can \"repin\" it to one of your own boards or \"heart\" (like) it!",
			attachTo: '.card',
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
			title: 'Author Info',
			text: "Clicking the lower portion of the pin leads to Board this pin is sourced from.  Clicking the Avatar will take you to the author's profile!",
			attachTo: '.pinner',
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
			title: 'Biggify Things!',
			text: "Clicking on the image will enlarge the pin, provide more details, and let you read and leave comments.",
			attachTo: '.image-area',
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
			title: 'Infinite Feed',
			text: "Your feed is populated with pins from the various boards you \"follow\".  More content is dynamically added as you scroll down!",
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
			title: 'New Pins and Boards',
			text: "Adding New Content is easy! Click on on the \"plus\" button and follow the instructions!",
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			attachTo: '.plus top',
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
			title: 'Your Profile',
			text: "View your Boards and Profile by Clicking on your name. Currently, you are logged in as " + CURRENT_USER_USERNAME,
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			attachTo: '.current-user bottom',
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
			title: 'Notifications',
			text: "View your Notifications by Clicking on the red Talk Icon.",
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			attachTo: '.current-user bottom',
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
			title: 'Search',
			text: "The Search Bar will search the description portion of all pins for matching content.  Try Searching for the word \"Zack\"",
			classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
			attachTo: '.search bottom',
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
