Game.State.PlayVideo = function(game) {};
Game.State.PlayVideo.prototype = {
    preload: function() {
        this.stage.backgroundColor = '#000000';
    },

    create: function() {
         var video = document.querySelector('.video');
         video.classList.add('show');
    }
};
