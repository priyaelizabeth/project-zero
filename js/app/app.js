var s,
ChoiceyApp = {

	settings: {
		back: $("#back"),
		refresh: $("#refresh-choices"),
		oEls: [$("#option-1"), $("#option-2")],
		pool: [
			{ image: 'http://i.huffpost.com/gen/1342502/thumbs/o-PANDA-CUB-900.jpg?6', headline: 'TK Meet the newest resident at the National Zoo', link: 'article/article.html' },
			{ image: 'http://www.reuters.com/investigates/adoption/images/part1/ce1b.jpg', headline: 'TK Learn about the American underground market for adopted international children', link: 'article/article.html' },
			{ image: 'http://newswatch.nationalgeographic.com/files/2013/09/Mars_one_16_1920x1080-600x337.jpg', headline: 'TK Consider the applicants for a one-way ticket to Mars', link: 'article/article.html' },
			{ image: 'http://a57.foxnews.com/global.fncstatic.com/static/managed/img/Scitech/660/371/brain_power.jpg?ve=1', headline: 'TK Read about the discovery of the human brain\'s \'Sixth sense\'', link: 'article/article.html' },
			{ image: 'http://media.npr.org///assets/img/2013/09/07/istock_000009357397small_wide-02f604b747809cb653bb6b4eaff2594b2dcfc3dc-s40-c85.jpg', headline: 'TK Hear about why you probably need to take a nap', link: 'article/memory-pinball-and-other-reasons.html' },
			{ image: 'http://placehold.it/150x100', headline: 'TK After NSA encryption-cracking revelation, can we trust Internet security?', link: 'article/article.html' },
			{ image: 'http://www.washingtonpost.com/rf/image_606w/2010-2019/WashingtonPost/2013/09/06/Others/Images/2013-09-06/Tamu3D_v21378482912.jpg', headline: 'TK The largest known volcano, hiding quietly in the Pacific Ocean', link: 'article/article.html' },
			{ image: 'http://timenewsfeed.files.wordpress.com/2013/09/fold-up-armadillo-car.jpg?w=480&h=320&crop=1', headline: 'TK Hear about the South Korean car nicknamed after a desert animal?', link: 'experimental-armadillo-car-folds-easy-parking.html'},
			{ image: 'http://mjcdn.motherjones.com/preset_51/shampoo.jpg', headline: 'TK Learn about how every time you shampoo you\'re hurting the environment?', link: 'article/dont-lather-dont-rinse-dont-repeat.html' },
			{ image: 'http://news.bbcimg.co.uk/media/images/69685000/jpg/_69685229_img_0578.jpg', headline: 'TK Meet the Arizona teens whose hobbies include performing public exorcisms?', link: 'article/teen-exorcists.html'}
			
		],
		oString: '<a href="{1}"><img class="thumb" src="{0}"></a><h2><a href="{1}">{2}</a></h2>',
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
			ChoiceyApp.populateOptions();
		})
	},

	goBack: function(){
		window.history.back();
	},
	
	populateOptions: function() {
		$.each(s.oEls, function(i,v){
			v.fadeOut(50, function(){
				v.html(ChoiceyApp.getNextStory()).fadeIn(50);
			});
		});
	},
	
	getNextStory: function() {
		var str = s.oString.format(s.pool[s.counter].image, s.pool[s.counter].link, s.pool[s.counter].headline);
		s.counter < s.maxOptions-1 ? s.counter++ : s.counter = 0;
		return str;
	},
	
	revealOptions: function() {
		$.each(s.oEls, function(i,v){
			v.animate({opacity: 1},100);
		});
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
		ChoiceyApp.revealOptions();
	})
})();