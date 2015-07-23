var playButton = document.querySelector('.js-play-button'),
	documentary = document.querySelector('.js-documentary'),
	video = document.querySelector('.js-documentary-video');

playButton.onclick = playVideo;

if (window.detect.touch) {
	video.src = 'http://video.news.sky.com/video/h264/vod/374/2015/07/DIGI114937WEPEOPLESMUGGLERSWITHWARN150722123838381437566416965374.mp4';
}

function playVideo(e) {
	documentary.classList.add('documentary--active');
	video.play();
	ga('send', 'event', 'smuggler-documentary', 'play');
}