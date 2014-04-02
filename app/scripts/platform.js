window.Platform = (function(){
    'use strict';
    
    var Platform = function (rect){
        this.rect = rect;
        this.rect.right = rect.x + rect.width;

        this.el = $('<div class="platform">');
        this.el.css({
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height
        });
        this.pos = { x: 0, y: 0 };
        this.passed = false;
    };

    return Platform;

})();
