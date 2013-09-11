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
			{ image: 'http://news.bbcimg.co.uk/media/images/69685000/jpg/_69685229_img_0578.jpg', headline: 'TK Meet the Arizona teens whose hobbies include performing public exorcisms?', link: 'article/teen-exorcists.html'},
			{ image: 'http://i.huffpost.com/gen/1342502/thumbs/o-PANDA-CUB-900.jpg?6', headline: 'Meet the newest addition to the The Smithsonian National Zoo', link: 'article/newest-addition-to-national-zoo.html' },
			{ image: 'http://i.huffpost.com/gen/880172/thumbs/o-BIGFOOT-PETER-TRAVERS-570.jpg?12', headline: 'TK Discover a new book about bigfoot and other monsters', link: 'article/science-behind-bigfoot.html' },
			{ image: 'http://newswatch.nationalgeographic.com/files/2013/09/Mars_one_16_1920x1080-600x337.jpg', headline: 'TK Consider the applicants for a one-way ticket to Mars', link: 'article/these-people-want-to-go-to-mars.html' },
			{ image: 'http://a57.foxnews.com/global.fncstatic.com/static/managed/img/Scitech/660/371/brain_power.jpg?ve=1', headline: 'Explore the scientific discovery that humans possess a \'Sixth sense\'', link: 'article/scientists-confirm-sixth-sense.html' },
			{ image: 'http://media.npr.org///assets/img/2013/09/07/istock_000009357397small_wide-02f604b747809cb653bb6b4eaff2594b2dcfc3dc-s40-c85.jpg', headline: 'TK Hear about why you probably need to take a nap', link: 'article/memory-pinball-and-other-reasons.html' },
			{ image: 'http://msnbcmedia3.msn.com/j/streams/2013/September/130906/8C8880623-130906-internet-secure-340p.blocks_desktop_small.jpg', headline: 'TK After NSA encryption-cracking revelation, can we trust Internet security?', link: 'article/after-nsa-can-we-trust.html' },
			{ image: 'http://www.washingtonpost.com/rf/image_606w/2010-2019/WashingtonPost/2013/09/06/Others/Images/2013-09-06/Tamu3D_v21378482912.jpg', headline: 'Find out where the largest volcano on earth is really located', link: 'article/volcano-discovered-in-pacific.html' },
			{ image: 'http://timenewsfeed.files.wordpress.com/2013/09/fold-up-armadillo-car.jpg?w=480&h=320&crop=1', headline: 'TK Hear about the South Korean car nicknamed after a desert animal?', link: 'experimental-armadillo-car-folds-easy-parking.html'}			
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