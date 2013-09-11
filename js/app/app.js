var s,
ChoiceyApp = {

	settings: {
		backBtn: $("#back"),
		refreshBtn: $("#refresh-choices"),
		resetBtn: $('.nav-sections-button a'),
		greetingEl: $("#greeting"),
		greetings: [
			"OK, have you heard about:",
			"Alright, how about:",
			"Hmm, what about:"
		],
		stories: [$("#option-1"),$("#option-2")],
		divider: $("#option-divider"),
		timestamp: $("#timestamp"),
		pool: [
			[
				{ image: 'images/shampoo.jpg', headline: 'The latest household products contributing to explosive levels of plastic pollution', link: 'article/dont-lather-dont-rinse-dont-repeat.html' },
				{ image: 'images/exorcists.jpg', headline: 'The Arizona teens whose hobbies include performing public exorcisms', link: 'article/teen-exorcists.html'}
			],
			[
				{ image: 'images/panda.jpg', headline: 'The newest little addition to the The Smithsonian National Zoo', link: 'article/newest-addition-to-national-zoo.html' },
				{ image: 'http://i.huffpost.com/gen/880172/thumbs/o-BIGFOOT-PETER-TRAVERS-570.jpg?12', headline: 'TK Discover a new book about bigfoot and other monsters', link: 'article/science-behind-bigfoot.html' }
			],
			[
				{ image: 'images/mars.jpg', headline: 'These people who want to go on a one-way trip to Mars', link: 'article/these-people-want-to-go-to-mars.html' },
				{ image: 'http://a57.foxnews.com/global.fncstatic.com/static/managed/img/Scitech/660/371/brain_power.jpg?ve=1', headline: 'Explore the scientific discovery that humans possess a \'Sixth sense\'', link: 'article/scientists-confirm-sixth-sense.html' }
			],
			[
				{ image: 'images/memory.jpg', headline: 'Why you should really be taking a nap right now', link: 'article/memory-pinball-and-other-reasons.html' },
				{ image: 'images/internet.jpg', headline: 'The discovery that the NSA has ability to bypass a variety of digital encryption tools', link: 'article/after-nsa-can-we-trust.html' }
			],
			[
				{ image: 'images/volcano.jpg', headline: 'A volcano at the bottom of the Pacific Ocean the size of New Mexico', link: 'article/volcano-discovered-in-pacific.html' },
				{ image: 'images/armadillo.jpg', headline: 'The South Korean car that folds up when you park it', link: 'experimental-armadillo-car-folds-easy-parking.html'}
			]
		],
		oString: '<a href="{1}"><img class="thumb" src="{0}"></a><h2><a href="{1}">{2}</a></h2>',
		oCounter: parseInt(localStorage.getItem('option-counter'),10) || 0,
		gCounter: 0,
		maxOptions: 5,
		maxGreetings: 3,
		finished: {
			greeting: "Hope you enjoyed these quick reads. Check back again later for more.",
			timestamp: "Last updated 5 min ago",
			homeBtn: $('<a class="button medium expand" id="home-btn" href="index.html">Return to Today’s Headlines</a>'),
		}
	},

	init: function() {
		s = this.settings;
		this.bindUIActions();
	},

	bindUIActions: function() {
		s.backBtn.on("click", function() {
			ChoiceyApp.goBack();
		});
		s.refreshBtn.on("click", function() {
			ChoiceyApp.refreshOptions();
		});
		// for debugging...
		s.resetBtn.on("click", function() {
			localStorage.removeItem('option-counter');
		});
		//ChoiceyApp.shuffle(s.greetings);
	},

	goBack: function(){
		window.history.back();
	},
	
	refreshGreeting: function(msg){
		if(msg){
			s.greetingEl.text(msg);
		} else {
			s.greetingEl.text(s.greetings[s.gCounter]);
			s.gCounter < s.maxGreetings-1 ? s.gCounter++ : s.gCounter = 0;
		}
	},
	
	refreshOptions: function() {
		if (s.oCounter <= s.maxOptions -1 ) {
			console.log(s.oCounter);
			// we have pairs left to present
			ChoiceyApp.refreshGreeting();
			var pair = s.pool[s.oCounter];
			$.each(s.stories, function(i,v){
				v.fadeOut(150, function(){
					v.html(ChoiceyApp.formatStory(pair[i])).fadeIn(150);
				});
			});
			localStorage.setItem('option-counter',s.oCounter+=1);
			
		} else {
			ChoiceyApp.finish();
		}
	},
	
	formatStory: function(story) {
		var str = s.oString.format(story.image, story.link, story.headline);
		return str;
	},

	shuffle: function(o){
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	},
	
	finish: function(){
		$.each(s.stories, function(i,v){
			v.hide();
		});
		s.divider.hide();
		ChoiceyApp.refreshGreeting(s.finished.greeting);
		s.refreshBtn.replaceWith(s.finished.homeBtn);
		s.timestamp.detach().insertAfter(s.greetingEl).text(s.finished.timestamp);
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