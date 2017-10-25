// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){

	var Memory = {

		init: function(cards){
			debugger;
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.binding();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			debugger;
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="http://icons.iconarchive.com/icons/sicons/flat-shadow-social/512/buzzfeed-icon.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "good boy 1",
			img: "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
			id: 1,
		},
		{
			name: "good boy 2",
			img: "http://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development-300x200.jpg",
			id: 2
		},
		{
			name: "good boy 3",
			img: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/All-about-puppies--Cesar%E2%80%99s-tips%2C-tricks-and-advice.jpg?itok=bi9xUvwe",
			id: 3
		},
		{
			name: "good boy 4",
			img: "https://i.pinimg.com/736x/c6/4c/e0/c64ce05bf01ccb3ea8af44de5980cbe4--teacup-maltipoo-maltipoo-puppies.jpg",
			id: 4
		},
		{
			name: "good boy 5",
			img: "https://assets.merriam-webster.com/mw/images/article/art-wap-article-main/puppy-3143-7cfb4d6a42dfc7d9d1ae7e23126279e8@1x.jpg",
			id: 5
		},
		{
			name: "good boy 6",
			img: "https://media.timeout.com/images/103853123/630/472/image.jpg",
			id: 6
		},
		{
			name: "good boy 7",
			img: "https://lh4.ggpht.com/4nDELzdauqt2pyNaf-JI-ZDo6Ur87KgtQi9ASUaQF-l8qMIfufBXz0FLh1BV5oxGbDw=h900",
			id: 7
		},
		{
			name: "good boy 8",
			img: "https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg",
			id: 8
		},
		{
			name: "good boy 9",
			img: "https://i.pinimg.com/736x/1d/84/25/1d8425330a623bfee9c0bb683367b662--rottweiler-puppies-puppies-puppies.jpg",
			id: 9
		},
		{
			name: "good boy 10",
			img: "http://cdn.akc.org/Marketplace/Breeds/Pembroke_Welsh_Corgi_SERP.jpg",
			id: 10
		},
		{
			name: "good boy 11",
			img: "https://img.buzzfeed.com/buzzfeed-static/static/2016-11/9/9/campaign_images/buzzfeed-prod-web13/puppies-are-real-2-15268-1478702597-1_dblbig.jpg",
			id: 11
		},
		{
			name: "good boy 12",
			img: "https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Cockapoo-Puppies-For-Sale-600x600.jpg",
			id: 12
		},
	];

	Memory.init(cards);


})();
