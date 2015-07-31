{% extends '../layouts/scene.swig' %}

{% set classes = 'scene--video-background' %}
{% set backgroundVideo = 'http://res.cloudinary.com/skynews/video/upload/v1437551479/narrate-people-smuggler/Guns_Loop_v1.mp4' %}
{% set backgroundVideoPoster = 'http://res.cloudinary.com/skynews/video/upload/v1437551479/narrate-people-smuggler/Guns_Loop_v1.jpg' %}

{% block content %}

<div class="scene__overlay scene__overlay--bottom">
	<div class="scene__inner">
		<div class="scene__media scene__media--left">
			<p class="scene__text">The fighting provides the perfect anarchic conditions for people-smuggling gangs to thrive.</p>
		</div>
	</div>
</div>
{% endblock %}