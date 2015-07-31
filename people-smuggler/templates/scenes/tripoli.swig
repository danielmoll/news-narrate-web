{% extends '../layouts/scene.swig' %}

{% set backgroundImage = 'http://res.cloudinary.com/skynews/image/upload/c_scale,w_{width}/v1437572062/narrate-people-smuggler/digimap_tripoli1.jpg' %}
{% set sceneName = 'tripoli' %}
{% set title ='Tripoli, Libya' %}
{% set leader ='2126 miles' %}
{% set classes = 'scene--4 js-in-view' %}

{% block content %}
<div class="scene__inner">
	<div class="scene__media scene__media--left">
		<p class="scene__text">Tripoli seems like any other city in the Middle East - a thriving, bustling home to millions of people. But it is a facade. A government unrecognised by the outside world is in charge and smugglers have a free rein in large areas of the city. They use dilapidated houses and old factories to store their cargo until passage can be arranged. The wait for the right sea conditions can take weeks. Sometimes though, the migrants who have travelled over 2,000 miles to get here are simply held until more money is wired to their smugglers.</p>
	</div>

	<div class="scene__media scene__media--left scene__media--clear">
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437490138/narrate-people-smuggler/NRCrawfordInteractiveTripoli1507211042334014374718507833000.mp4" poster="http://res.cloudinary.com/skynews/image/upload/q_35/v1437559728/narrate-people-smuggler/poster-tripoli.jpg" controls></video>
			<div class="video__caption">Tripoli may look safe, but hidden below its rooftops is a city in the grip of dangerous smugglers.</div>
		</div>
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437574677/NRINTERACTIVECLIPTRIPOLI1507220657095814375446839863000_o3ocij.mp4" poster="http://res.cloudinary.com/skynews/video/upload/v1437574677/NRINTERACTIVECLIPTRIPOLI1507220657095814375446839863000_o3ocij.jpg" controls></video>
			<div class="video__caption">People are held for months in tiny prisons, and they aren't happy to see their guards.</div>
		</div>
	</div>
</div>
{% endblock %}