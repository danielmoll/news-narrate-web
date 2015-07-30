{% extends '../layouts/scene.swig' %}

{% set backgroundImageUrl = 'http://res.cloudinary.com/skynews/image/upload/c_scale,w_{width}/v1437572062/narrate-people-smuggler/digimap_kufra1.jpg' %}
{% set sceneName = 'kufra' %}

{% block title %}Kufra, Libya{% endblock %}
{% block leader %}876 miles{% endblock %}

{% block content %}

<div class="scene__inner">
	<div class="scene__media scene__media--left">
		<p class="scene__text">Kufra was for centuries a staging post on slave routes. Today it is the entry point for all sorts of contraband into Libya. Locals have tried to prevent illicit trade into the town with The Great Wall Of Kufra, which stretches 150km around the town. It struggles to stop the flow of people north with the harsh reality of Saharan sand and the well-equipped smugglers easily rendering it useless.</p>
	</div>

	<div class="scene__media scene__media--left scene__media--clear">
		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437488263/narrate-people-smuggler/NRCrawfordInteractiveKufra1507211042333014374718683353000.mp4" poster="http://res.cloudinary.com/skynews/video/upload/v1437574676/NRINTERACTIVECLIPKUFRA1507220657098514375446716733000_eyuebi.jpg" controls></video>
			<div class="video__caption">How is an ancient stop on Africa's trading routes now under the control of people smugglers?</div>
		</div>

		<div class="video">
			<video class="video__item" preload="none" src="http://res.cloudinary.com/skynews/video/upload/v1437574676/NRINTERACTIVECLIPKUFRA1507220657098514375446716733000_eyuebi.mp4" poster="http://res.cloudinary.com/skynews/image/upload/q_35/v1437559729/narrate-people-smuggler/poster-kufra.jpg" controls></video>
			<div class="video__caption">These women have paid thousands of dollars to cross the Sahara, but are now stuck in Kufra.</div>
		</div>
	</div>

	<div class="scene__spacer"></div>
</div>
{% endblock %}