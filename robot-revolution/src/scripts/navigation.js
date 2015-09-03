'use strict';

var _ = require('lodash'),
    $ = require('jquery'),
    Navigation,
    exports = {},
    $window = $(window),
    $navigation = $('.js-navigation'),
    STICKY = 'navigation--sticky';

Navigation = function($navigation) {
    this.$navigation = $navigation;
    this.navigationHeight = this.$navigation.outerHeight();
    this.navigationTop = this.$navigation.offset().top;
    this.events();
};

Navigation.prototype = {
    isSticky: function() {
        return $window.scrollTop() > this.navigationTop;
    },

    handleSticky: function() {
        if (this.isSticky()) {
            this.$navigation.addClass(STICKY);
            this.$navigation.parent().css({
                height: this.navigationHeight + 'px'
            });
        } else {
            this.$navigation.removeClass(STICKY);
            this.$navigation.parent().css({
                height: 'auto'
            });
        }
    },

    events: function() {
        $window.on('scroll resize', this.handleSticky.bind(this));

        this.handleSticky();
        this.handleScenes();
    },


    handleScenes: function() {
        var scenes = document.querySelectorAll('.scene'),
            linkItems = document.querySelectorAll('.navigation__link');

        _.forEach(scenes, function(scene) {
            var scene_anchor = scene.querySelector('.scene__anchor');
            
            if (scene_anchor && scene_anchor.hasAttribute('data-menuid')) {
                var menuid = scene_anchor.getAttribute('data-menuid'),
                    menuItem = document.querySelector('.navigation__link--' + menuid);
                
                scene._onInView = function() {                    
                    _.forEach(linkItems, function(item) {
                        item.classList.remove('navigation__link--active');
                    });

                    menuItem.classList.add('navigation__link--active');
                };
            }
        });
    }
};

exports.init = function() {
    // if (window.detect.touch) return;

    _.forEach($navigation, function(nav) {
        return new Navigation($(nav));
    });
};

module.exports = exports;
