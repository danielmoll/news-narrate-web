// Format:
/*

"colin": {
    "name": "Colin Pettet",
    "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1435847053/Colin-Pettet_iyxfwu.jpg",
    "frame": "http://news.carrentals.co.uk/wp-content/uploads/2012/04/Passengers-Wait-for-Tube-Train.jpg",
    "title": "I Was Expecting To Die",
    "url": "http://res.cloudinary.com/skynews/video/upload/v1435586047/narrate/london-bombing-7-7/colin.mp4"
}

*/

var videos = {
    "hungary": {
        "name": "Desperate Man's Rail Track Protest",
        "thumbnail": "https://res.cloudinary.com/skynews/image/upload/v1442832005/desperate-man_x4ip1i.jpg",
        "title": "Protests In Hungary Over Camp Fears",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI115936TH030915MIGRANTSONTRACKP150903120450081441278340587374.mp4"
    },
    "through-a-lens": {
        "name": "Picture By Picture",
        "thumbnail": "",
        "title": "Sky's Harriet Hadfield's Journey",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI163853WEHADFIELDSTILLSJOURNEYEUROPE1442418318954374.mp4"
    },
    "greece": {
        "name": "People Smuggler",
        "thumbnail": "https://res.cloudinary.com/skynews/image/upload/v1442832005/_people-smuggler_tu22wk.jpg",
        "title": "\"It's A Miracle When They Get To Europe\"",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI111505FRBOATSMUGGLINGCRAWFORD12150911112830871441967680271374.mp4"
    },
    "macedonia": {
        "name": "Record Number Cross Border",
        "thumbnail": "https://res.cloudinary.com/skynews/image/upload/v1442832005/record-number-cross-borde_u7r0os.jpg",
        "title": "Refugees Stream Across Southern Europe",
        "url": "http://video.news.sky.com/video/h264/vod/700/2015/09/DIGI052603SAMIGRATIONCRISISRAMSAY06150912053527671442032646175700.mp4"
    },
    "hungary-born-on-the-border": {
        "name": "Born On The Border",
        "thumbnail": "https://res.cloudinary.com/skynews/image/upload/v1442832005/_born-on-the-borde_ne5zmr.jpg",
        "title": "Sky's Alex Rossi Meets Baby Just Days Old ",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/APPLE150915TUROSSIBORDERASLIVE0900150915093448281442306187616374.mp4"
    },
    "hungary-please-take-my-daughter": {
        "name": "Take My Kid",
        "thumbnail": "https://res.cloudinary.com/skynews/image/upload/v1442832005/_take-my-kid_ap6tmi.jpg",
        "title": "Teacher Wants Her Daughter Taken To Safety",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI061543WE160915ROSSIMIGRANTMOTHE150916062352301442381182410374.mp4"
    },
    "hungary-tear-gas": {
        "name": "In The Thick Of It",
        "thumbnail": "https://res.cloudinary.com/skynews/image/upload/v1442832005/in-the-thick-of-it_jk5izi.jpg",
        "title": "Sky's Colin Brazier On Chaos And Clashes",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI180402WEHUNGARYMIGRANTSGASBRAZI150916181103151442423543920374.mp4"
    },
    // Interviews
    "andrew-wilson": {
        "name": "Sky's Andrew Wilson",
        "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1442580129/migration-crisis/thumbnails/andrew-wilson.jpg",
        "title": "Destination Europe",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/08/DIGI071502THMIGRANTSWILSON0700150827071624211440656244621374.mp4"
    },
    "mustafa": {
        "name": "Mustafa",
        "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1442580137/migration-crisis/thumbnails/mustafa.jpg",
        "title": "\"My home was destroyed\"",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI131904WEMIGRATIONSTORIESMUSTAFAIV1442418675546374.mp4"
    },
    "fadi": {
        "name": "Fadi",
        "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1442580133/migration-crisis/thumbnails/fadi.jpg",
        "title": "\"Anywhere I can find a home\"",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI131811WEMIGRATIONSTORIESFADIIV1442418963852374.mp4"
    },
    "ahmed": {
        "name": "Ahmed",
        "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1442580126/migration-crisis/thumbnails/ahmed.jpg",
        "title": "\"Slept in the street for days\"",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI131933WEMIGRATIONSTORIESAHMEDIV1442418519663374.mp4"
    },
    "raafat": {
        "name": "Raafat",
        "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1442580144/migration-crisis/thumbnails/raafat.jpg",
        "title": "\"Returning home, but not now\"",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI131952WEMIGRATIONSTORIESRAAFATIV1442418765696374.mp4"
    },
    "harriet-hadfield": {
        "name": "Sky’s Harriet Hadfield",
        "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1442580156/migration-crisis/thumbnails/sky-harriet-hadfield.jpg",
        "title": "\"My journey through Europe\"",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI163853WEHADFIELDSTILLSJOURNEYEUROPE1442418318954374.mp4"
    },
    "alex-rossi": {
        "name": "Sky’s Alex Rossi",
        "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1442580151/migration-crisis/thumbnails/sky-alex-rossi.jpg",
        "title": "\"Please take my daughter to safety\"",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI061543WE160915ROSSIMIGRANTMOTHE150916062352301442381182410374.mp4"
    },
    "alex-crawford": {
        "name": "Sky’s Alex Crawford",
        "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1442580148/migration-crisis/thumbnails/sky-alex-crawford.jpg",
        "title": "Journey on a dinghy",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI183409FRMIGRATIONCRAWFORDBRAZIER150911183904671441993324402374.mp4"
    },
    "alex-crawford-people-smuggler": {
        "name": "People Smuggler",
        "thumbnail": "http://res.cloudinary.com/skynews/image/upload/v1442580141/migration-crisis/thumbnails/people-smuggler.jpg",
        "title": "\"I give refugees a new life\"",
        "url": "http://video.news.sky.com/video/h264/vod/374/2015/09/DIGI112851FR110915CRAWFORDMIGRANTSP150911113210491441967557912374.mp4"
    },
};


export default videos;
