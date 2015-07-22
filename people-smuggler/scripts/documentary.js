var playButton = document.querySelector('.js-play-button'),
	documentary = document.querySelector('.js-documentary'),
	video = document.querySelector('.js-documentary-video');

playButton.onclick = toggleVideo;

function toggleVideo(e) {
	documentary.classList.toggle('documentary--active');
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}