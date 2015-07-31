{% import 'macros/parallax.swig' as parallax %}

<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>People Smuggler: World's Most Wanted | Sky News</title>
		<meta name="description" content="A migrant's journey to Europe doesn't start at the Mediterranean. Take a look at their difficult route through desert, war and IS as they search for a better life.">
		<link href="css/main.css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<meta property="og:title" content="People Smuggler - World's Most Wanted | Sky News">
		<meta property="og:description" content="A migrant's journey to Europe doesn't start at the Mediterranean. Take a look at their difficult route through desert, war and IS as they search for a better life.">

		<meta property="og:url" content="http://narrate.news.sky.com/people-smuggler/">
		<meta property="og:image" content="http://res.cloudinary.com/skynews/image/upload/v1437641349/narrate-people-smuggler/people-smuggler-promo.jpg">

	    <link rel="shortcut icon" href="//news.sky.com/images/favicon.ico" type="image/x-icon">
	    <link rel="apple-touch-icon" href="//news.sky.com/images/f670e1be.sky-news-touch.png"><!-- 60x60 -->
	    <link rel="apple-touch-icon" sizes="76x76" href="//news.sky.com/images/1b5f54e3.sky-news-touch-ipad.png"><!-- 76x76 -->
	    <link rel="apple-touch-icon" sizes="120x120" href="//news.sky.com/images/74ebaccd.sky-news-touch-retina.png"><!-- 120x120 -->
	    <link rel="apple-touch-icon" sizes="152x152" href="//news.sky.com/images/61bf2734.sky-news-touch-retina-ipad.png"><!-- 152x152 -->
	</head>
	<body id="top">

		<!-- Website made *very quickly* with ❤ by:
			- Alex Bath
			- Daniel Moll
			- Daniel Forys
			- Mathieu Davy
			- James Wright
			- Salah Elsadek
			- Roland West
			- Laden Oksuzer
			- Shakir Khan
			- Oge Opara-Nadi
			- Noreen Hasan
		-->

		{% include "header.swig" %}	

		{% include "hero.swig" %}	
		
		<div class="scenes">

			<!-- 1. Introduction -->

			{% include "scenes/map.swig" %}

			{% include "partials/navigation.swig" %}

			<!-- 2. Khartoum -->

			{% include "scenes/khartoum.swig" %}

			{{ parallax.render([100, 200, 300, 400, 500, 600, 700, 800], 'miles', '876 miles') }}

			<!-- 3. Kufra -->

			{% include "scenes/kufra.swig" %}

			<!-- Video background -->

			{% include "scenes/kufra-video.swig" %}

			{{ parallax.render([900, 1000, 1100, 1200, 1300], 'miles', '1495 miles') }}

			<!-- 4. Benghazi -->

			{% include "scenes/benghazi.swig" %}

			<!-- Video background -->

			{% include "scenes/benghazi-video.swig" %}

			{{ parallax.render([1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100], 'miles', '2126 miles') }}

			<!-- 5. Tripoli -->

			{% include "scenes/tripoli.swig" %}
			
			{{ parallax.render([2100], 'miles', '2199 miles') }}

			<!-- 6. Zuwara -->

			{% include "scenes/zuwara.swig" %}
			

			<!-- Video background -->

			{% include "scenes/zuwara-video.swig" %}
			
			{{ parallax.render([2200, 2300], 'miles', '2379 miles') }}

			<!-- 7. Lampedusa -->

			{% include "scenes/lampedusa.swig" %}
			

		</div>

		<div class="footer">
			<p class="footer__text">&copy; Sky 2015</p>
		</div>

		<script src="scripts/bundle.js" async></script>

	    <script>
			window.googleAnalyticsAccount = 'UA-64699888-1';

			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', window.googleAnalyticsAccount, 'auto');
			ga('send', 'pageview');
	    </script>
	</body>
</html>