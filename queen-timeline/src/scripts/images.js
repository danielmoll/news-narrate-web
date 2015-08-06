(function () {
	'use strict';

	var exports = exports || {},
		retina = window.devicePixelRatio > 1, // Added this as a reminder as a way to check if high DPI.
		ResponsiveImage,
		pixelRatio = window.devicePixelRatio || 1,
		VIEWPORT_BUFFER_HEIGHT = 100,
		TRANSITIONS_SUPPORTED = ('ontransitionend' in window);

	ResponsiveImage = function(el, options) {
		var sizesToParse = el.getAttribute('data-sizes').split(' '),
			wideSizesToParse = (el.getAttribute('data-sizes-wide')) ? el.getAttribute('data-sizes-wide').split(' ') : [],
			dimensions,
			that = this;

		this.options = options;
		this.el = el;
		this.sizes = [];
		this.sizesWide = [];
		this.cloned = false;
		this.breakpoint = el.getAttribute('data-breakpoint') || 0;
		this.currentSize = {
			index: 0,
			width: 0
		};
		this.preload = el.classList.contains('image__item--preload');

		// Options defaults
		this.options.lazyLoad = (this.options.lazyLoad !== undefined) ? this.options.lazyLoad : true;

		this.hasApectRatioSwitch = (wideSizesToParse.length > 0);

		// Calculate available sizes for this image
		sizesToParse.forEach(function(size) {
			dimensions =  size.split('x');
			that.sizes.push({ w: dimensions[0], h: dimensions[1] });
			that.maxWidth = dimensions[0];
		});

		wideSizesToParse.forEach(function(size) {
			dimensions =  size.split('x');
			that.sizesWide.push({ w: dimensions[0], h: dimensions[1] });
		});

		this.setAspectRatio(this.sizes[0].w, this.sizes[0].h);

		this.currentSize.width = -1; // assume image is smallest width from the start
		this.currentSize.index = 0;

		if (!window.resize) {
			if (!window.deferredResizeSubscribers) window.deferredResizeSubscribers = [];
			window.deferredResizeSubscribers.push(this);
		}
		else {
			window.resize.subscribe(this);
		}
	};

	ResponsiveImage.prototype.resize = function() {
		var sizeToSet,
			renderedWidth,
			useWideAspect = false,
			sizesToCompare,
			stop = false;

		renderedWidth = Math.floor(this.el.clientWidth); // Current pixel width as scaled by the browser

		// Should now be using the wide sizes
		if (renderedWidth > this.breakpoint && this.hasApectRatioSwitch) {
			useWideAspect = true;
		}

		if (retina) renderedWidth *= pixelRatio;

		// Only continue if the image has scaled beyond its native resolution
		if (renderedWidth <= this.currentSize.width && !this.hasApectRatioSwitch) {
			return;
		}

		// Loop through the available sizes until hitting a size bigger than the image
		sizesToCompare = (useWideAspect) ? this.sizesWide : this.sizes;

		sizesToCompare.forEach(function(size) {
			if (!stop) sizeToSet = size;

			if (renderedWidth <= sizeToSet.w) {
				stop = true;
			}
		});

		this.setAspectRatio(sizeToSet.w, sizeToSet.h);

		// Don't load if image is out of view, or the size to set is the same as the current size (stops resetting of this.el.src on each resize)
		if (!this.preload && (this.isImageHidden(this.el) || sizeToSet.w === this.currentSize.width)) {
			return;
		}

		// Store the new width and aspect
		this.currentSize.width = sizeToSet.w;

		// Will only clone if transitionend event is supported
		if (!this.cloned && TRANSITIONS_SUPPORTED && this.options.lazyLoad) this.el = this.cloneAndReveal(this.el);

		this.el.src = this.el.getAttribute('data-template').replace('{width}', sizeToSet.w).replace('{height}', sizeToSet.h);

		// Has image reached its maximum width? If so, it no longer needs to listen to the resize event
		if (this.currentSize.width === this.maxWidth && !this.hasApectRatioSwitch) {
			window.resize && window.resize.unsubscribe(this);
		}
	};

	ResponsiveImage.prototype.isImageHidden = function(el) {
		var boundingRect = el.getBoundingClientRect();

		return boundingRect.top > window.innerHeight + VIEWPORT_BUFFER_HEIGHT ||
			boundingRect.bottom < - VIEWPORT_BUFFER_HEIGHT ||
			boundingRect.height === 0;
	};

	ResponsiveImage.prototype.cloneAndReveal = function(el) {
		var clone;

		this.cloned = true;
		clone = el.cloneNode();
		clone.className += ' image__item--hidden image__item--clone';
		this.placeholder = el;
		el.parentNode.appendChild(clone);
		el = clone;
		this.loadListener = this.handleCloneLoad.bind(this);
		el.addEventListener('load', this.loadListener, false);

		return el;
	};

	ResponsiveImage.prototype.handleCloneLoad = function() {
		this.el.removeEventListener('load', this.loadListener);
		delete this.loadListener;

		this.el.className = this.el.className.replace('image__item--hidden', '');
		
		this.transitionListener = this.removePlaceholder.bind(this);

		this.el.addEventListener('transitionend', this.transitionListener, false);
	};

	ResponsiveImage.prototype.removePlaceholder = function() {
		this.el.removeEventListener('transitionend', this.transitionListener);

		this.el.parentNode.removeChild(this.placeholder);

		delete this.placeholder;
	};

	ResponsiveImage.prototype.isWideAspect = function(width, height) {
		return Number((width / height).toFixed(1)) === 1.8 || Number((width / height).toFixed(1)) === 0.6;
	};

	ResponsiveImage.prototype.setAspectRatio = function(width, height) {
		var wideAspect = this.isWideAspect(width, height);

		if (wideAspect) {
			this.el.parentNode.className = this.el.parentNode.className
				.replace('image--4x3', 'image--16x9');
		}
		else {
			this.el.parentNode.className = this.el.parentNode.className
				.replace('image--16x9', 'image--4x3');
		}
	};

	exports.init = function() {
		var imageNodes = document.querySelectorAll('.image__item');

		for (var index = 0, numImages = imageNodes.length; index < numImages; index++) {
			exports.responsify(imageNodes[index]);
		}
	};

	exports.responsify = function (img, options) {
		var imageInstance = img._responsiveInstance;

		options = options || {};

		if (!imageInstance) {
			imageInstance = new exports.ResponsiveImage(img, options);
			imageInstance.resize();
			img._responsiveInstance = imageInstance;
		}
		return imageInstance;
	};

	exports.ResponsiveImage = ResponsiveImage;
	window.responsiveImages = exports;
}());