window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 180; // * 10 pixels per second
	var FALLSPEED = 5;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {

		this.el = el;
		console.log(el);

		this.game = game;

		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {


		if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}

		if (Controls.keys.space) {
			//this.pos.x += delta * SPEED;
			this.pos.y -= delta * SPEED;
		}

		if (Controls.freeFalling) {
			//this.pos.x += delta * FALLSPEED;
			this.pos.y += delta * FALLSPEED * 9.81;
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 || this.pos.x + WIDTH > this.game.WORLD_WIDTH || this.pos.y < 0 || this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	Player.prototype.checkPlatforms = function(oldY) {
		
		var that = this;

		this.game.forEachPlatform(function(p) {
			// Are we crossing Y.
			if (p.rect.y >= oldY && p.rect.y < that.pos.y) {

			// Are inside X bounds.
				if (that.pos.x + PLAYER_HALF_WIDTH >= p.rect.x && that.pos.x - PLAYER_HALF_WIDTH <= p.rect.right) {
				// COLLISION. Let's stop gravity.
				that.pos.y = p.rect.y;
				that.vel.y = 0;
				}
			}
		});
	};

	return Player;

})();
