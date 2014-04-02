window.Controls = (function() {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function() {
        this._didJump = false;
        this.freeFalling = false;
        this.keys = {};
        //var muteAudio = false;
        //muteAudio = document.getElementById("muteAudio");
        $(window)
            .on('keydown', this._onKeyDown.bind(this))
            .on('keyup', this._onKeyUp.bind(this))
            .on('mousedown', this._onmousedown.bind(this))
            .on('mouseup', this._onmouseup.bind(this));
    };

    Controls.prototype._onmousedown = function(e) {
        this._didJump = true;

        if(this._didJump === true) {
            var jumpAudio = document.getElementById('jumpingAudio');
            jumpAudio.play();
        }
        return true;
    };

    Controls.prototype._onmouseup = function(e) {
        if (this._didJump) {
            this._didJump = false;
            this.freeFalling = true;
        }
    };

    Controls.prototype._onKeyDown = function(e) {
        // Only jump if space wasn't pressed.
        if (e.keyCode === 32 && !this.keys.space) {
            this._didJump = true;

            if(this._didJump === true) {
                var jumpAudio = document.getElementById('jumpingAudio');
                jumpAudio.play();
            }
        }

        // Remember that this button is down.
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = true;
            return false;
        }
    };

    Controls.prototype._onKeyUp = function(e) {
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];

            if (this._didJump) {
                this._didJump = false;
                this.freeFalling = true;
            }

            this.keys[keyName] = false;
            return false;
        }
    };

    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };

    Controls.prototype.isFreeFalling = function() {
        var answer = this.freeFalling;
        return answer;
    };
    
    // Export singleton.
    return new Controls();
})();
