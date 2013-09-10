var s,
ChoiceyApp = {

	settings: {
		back: $("#back"),
		refresh: $("#refresh-choices"),
		option1: $("#option-1"),
		option2: $("#option-2"),
		pool: [
			{ image: 'http://placehold.it/100x100', headline: 'TKNew Mexico-size volcano discovered in the depths of the Pacific Ocean', link: 'link1' },
			{ image: 'http://placehold.it/100x100', headline: 'TKExperimental \'Armadillo\' car folds up for easy parking', link: 'experimental-armadillo-car-folds-easy-parking.html'},
			{ image: 'http://placehold.it/100x100', headline: 'TK National Zoo’s baby panda is female', link: 'link1' },
			{ image: 'http://placehold.it/100x100', headline: 'TK One-Way Ticket to Mars Attracts Global Attention', link: 'link1' },
			{ image: 'http://placehold.it/100x100', headline: 'TK \'Sixth sense\' exists in brain, scientist says', link: 'link1' },
			{ image: 'http://placehold.it/100x100', headline: 'TK Tokyo wins bid to host 2020 Summer Olympics', link: 'link1' },
			{ image: 'http://placehold.it/100x100', headline: 'TK Unrigging the Admissions System', link: 'link1' },
			{ image: 'http://placehold.it/100x100', headline: 'TK Syria strike may hinge on Nancy Pelosi', link: 'link1' },
			{ image: 'http://placehold.it/100x100', headline: 'TK World leaders push big companies to pay more taxes', link: 'link1' },
			{ image: 'http://placehold.it/100x100', headline: 'TK After NSA encryption-cracking revelation, can we trust Internet security?', link: 'link1' }
		],
		oString: '<img class="thumb" src="{0}"><h2><a href="{1}">{2}</a></h2>',
		counter: 0,
		maxOptions: 10
	},

	init: function() {
		s = this.settings;
		this.bindUIActions();
	},

	bindUIActions: function() {
		s.back.on("click", function() {
			ChoiceyApp.goBack();
		});
		s.refresh.on("click", function() {
			ChoiceyApp.presentOptions();
		})
	},

	goBack: function(){
		window.history.back();
	},
	
	presentOptions: function() {
		var o1 = this.getStory();
		var	o2 = this.getStory();
		s.option1.html(o1);
		s.option2.html(o2);
		s.option2.find('.thumb').addClass('float-left');
	},
	
	getStory: function(){
		var str = s.oString.format(s.pool[s.counter].image, s.pool[s.counter].link, s.pool[s.counter].headline);
		s.counter < s.maxOptions-1 ? s.counter++ : s.counter = 0;
		return str;
	}
};

(function() {
		
	if (!String.prototype.format) {
	  String.prototype.format = function() {
	    var args = arguments;
	    return this.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number]
	        : match
	      ;
	    });
	  };
	}
	// usage: "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
	
	$(document).ready(function(){
		ChoiceyApp.init();
		ChoiceyApp.presentOptions();
	})
})();