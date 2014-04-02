
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
    console.log('Starting game:');
    console.log(game);
    game.start();

    var muteAudio = function() {
		document.getElementById('backgroundMusicOn').setAttribute("muted","true");
		document.getElementById('gameOverAudio').setAttribute("muted","true");
		document.getElementById('jumpingAudio').setAttribute("muted","true");
	}
});
