
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.entities = [];
		this.platformsEl = el.find('.platforms');
		this.entitiesEl = el.find('.entities');
		this.worldEl = el.find('.world');
		this.isPlaying = false;
		this.onFrame = this.onFrame.bind(this);
	};

	Game.prototype.freezeGame = function() {
		this.isPlaying = false;
	};

	Game.prototype.unFreezeGame = function() {
		if (!this.isPlaying) {
			this.isPlaying = true;
			// Restart the onFrame loop
			this.lastFrame = +new Date() / 1000;
			window.requestAnimationFrame(this.onFrame);
		}
	};

	Game.prototype.createWorld = function () {
		/*this.addPlatform(new Platform({
			x: 100,
			y: 418,
			width: 800,
			height: 10
	    }));

	    // Floating platforms
	    this.addPlatform(new Platform({
			x: 300,
			y: 258,
			width: 100,
			height: 10
	    }));

	    this.addPlatform(new Platform({
			x: 500,
			y: 288,
			width: 100,
			height: 10
	    }));

	    this.addPlatform(new Platform({
			x: 400,
			y: 158,
			width: 100,
			height: 10
	    }));

	    this.addPlatform(new Platform({
			x: 750,
			y: 188,
			width: 100,
			height: 10
	    }));

	    this.addEnemy(new Enemy({
			start: {x: 400, y: 350},
			end: {x: 400, y: 200}
	    }));*/
	};

	Game.prototype.addPlatform = function(platform) {
		this.entities.push(platform);
		this.platformsEl.append(platform.el);
	};

	Game.prototype.addEnemy = function(enemy) {
	    this.entities.push(enemy);
	    this.entitiesEl.append(enemy.el);
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

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
	};

	/**
	 * Signals that the game is over.
	 */
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
		console.log('Mundu mig');
		console.log(this.entities);
		console.log(handler);
		/*for (var i = 0; e = this.entities[i]; i++) {
			if (e instanceof Platform) {
				handler(e);
			}
		}*/
	};

	Game.prototype.forEachEnemy = function(handler) {
		console.log('Mundu mig Lika');
		console.log(handler);

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
	//Game.prototype.obstacle = new window.obstacle(this.el.find('.Obstace'), this);

	return Game;
})();

