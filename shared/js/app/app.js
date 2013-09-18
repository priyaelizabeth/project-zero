var s,
ChoiceyApp = {

	settings: {
		choiceyPrompt: $(".quickreads-prompt"),
		backBtn: $("#back"),
		refreshBtn: $("#refresh-choices"),
		resetBtn: $('.nav-sections-button a'),
		greetingEl: $("#greeting"),
		greetings: [
			"OK, have you heard about:",
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
				{ image: 'images/bus.jpg', headline: 'The crackdown on unsafe commercial bus companies', link: 'article/bus-safety-focus.html' }
			],
			[
				{ image: 'images/mars.jpg', headline: 'These people who want to go on a one-way trip to Mars', link: 'article/these-people-want-to-go-to-mars.html' },
				{ image: 'images/volcano.jpg', headline: 'A volcano at the bottom of the Pacific Ocean the size of New Mexico', link: 'article/volcano-discovered-in-pacific.html' }
			],
			[
				{ image: 'images/water.jpg', headline: 'The huge supply of underground water they found in drought-stricken Kenya', link: 'article/scientists-strike-water-kenyas-parched-north.html' },
				{ image: 'images/internet.jpg', headline: 'The discovery that the NSA has ability to bypass a variety of digital encryption tools', link: 'article/after-nsa-can-we-trust.html' }
			],
			[
				{ image: 'images/chain.jpg', headline: 'This group of Catalans that formed a human chain across a region of Spain', link: 'article/catalans-form-human-chain-spain-separation-bid.html' },
				{ image: 'images/armadillo.jpg', headline: 'The South Korean car that folds up when you park it', link: 'article/experimental-armadillo-car-folds-easy-parking.html' }
			],
			[
				{ image: 'images/memory.jpg', headline: 'Why you should really be taking a nap right now', link: 'article/memory-pinball-and-other-reasons.html' },
				{ image: 'images/food.jpg', headline: 'Fast Foods on the High Seas', link: 'article/cruise-ship-fast-food.html' }
			]
		],
		oString: '<a href="{1}"><img class="thumb" src="{0}"><h2>{2}</a></h2>',
		oCounter: parseInt(localStorage.getItem('option-counter'),10) || 0,
		maxOptions:0,
		maxGreetings:0,
		gCounter: 0,
		finished: {
			img: "images/check.png",
			greeting: "Hope you enjoyed these quick reads. Check back again later for more.",
			timestamp: "Last updated 10 minutes ago",
			homeBtn: $('<a class="button medium expand" id="home-btn" href="index.html">Return to Today’s Headlines</a>'),
		}
	},

	init: function() {
		s = this.settings;
		s.maxOptions = s.pool.length;
		s.maxGreetings = s.greetings.length;
		this.toggleChoicey();
		this.shuffle(s.pool);
		this.bindUIActions();
		console.log('option-counter is ' + s.oCounter);
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
			console.log('removing option-counter');
		});
	},

	goBack: function(){
		window.history.back();
	},
	
	toggleChoicey: function(){
		if(s.oCounter >= s.maxOptions-1){
			s.choiceyPrompt.fadeOut(150);
		}
	},
	
	refreshGreeting: function(msg){
		if(msg){
			s.greetingEl.text(msg).addClass('no-more');
			$('<img src="'+ s.finished.img + '" alt="Check mark" class="no-more-check">').insertBefore(s.greetingEl);
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
			console.log('setting option-counter to ' + s.oCounter);
			
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