window.Obstacle = (function() {

	var INITIAL_POSITION_X = 60;
	var INITIAL_POSITION_Y = 25;

	var Obstacle = function(el, game){
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0};
	};

	Obstacle.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	return Obstacle; // Bradum returnum vid array af obstacles eda e-h
})();