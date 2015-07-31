{% extends '../layouts/scene.swig' %}

{% set backgroundImage = 'http://res.cloudinary.com/skynews/image/upload/c_scale,w_{width}/v1437572062/narrate-people-smuggler/digimap_lampedusa.jpg' %}
{% set sceneName = 'lampedusa' %}
{% set title ='Lampedusa, Italy' %}
{% set leader ='2379 miles' %}
{% set classes = 'scene--6 js-in-view' %}

{% block content %}
<div class="scene__inner">
	<div class="scene__media scene__media--left">
		<p class="scene__text">For the migrants who make it to Lampedusa, the journey is simply half-done. They may encounter some smiling faces for the first time in weeks as medics and aid workers help them from the boat, but they now have to reach mainland Europe. They are exhausted and terrified, but for many the dream of a life in the comfort of northern Europe's major cities will spur them on to face another dangerous journey.</p>
	</div>

	<div class="scene__media scene__media--left scene__media--clear">
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437490954/narrate-people-smuggler/NRCrawfordInteractiveLampedusa1507211042334314374718383353000.mp4" poster="http://res.cloudinary.com/skynews/image/upload/q_35/v1437559729/narrate-people-smuggler/poster-lampedusa.jpg" controls></video>
			<div class="video__caption">Setting foot on European soil may feel like the end of their journey, but smuggled migrants rapidly discover they are simply at the start of another difficult battle to get into Europe.</div>
		</div>
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437574676/NRINTERACTIVECLIPLAMPEDUSA1507220657097914375446596433000_m65vwy.mp4" poster="http://res.cloudinary.com/skynews/video/upload/v1437574676/NRINTERACTIVECLIPLAMPEDUSA1507220657097914375446596433000_m65vwy.jpg" controls></video>
			<div class="video__caption">For those tasked with helping forlorn migrants arriving in Europe, the reality of people smuggling can be tough to cope with.</div>
		</div>
	</div>
</div>
{% endblock %}