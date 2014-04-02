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

		this.player = new window.Player(this.el.find('.Player'), this);
		this.entities = [];
		this.platformsEl = el.find('.platforms');
		this.entitiesEl = el.find('.entities');
		this.worldEl = el.find('.world');
		this.Scoreboard = el.find('.Scoreboard');
		this.ground = el.find('.ground');
		this.muteButton = el.find('.muteButton');
		this.playButton = el.find('.playButton');
		this.isPlaying = false;
		this.platforms = [];
		this.onFrame = this.onFrame.bind(this);

		this.WORLD_WIDTH = this.el[0].clientWidth;
		this.WORLD_HEIGHT = this.el[0].clientHeight;
	};

	Game.prototype.checkCollisionPlayerVSPlatform = function (playerpos) {
		for (var i=0; i<this.platforms.length; i++){
			if (playerpos.x + this.player.width >= this.platforms[i].upPlat.rect.x &&
				playerpos.y + this.player.height >= this.platforms[i].upPlat.rect.y &&
				playerpos.x <= this.platforms[i].upPlat.rect.x + this.platforms[i].upPlat.rect.width &&
				playerpos.y <= this.platforms[i].upPlat.rect.y + this.platforms[i].upPlat.rect.height) {
				return false;
			}
			else if (playerpos.x + this.player.width >= this.platforms[i].downPlat.rect.x &&
				playerpos.y + this.player.height >= this.platforms[i].downPlat.rect.y &&
				playerpos.x <= this.platforms[i].downPlat.rect.x + this.platforms[i].downPlat.rect.width &&
				playerpos.y <= this.platforms[i].downPlat.rect.y + this.platforms[i].downPlat.rect.height){
				return false;
			}
			else if (playerpos.x > this.platforms[i].upPlat.rect.x + this.platforms[i].upPlat.rect.width){
				this.platforms[i].upPlat.passed = true;
			}
		}
	};

	Game.prototype.checkForCheckPoint = function(playerpos) {
		for (var i=0; i < this.platforms.length; i++) {
			if (playerpos.x > this.platforms[i].upPlat.rect.x + this.platforms[i].upPlat.rect.width) {
				if (this.platforms[i].upPlat.passed !== true) {
					return true;
				}
			}
		}
	};

	Game.prototype.createWorld = function () {
		for (var i=0, bil=1000; i<50; i++, bil = bil + 1000){
			var percentage = (Math.random());

			var upP = new Platform({
				x: bil,
				y: -500 / (1 + percentage),
				width: 100, //* (1 + Math.random()*0.3),
				height: 400
			});

			var downP = new Platform({
				x: bil,
				y: 500 / (1 + (1-percentage) ),
				width: 100,
				height: 530
			});

			var platPair = {
				upPlat: upP,
				downPlat: downP
			};

			this.addPlatform(platPair);
		}
	};

	Game.prototype.addPlatform = function(platPair_) {
		this.platformsEl.append(platPair_.upPlat.el);
		this.platformsEl.append(platPair_.downPlat.el);
		this.platforms.push(platPair_);
	};

	Game.prototype.onFrame = function() {
		if (!this.isPlaying) {
			return;
		}

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
		}
		else if (playerX > maxX) {
			this.viewport.x = playerX + this.viewport.width - VIEWPORT_PADDING;
		}

	    this.worldEl.css({
			left: -this.viewport.x + 100,
			top: -this.viewport.y
	    });

		this.Scoreboard.css({
			left: +this.viewport.x + 300,
			top: +this.viewport.y + 100
		});

		this.ground.css({
			left: + this.viewport.x + 412,
			top: + this.viewport.y + 530
		});

		this.muteButton.css({
			left: + this.viewport.x - 90,
			top: + this.viewport.y + 5
		});

		this.playButton.css({
			left: + this.viewport.x - 90,
			top: + this.viewport.y + 40
		});
	};

	Game.prototype.start = function() {
		this.reset();

	    // Set the stage.
	    this.createWorld();
	  
	    this.player.reset();
	    this.viewport = {x: 0, y: 0, width: 0, height: 0};

		this.lastFrame = +new Date() / 1000;
		this.isPlaying = true;
		window.requestAnimationFrame(this.onFrame);
		
		var backgroundMusic = document.getElementById('backgroundMusicOn');
		backgroundMusic.play();
	};

	Game.prototype.reset = function() {

		for (var i=0; i<=this.platforms.length; i++)
		{
			this.platforms.pop();
		}

		this.player.reset();
	};

	Game.prototype.gameover = function() {
		this.isPlaying = false;
		if(this.isPlaying === false) {
		    var lostAudio = document.getElementById('gameLostAudio');
		    lostAudio.play();
		}
	
		var scoreboardEl = this.Scoreboard;
		scoreboardEl[0].childNodes[1].innerText = this.player.points;
		
		// Should be refactored into a Scoreboard class.
		var that = this;
	
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	return Game;
})();
