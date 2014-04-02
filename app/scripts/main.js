
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
    console.log('Starting game:');
    console.log(game);
    game.start();
});
