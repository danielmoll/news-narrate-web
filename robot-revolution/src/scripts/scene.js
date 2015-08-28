'use strict';

var _ = require('lodash'),
	$ = require('jquery'),
	$timelineMarker = $('.js-timeline-marker'),
	$scenes = $('.js-scene'),
	exports = {},
	uniqGroups,
	Scene;

exports.uniqSceneGroups = function() {
	var sceneGroups = [];

	_.forEach($scenes, function(scene) {
		sceneGroups.push({
			name: $(scene).data('groupName')
		});
	});

	uniqGroups = _.uniq(sceneGroups, 'name');
};

Scene = function($el) {
	this.$scene = $el;
	this.groupName = this.$scene.data('groupName');
	this.groups = uniqGroups;
	this.groupIndex = _.findIndex(this.groups, { 'name': this.groupName });
	this.$scene[0]._onInView = this._onInView.bind(this);
};

Scene.prototype = {
	atFirst: function() {
		return this.groupIndex === 0;
	},

	atLast: function() {
		return (this.groups.length - 1) === this.groupIndex;
	},

	_onInView: function() {
		var groupIndex = this.groupIndex + 1;

		$timelineMarker.css({
			'left': 'calc(((100% / ' + this.groups.length + ') * ' + groupIndex + ') - (100% / ' + (this.groups.length * 2) + ') - ' + ($timelineMarker.width() / 2) + 'px)'
		});
	}
};

exports.init = function() {
	exports.uniqSceneGroups();

	_.forEach($scenes, function(scene) {
		return new Scene($(scene));
	});
};

module.exports = exports;


