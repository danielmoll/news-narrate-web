{% import '../macros/image.swig' as image %}

<div class="scene scene--4x3 {{ classes }}">
	<a class="navigation__anchor" id="{{ sceneName }}"></a>
	<div class="scene__header">
		<div class="scene__inner">
			<h2 class="scene__title">{% block title %}Title required!{% endblock %}</h2>
			{% if leader %}<div class="scene__leader">{{ leader }}</div>{% endif %}
		</div>
	</div>
	{% if backgroundImageUrl %}
	<div class="scene__background">
		{% if backgroundImageUrl %}
			{{ image.render(backgroundImageUrl, '4x3') }}
		{% endif %}

		{% if backgroundVideoUrl %}
			<div class="image image--4x3">
				<video class="video__item js-video js-in-view" preload="none" src="{{ backgroundVideoUrl }}" poster="{{ backgroundVideoPosterUrl }}" loop muted></video>
			</div>
		{% endif %}

		{% if sceneName %}
			<div class="map__marker map__marker--{{ sceneName }}">
				<img class="map__marker-static" src="images/marker-1.png" alt="">
				<img class="map__marker-pulse" src="images/marker-2.png" alt="">
			</div>
		{% endif %}
		</div>
	{% endif %}
	{% block content %}{% endblock %}
</div>

