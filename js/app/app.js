var s,
ChoiceyApp = {

	settings: {
		back: $("#back"),
		refresh: $("#refresh-choices"),
		greetingEl: $("#greeting"),
		greetings: [
			"OK, have you heard about:",
			"Alright, how about:",
			"Hmm, what about:"
		],
		oEls: [$("#option-1"), $("#option-2")],
		pool: [
			{ image: '../project-zero/images/shampoo.jpg', headline: 'TK Learn about how every time you shampoo you\'re hurting the environment?', link: 'article/dont-lather-dont-rinse-dont-repeat.html' },
			{ image: '../project-zero/images/exorcists.jpg', headline: 'TK Meet the Arizona teens whose hobbies include performing public exorcisms?', link: 'article/teen-exorcists.html'},
			{ image: '../project-zero/images/panda.jpg', headline: 'Meet the newest addition to the The Smithsonian National Zoo', link: 'article/newest-addition-to-national-zoo.html' },
			{ image: 'http://i.huffpost.com/gen/880172/thumbs/o-BIGFOOT-PETER-TRAVERS-570.jpg?12', headline: 'TK Discover a new book about bigfoot and other monsters', link: 'article/science-behind-bigfoot.html' },
			{ image: '../project-zero/images/mars.jpg', headline: 'These people who want to go on a one way trip to Mars?', link: 'article/these-people-want-to-go-to-mars.html' },
			{ image: 'http://a57.foxnews.com/global.fncstatic.com/static/managed/img/Scitech/660/371/brain_power.jpg?ve=1', headline: 'Explore the scientific discovery that humans possess a \'Sixth sense\'', link: 'article/scientists-confirm-sixth-sense.html' },
			{ image: '../project-zero/images/memory.jpg', headline: 'TK Hear about why you probably need to take a nap', link: 'article/memory-pinball-and-other-reasons.html' },
			{ image: '../project-zero/images/internet.jpg', headline: 'TK After NSA encryption-cracking revelation, can we trust Internet security?', link: 'article/after-nsa-can-we-trust.html' },
			{ image: '../project-zero/images/volcano.jpg', headline: 'Find out where the largest volcano on earth is really located', link: 'article/volcano-discovered-in-pacific.html' },
			{ image: '../project-zero/images/armadillo.jpg', headline: 'TK Hear about the South Korean car nicknamed after a desert animal?', link: 'experimental-armadillo-car-folds-easy-parking.html'}			
		],
		oString: '<a href="{1}"><img class="thumb" src="{0}"></a><h2><a href="{1}">{2}</a></h2>',
		oCounter: localStorage.getItem('option-oCounter') || 0,
		gCounter: 0,
		maxOptions: 10,
		maxGreetings: 3
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
			ChoiceyApp.refreshOptions();
		})
	},

	goBack: function(){
		window.history.back();
	},
	
	refreshGreeting: function(){
		s.greetingEl.text(s.greetings[s.gCounter]);
		s.gCounter < s.maxGreetings-1 ? s.gCounter++ : s.gCounter = 0;
	},
	
	refreshOptions: function() {
		ChoiceyApp.refreshGreeting();
		$.each(s.oEls, function(i,v){
			v.fadeOut(150, function(){
				v.html(ChoiceyApp.getNextStory()).fadeIn(150);
			});
		});
	},

	getNextStory: function() {
		var str = s.oString.format(s.pool[s.oCounter].image, s.pool[s.oCounter].link, s.pool[s.oCounter].headline);
		s.oCounter < s.maxOptions-1 ? s.oCounter++ : s.oCounter = 0;
		localStorage.setItem('option-oCounter',s.oCounter);
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
	
	$(document).ready(function(){
		ChoiceyApp.init();
	})

})();