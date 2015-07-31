{% macro render(url, aspect, classes) %}
	<div class="image image--{{ aspect }} {{ classes }}">
		{% if aspect == '4x3' %}
			<img alt="" class="image__item" src="{{ url|replace('{width}', 362) }}" data-template="{{ url }}" data-sizes="362x270 589x442 750x563 1500x1126">
		{% elif aspect == '16x9' %}
			<img alt="" class="image__item" src="{{ url|replace('{width}', 362) }}" data-template="{{ url }}" data-sizes="362x204 600x338 900x506 1500x844">
		{% endif %}
	</div>
{% endmacro %}