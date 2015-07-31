{% extends '../layouts/scene.swig' %}

{% set backgroundImage = 'http://res.cloudinary.com/skynews/image/upload/c_scale,w_{width}/v1437572061/narrate-people-smuggler/digimap_benghazi.jpg' %}
{% set sceneName = 'benghazi' %}
{% set title ='Benghazi, Libya' %}
{% set leader ='1495 miles' %}
{% set classes = 'scene--3 js-in-view' %}

{% block content %}
<div class="scene__inner">
	<div class="scene__media scene__media--left">
		<p class="scene__text">Libya's second city is the frontline of the country's civil war. Fighters from the National Army and the internationally-recognised Tobruk government clash with Islamic State fighters trying to spread the group's poisonous message across the Middle East. The dangerous conditions don't hinder the smugglers from moving men, women and children through the city.</p>
	</div>

	<div class="scene__media scene__media--left scene__media--clear">
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437489746/narrate-people-smuggler/NRCrawfordInteractiveBENGHAZI1507211042332914374719754723000.mp4" poster="http://res.cloudinary.com/skynews/image/upload/q_35/v1437559728/narrate-people-smuggler/poster-benghazi.jpg" controls></video>
			<div class="video__caption">Having been herded across deserts like human cattle, migrants now face being caught up in a civil war.</div>
		</div>
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437574676/NRINTERACTIVECLIPBENGHAZI1507220657098814375446787163000_cn35fw.mp4" poster="http://res.cloudinary.com/skynews/video/upload/v1437574676/NRINTERACTIVECLIPBENGHAZI1507220657098814375446787163000_cn35fw.jpg" controls></video>
			<div class="video__caption">The threat from the Islamic State is clear in Benghazi.</div>
		</div>
	</div>
</div>
{% endblock %}