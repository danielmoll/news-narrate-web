{% import '../macros/image.swig' as image %}

<div class="scene scene--map scene--4x3">
	<div class="scene__background">
		{{ image.render('http://res.cloudinary.com/skynews/image/upload/c_scale,w_{width}/v1437399881/narrate-people-smuggler/map4x3.jpg', '4x3')}}
	</div>


	<div class="scene__overlay scene__overlay--bottom">
		<div class="scene__inner">
			<div class="scene__media scene__media--left">
				<p class="scene__text">Almost 150,000 migrants have crossed the Mediterranean into Europe in the first six months of 2015. The 180-mile journey from North Africa to one of Europe's southernmost points claims thousands of lives every year, but for the migrants braving the Mediterranean, it is the final leg of a long, dangerous and expensive journey. Take a look at that journey by following this interactive route from the centre of Sudan to one of the many entrances to Europe dotted along the region's southern coast.</p>
			</div>
		</div>
	</div>

	<div class="map-overlay">
		<ol class="">
			<li class="map-overlay__item map-overlay__item--khartoum"><a class="map-overlay__link js-in-view" href="#khartoum">Khartoum</a></li>
			<li class="map-overlay__item map-overlay__item--kufra"><a class="map-overlay__link js-in-view" href="#kufra">Kufra</a></li>
			<li class="map-overlay__item map-overlay__item--benghazi"><a class="map-overlay__link js-in-view" href="#benghazi">Benghazi</a></li>
			<li class="map-overlay__item map-overlay__item--tripoli"><a class="map-overlay__link js-in-view" href="#tripoli">Tripoli</a></li>
			<li class="map-overlay__item map-overlay__item--zuwara"><a class="map-overlay__link js-in-view" href="#zuwara">Zuwara</a></li>
			<li class="map-overlay__item map-overlay__item--lampedusa"><a class="map-overlay__link js-in-view" href="#lampedusa">Lampedusa</a></li>
		</ol>
	</div>
</div>