var playButton = document.querySelector('.js-play-button'),
	closeButton = document.querySelector('.js-button-close'),
	documentary = document.querySelector('.js-documentary'),
	video = document.querySelector('.js-documentary-video'),
	ACTIVE_CLASS = 'documentary--active';

playButton.onclick = playVideo;
closeButton.onclick = pauseVideo;

if (window.detect.touch) closeButton.style.display = 'none';

function playVideo(e) {
	if (!window.detect.touch) documentary.classList.add(ACTIVE_CLASS);
	video.play();
}

function pauseVideo(e) {
	if (!window.detect.touch) documentary.classList.remove(ACTIVE_CLASS);
	video.pause();
}