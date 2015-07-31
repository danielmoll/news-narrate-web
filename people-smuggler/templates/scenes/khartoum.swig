{% extends '../layouts/scene.swig' %}

{% set backgroundImage = 'http://res.cloudinary.com/skynews/image/upload/c_scale,w_{width}/v1437575735/narrate-people-smuggler/digimap_khartoum3.jpg' %}
{% set sceneName = 'khartoum' %}
{% set classes = 'scene--1 js-in-view' %}
{% set title = 'Khartoum, Sudan' %}

{% block content %}

<div class="scene__inner">
	<div class="scene__media scene__media--left">
		<p class="scene__text">The start of many migrants’ journeys to Europe. A bustling metropolitan area of over five million people that is a magnet for refugees fleeing conflict in neighbouring countries. Many migrants meet their handlers at the Omdurman Market and negotiate a price for the first stage of their journey north. But for many, they'll never reach Europe.</p>
	</div>


	<div class="scene__media scene__media--left scene__media--clear">
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437487738/narrate-people-smuggler/NRCrawfordInteractiveKhartoum1507211042333914374719935313000.mp4" poster="http://res.cloudinary.com/skynews/image/upload/q_60/v1437560214/narrate-people-smuggler/poster-khartoum.jpg" controls></video>
			<div class="video__caption">Alex Crawford on the first steps migrants take on their journey from some of Africa's most troubled regions to Europe's land of opportunity.</div>
		</div>
	</div>
</div>
{% endblock %}