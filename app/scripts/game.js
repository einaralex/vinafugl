
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		
		console.log(this.el);

		this.player = new window.Player(this.el.find('.Player'), this);
		console.log('Sætabrauðsdrengur');
		console.log(this.player);
		this.entities = [];
		this.platformsEl = el.find('.platforms');
		this.entitiesEl = el.find('.entities');
		this.worldEl = el.find('.world');
		this.isPlaying = false;
		this.onFrame = this.onFrame.bind(this);
	};

	Game.prototype.checkCollisionPlayerVSPlatform = function () {
		//console.log("DUDUDUDUDUDDUDUUUUUUUUUUUDUDUUDDUDUUDUUuu!u!u!!!uDUDUUDUUUDuu1uu1u");
		//console.log(this.platformsEl);
		//console.log(this.player);
		//return true;

		// TODO: Reikna út hnitin á main bodyinu á fuglinum, svo ég geti gert x0 x1, y0 y1 og borið saman við hinn.
		/*if(this.player.pos.x < this.entities.rect)
		{
			console.log("haha");
		}*/
		//console.log("what");
		//console.log(this.entities);
		//console.log(this.player.pos.x);
		//console.log(this.platformsEl);



/*
if (this.pos.x < 0 || this.pos.x + WIDTH > this.game.WORLD_WIDTH || this.pos.y < 0 || this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
		return this.game.gameover();
	}
*/
	};


	Game.prototype.createWorld = function () {

		//console.log("fyrir");
	    console.log(this);

	    this.addPlatform(new Platform({
			x: 650,
			y: 188,
			width: 100,
			height: 40
	    }));
	    //console.log("eftir");
	    console.log(this);

	};

	Game.prototype.addPlatform = function(platform) {

		this.entities.push(platform);
		//console.log("BOOM headshot");
		console.log(this.entities);
		this.platformsEl.append(platform.el);
	};

	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.

		if (!this.isPlaying) {
			return;
		}
		if (this.checkCollisionPlayerVSPlatform()){
		//	console.log("YOU FUCKING LOST");
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {

		this.reset();
		//this.entities.forEach(function(e) { e.el.remove(); });
	    //this.entities = [];

	    console.log(this.entities);

	    // Set the stage.
	    this.createWorld();
	    console.log("World created");
	    this.player.reset();


		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;

		console.log("Hlölli");
		console.log(this.entities);
		console.log(this.player.pos);

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


	Game.prototype.forEachPlatform = function(handler) {
		
		/*for (var i = 0; e = this. [i]; i++) {
			if (e instanceof Platform) {
				handler(e);
			}
		}*/
	};

	Game.prototype.forEachEnemy = function(handler) {
		
		/*for (var i = 0, e; e = this.entities[i]; i++) {
			if (e instanceof Enemy) {
				handler(e);
			}
		}*/
	};



	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();

