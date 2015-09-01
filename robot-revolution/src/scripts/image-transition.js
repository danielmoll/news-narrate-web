'use strict';

exports.imageTransitionHandler = function() {
  var scrollTop = (window.pageYOffset !== undefined) ?
    window.pageYOffset :
    (document.documentElement || document.body.parentNode || document.body).scrollTop;

  var imagesToTransition= document.getElementsByClassName('image-transition-top');
  for (var i=0; i<imagesToTransition.length; i++) {
    var image = imagesToTransition[i];
    var bound = image.getBoundingClientRect();
    var pixUntilVisible = bound.top / 2;
    var opacity = (pixUntilVisible / 100) / 2;
    image.style.opacity = opacity;
  }
}

exports.init = function() {
  if (window.addEventListener) {
    window.addEventListener('scroll', exports.imageTransitionHandler, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', exports.imageTransitionHandler);
  }
};

module.exports = exports;


