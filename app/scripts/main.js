
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
    console.log("elsk");
    console.log(game);
    game.start();
});
