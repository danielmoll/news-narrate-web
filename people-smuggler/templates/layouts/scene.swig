{% import '../macros/image.swig' as image %}

<div class="scene scene--4x3 {{ classes }}">
	<a class="navigation__anchor" id="{{ sceneName }}"></a>
	{% if title %} 
	<div class="scene__header">
		<div class="scene__inner">
			<h2 class="scene__title">{{ title }}</h2>
			{% if leader %}<div class="scene__leader">{{ leader }}</div>{% endif %}
		</div>
	</div>
	{% endif %}
	{% if backgroundImage or backgroundVideo %}
	<div class="scene__background">
		{% if backgroundImage %}
			{{ image.render(backgroundImage, '4x3') }}
		{% endif %}

		{% if backgroundVideo %}
			<div class="image image--4x3">
				<video class="video__item js-video js-in-view" preload="none" src="{{ backgroundVideo }}" poster="{{ backgroundVideoPoster }}" {% if loop %}loop{% endif %} muted></video>
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

