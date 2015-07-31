{% macro render(items, label, alt) %}
<div class="segue segue--parallax js-in-view" aria-hidden="true">
	<ol class="parallax__list js-parallax">
		{% for item in items %}
			<li class="parallax__item">{{ item }}</li>
		{% endfor %}
	</ol>
	{% if label %}<div class="parallax__label">miles</div>{% endif %}
</div>

<div class="segue segue--no-parallax">
	<div class="segue__label">
		<div class="segue__label-content">
			<span class="segue__label-distance">{{ alt }}</span>
		</div>
	</div>
</div>
{% endmacro %}