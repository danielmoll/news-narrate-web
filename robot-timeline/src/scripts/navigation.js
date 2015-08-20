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

    this.$navigation.find('.navigation__link').on('click', function() {
        $('.background').attr('class', 'background background--'+ $(this).data('channel'));
        $('.scenes').attr('class', 'scenes scenes--'+ $(this).data('channel'));
        return false;
    });
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
    }
};

exports.init = function() {
    _.forEach($navigation, function(nav) {
        return new Navigation($(nav));
    });
};

module.exports = exports;
