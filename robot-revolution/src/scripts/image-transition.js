'use strict';

exports.imageTransitionHandler = function() {
    var imagesToTransition,
        pixUntilVisible,
        imageBounds,
        opacity,
        image,
        i;

    imagesToTransition = document.getElementsByClassName('image-transition-top');

    for (i = 0; i < imagesToTransition.length; i++) {

        image = imagesToTransition[i];
        imageBounds = image.getBoundingClientRect();
        pixUntilVisible = (imageBounds.top / 2) - 50;

        if (i === imagesToTransition.length - 2) {
            pixUntilVisible = imageBounds.top - (window.innerHeight - (window.innerHeight > 600 ? 700 : 400));
        }

        if (i === imagesToTransition.length - 1) {
            pixUntilVisible = imageBounds.top - (window.innerHeight - 400);
        }

        opacity = (pixUntilVisible / 100) / 2;
        image.style.opacity = opacity;
    }
};

exports.init = function() {
    if (window.addEventListener) {
        window.addEventListener('scroll', exports.imageTransitionHandler, false);

    } else if (window.attachEvent) {
        window.attachEvent('onscroll', exports.imageTransitionHandler);
    }
};

module.exports = exports;