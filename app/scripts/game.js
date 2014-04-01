
window.Game = (function() {
	'use strict';

	var VIEWPORT_PADDING = 200;

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		console.log("Sjadu mig");
		console.log(this.el);

		this.player = new window.Player(this.el.find('.Player'), this);
		console.log('Sætabrauðsdrengur');
		console.log(this.player);
		this.entities = [];
		this.platformsEl = el.find('.platforms');
		this.entitiesEl = el.find('.entities');
		this.worldEl = el.find('.world');
		this.Scoreboard = el.find('.Scoreboard');
		this.isPlaying = false;
		this.platforms = [];
		this.onFrame = this.onFrame.bind(this);
		console.log("pizzaogpasta");
		console.log(this.worldEl);

	};

	Game.prototype.checkCollisionPlayerVSPlatform = function (playerpos) {

		for (var i=0; i<this.platforms.length; i++)
		{
			if (playerpos.x + this.player.width >= this.platforms[i].rect.x && playerpos.y + this.player.height >= this.platforms[i].rect.y &&
				playerpos.x <= this.platforms[i].rect.x + this.platforms[i].rect.width && playerpos.y <= this.platforms[i].rect.y + this.platforms[i].rect.height)
			{
				console.log("kaka");
				return true;
			}
		}
	};

	Game.prototype.createWorld = function () {

	    for (var i=1, bil=0; i<=50; i++, bil = bil + 400)
	    {
	    	this.addPlatform(new Platform({
				x: bil,
				y: 0,
				width: 100 , //* (1 + Math.random()*0.3),
				height: 200 + (200 * Math.random()*0.2)
	    	}));


	    	this.addPlatform(new Platform({
				x: bil,
				y: 400  + (400*Math.random()*0.2),
				width: 80 ,
				height: 200
	    	}));
	    }
	};

	Game.prototype.addPlatform = function(platform) {

		
		this.entities.push(platform);
		this.platformsEl.append(platform.el);
		this.platforms.push(platform);
		
	};

	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.

		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.updateViewport();

		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.updateViewport = function() {

		var minX = this.viewport.x + VIEWPORT_PADDING;
    	var maxX = this.viewport.x + this.viewport.width + VIEWPORT_PADDING;

    	var playerX = this.player.pos.x;

	    // Update the viewport if needed.
	    if (playerX < minX) {
	      this.viewport.x = playerX - VIEWPORT_PADDING;
	    } else if (playerX > maxX) {
	      this.viewport.x = playerX + this.viewport.width - VIEWPORT_PADDING;
	    }


	    this.worldEl.css({
	      left: -this.viewport.x,
	      top: -this.viewport.y
	    });

	    this.Scoreboard.css({
	    	left: +this.viewport.x + 300,
	      	top: +this.viewport.y + 100
	    });
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {

		this.reset();
	    console.log(this.entities);

	    // Set the stage.
	    this.createWorld();
	    console.log("World created");
	    this.player.reset();
	    this.viewport = {x: 0, y: 0, width: 0, height: 0};

		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;

	};

	Game.prototype.reset = function() {
		this.player.reset();
	};

	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	/*Game.prototype.WORLD_WIDTH = this.el[0].clientWidth;
	Game.prototype.WORLD_HEIGHT = this.el[0].clientHeight;
	console.log("pulsa");
	console.log(Game.prototype.WORLD_WIDTH);
	console.log(Game.prototype.WORLD_HEIGHT)*/

	return Game;
})();

