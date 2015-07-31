{% extends '../layouts/scene.swig' %}

{% set classes = 'scene--video-background' %}
{% set backgroundVideo = 'http://res.cloudinary.com/skynews/video/upload/v1437551452/narrate-people-smuggler/Beach_loop_v4.mp4' %}
{% set backgroundVideoPoster = 'http://res.cloudinary.com/skynews/video/upload/v1437551452/narrate-people-smuggler/Beach_loop_v4.jpg' %}
{% set loop = true %}

{% block content %}

<div class="scene__overlay scene__overlay--bottom">
	<div class="scene__inner">
		<div class="scene__media scene__media--left">
			<p class="scene__text">Hundreds never make it - bodies wash up on the shore here, and the local cemetery is packed.</p>
		</div>
	</div>
</div>
{% endblock %}