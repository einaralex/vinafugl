window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 1000; // * 10 pixels per second
	var HEIGHT = 5;

	var INITIAL_POSITION_X = 250;
	var INITIAL_POSITION_Y = 300;

	var Player = function(el, game) {

		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.width = this.el[0].clientWidth;
		INITIAL_POSITION_Y = game.el[0].clientHeight/3.5;
		INITIAL_POSITION_X = game.el[0].clientWidth/5;
		this.height = this.el[0].clientHeight;
		this.points = 0;
	};

	Player.prototype.pointGained = function(){
		this.points += 1;
	};

	Player.prototype.reset = function() {

		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		Controls._didJump = false;
		this.points = 0;
	};

	Player.prototype.onFrame = function(delta) {

		if (Controls._didJump) {
			this.isPlaying = true;
			this.pos.y -= delta * SPEED;
		}

		if (Controls.freeFalling) {
			this.pos.y += delta * SPEED/2;
			this.pos.x += (delta * SPEED/2);
		}

		this.checkCollisionWithBounds();
		this.checkifPoint();
		this.checkPlatforms();

		this.el.css('transform', 'translate(' + this.pos.x + 'px, ' + this.pos.y + 'px)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if ( this.pos.y + HEIGHT > (this.game.WORLD_HEIGHT - 95 )) {
			return this.game.gameover();
		}
	};

	Player.prototype.checkPlatforms = function() {

		if (this.game.checkCollisionPlayerVSPlatform(this.pos) === false)
		{
			return this.game.gameover();
		}
	};

	Player.prototype.checkifPoint = function() {
		if (this.game.checkForCheckPoint(this.pos) === true)
		{
			this.pointGained();
		}
	};

	return Player;

})();
