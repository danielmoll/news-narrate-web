var playButton = document.querySelector('.js-play-button'),
	documentary = document.querySelector('.js-documentary'),
	video = document.querySelector('.js-documentary-video');

playButton.onclick = playVideo;

function playVideo(e) {
	documentary.classList.add('documentary--active');
	video.play();
}