{% extends '../layouts/scene.swig' %}

{% set backgroundImage = 'http://res.cloudinary.com/skynews/image/upload/c_scale,w_{width}/v1437572062/narrate-people-smuggler/digimap_zuwara1.jpg' %}
{% set sceneName = 'zuwara' %}
{% set title ='Zuwara, Libya' %}
{% set leader ='2199 miles' %}
{% set classes = 'scene--5 js-in-view' %}

{% block content %}
<div class="scene__inner">
	<div class="scene__media scene__media--left">
		<p class="scene__text">It should only take a few hours to get to Europe from Zuwara. A good boat could make the journey in a single sunny Mediterranean afternoon. But the migrants desperate to cross to southern Europe face an arduous trip in rickety old boats that the smugglers can afford to lose. They are packed on board, with those who pay the least being locked in the hold. Thousands leave Zuwara for Europe, but hundreds never get there.</p>
	</div>

	<div class="scene__media scene__media--left scene__media--clear">
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437490633/narrate-people-smuggler/NRCrawfordInteractiveZuwara1507211042336114374718347433000.mp4" poster="http://res.cloudinary.com/skynews/image/upload/q_35/v1437559730/narrate-people-smuggler/poster-zuwara.jpg" controls></video>
			<div class="video__caption">It may be closer than ever but there is still one deadly step on the journey to Europe.</div>
		</div>
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437574677/NRINTERACTIVECLIPZUWARA1507220657067514375447524013000_mwetti.mp4" poster="http://res.cloudinary.com/skynews/image/upload/v1437575549/narrate-people-smuggler/cegrab_20150722_152927_536.jpg" controls></video>
			<div class="video__caption">Migrants are kept in back-street safe houses before handing over their final dollars to smugglers who send them to Europe from a local beach.</div>
		</div>
	</div>
</div>
{% endblock %}