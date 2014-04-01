window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 1000; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = -300;
	var INITIAL_POSITION_Y = 250;
	// x2 = 70 + 5 = 70 - 75
	// y2 = 20 + 5 = 20 - 25

	var Player = function(el, game) {

		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.width = this.el[0].clientWidth;
		this.height = this.el[0].clientHeight;
		this.points = 0;
	};

	Player.prototype.pointGained = function(){
		this.points = this.points+1;
	};

	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		console.log("Pulsuvagn");
		console.log(this.game.entities);
		this.points = 0;

	};

	Player.prototype.onFrame = function(delta) {
		//console.log("delta");
		//console.log(delta);


		if (Controls.keys.space) {
			//this.pos.x += delta * SPEED;
			this.pos.y -= delta * SPEED;
			//this.pos.x += delta * SPEED;
		}

		if (Controls.freeFalling) {
			//this.pos.x += delta * FALLSPEED;
			this.pos.y += delta * SPEED/2;
			this.pos.x += (delta * SPEED/2);
		}

		//this.game.checkCollisionPlayerVSPlatform();
		//this.checkCollisionWithBounds();

		this.checkPlatforms();

		// Update UI
		//console.log(this.el);

		this.el.css('transform', 'translate(' + this.pos.x + 'px, ' + this.pos.y + 'px)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 || this.pos.x + WIDTH > this.game.WORLD_WIDTH || this.pos.y < 0 || this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	Player.prototype.checkCollisionWithGround = function() {

	};

	Player.prototype.checkPlatforms = function() {

		//console.log(this.pos);
		if (this.game.checkCollisionPlayerVSPlatform(this.pos) === true)
		{
			console.log("GAME LOST");
			return this.game.gameover();
		}
		else if (this.game.checkCollisionPlayerVSPlatform(this.pos) === "hasWon")
		{
			console.log("Bingo");
		}
	};

	return Player;

})();
