{% extends '../layouts/scene.swig' %}

{% set classes = 'scene--video-background' %}
{% set backgroundVideo = 'http://res.cloudinary.com/skynews/video/upload/v1437551466/narrate-people-smuggler/Desert_loop_alternate_static_shot.mp4' %}
{% set backgroundVideoPoster = 'http://res.cloudinary.com/skynews/video/upload/v1437551466/narrate-people-smuggler/Desert_loop_alternate_static_shot.jpg' %}
{% set loop = true %}

{% block content %}

<div class="scene__overlay scene__overlay--bottom">
	<div class="scene__inner">
		<div class="scene__media scene__media--left">
			<p class="scene__text">Smugglers store supplies and weapons at hidden camps in the desert. The Libyan authorities will not take them on. Migrants say the Sahara Desert is like another sea they have to cross if they have any chance of reaching Europe.</p>
		</div>
	</div>
</div>
{% endblock %}