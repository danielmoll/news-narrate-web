{% import 'image.swig' as image %}

{% macro start(backgroundImageUrl, classes) %}
<div class="scene scene--4x3 {{ classes }}">
			<div class="scene__background">
				{{ image.render(backgroundImageUrl, '4x3') }}
			</div>
{% endmacro %}


{% macro end() %}
</div>
{% endmacro %}