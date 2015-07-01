import React from 'react';

class Videos extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = { showVideo: false };
    }

    handleClick(url, evt) {

        var playerContainer = $('.video-player').show(),
            playerOverlay = $('.video-player__overlay'),
            player = $('.video-player__player'),
            playerDom = player.get(0),
            playerWidth = $(window).width() * 0.8,
            marginTop = 0,
            marginLeft = 0,
            ua = navigator.userAgent,
            isAndroidMobile = ua.indexOf("android") > -1 && ua.indexOf("mobile"),
            windowWidth = $(window).width();

        $('body').css({ 'overflow': 'hidden'});

        this.playerContainer = playerContainer;

        if(playerWidth > 700) {
            playerWidth = 700;
        }

        player.find('#videoSource').attr('src', url);

        player.attr('width', playerWidth);

        marginLeft = ($(window).width() - playerWidth) / 2,
        marginTop = ($(window).height() - player.outerHeight()) / 2;

        player.css({
            'margin-left' : marginLeft,
            'margin-top' : marginTop,
            'left' : 0,
            'top' : 0
        });

        playerDom.addEventListener('webkitendfullscreen', this.onVideoEndsFullScreen.bind(this), false);

        player.bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
            var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen,
                event = state ? 'FullscreenOn' : 'FullscreenOff';

            // Now do something interesting
            alert('Event: ' + event);
        });

        playerDom.load();
        playerDom.play();

        if (isAndroidMobile && windowWidth < 850) {
            if (typeof(playerDom.webkitEnterFullscreen) != "undefined") {
                // This is for Android Stock.
                playerDom.webkitEnterFullscreen();

            } else if (typeof(playerDom.webkitRequestFullscreen)  != "undefined") {
                // This is for Chrome.
                playerDom.webkitRequestFullscreen();

            } else if (typeof(playerDom.mozRequestFullScreen)  != "undefined") {
                playerDom.mozRequestFullScreen();
            }
        }
    }

    onVideoEndsFullScreen() {
        this.playerContainer.hide();
    }

    render () {

        var videoIds = this.props.data.ids,
            videos = [],
            player = '';

        if(videoIds) {
            for (var id in videoIds) {

                var video = this.props.data.videos[id],
                    sceneVideo = [],
                    videoKey = 'video' + id;

                if(video) {
                    sceneVideo.push(<img src={ video.thumbnail } key={ videoKey + '_img' } />);
                    sceneVideo.push(<button className="video-play" onClick={this.handleClick.bind(null,video.url)} key={ videoKey + '_playbtn' } >play</button>);
                    sceneVideo.push(<span className="video-title" key={ videoKey + '_title' } >{ video.title }</span>);

                    videos.push(<div className="cf video" key={videoKey}>{ sceneVideo }</div>);
                }
            }
        }

        return (
            <div className="videos" key="videos">{ videos }</div>
        )
    }
}

export default Videos;