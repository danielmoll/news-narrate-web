{% import 'macros/image.swig' as image %}

<div class="hero">
	<div class="hero__media js-in-view">

		{{ image.render('http://res.cloudinary.com/skynews/image/upload/c_scale,w_{width}/v1437573838/narrate-people-smuggler/face1-16x9.jpg', '16x9') }}

		{{ image.render('http://res.cloudinary.com/skynews/image/upload/c_scale,w_{width}/v1437573841/narrate-people-smuggler/face2-16x9.jpg', '16x9', 'image--face-replace image--fade-in') }}

	</div>

	<div class="hero__content">
		<h1 class="hero__title"><span class="hero__title-bold">People Smuggler:</span><span class="hero__title-full-width">World&rsquo;s Most Wanted</span></h1>

		<div class="hero__text"><button class="button js-play-button button--play icon icon--play">Full documentary</button></div>
	</div>

	<div class="documentary js-documentary">
		<div class="video video--documentary">
			<video class="video__item js-documentary-video" src="http://video.news.sky.com/video/h264/vod/3000/2015/07/DIGI114937WEPEOPLESMUGGLERSWITHWARN1507221238383814375664169653000.mp4" controls></video>
		</div>
	</div>
</div>
