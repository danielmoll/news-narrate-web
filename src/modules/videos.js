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
            playerHeight = $(window).height() * 0.7,
            marginTop = 0,
            marginLeft = 0,
            windowWidth = $(window).width();

        $('body').css({ 'overflow': 'hidden'});

        this.playerContainer = playerContainer;

        if(playerWidth > 700) {
            playerWidth = 700;
        }

        player.find('#videoSource').attr('src', url);

        player.removeAttr('height');
        player.attr('width', playerWidth);

        if(player.outerHeight() > playerHeight ) {
            player.removeAttr('width');
            player.attr('height', playerHeight);
            playerWidth = player.outerWidth();

        } else {
            playerHeight = player.outerHeight();
        }

        marginLeft = ($(window).width() - playerWidth) / 2,
        marginTop = ($(window).height() - playerHeight) / 2;

        player.css({
            'margin-left' : marginLeft,
            'margin-top' : marginTop
        });

        playerDom.addEventListener('webkitendfullscreen', this.onVideoEndsFullScreen.bind(this), false);

        playerDom.load();
        playerDom.play();
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
                    sceneVideo.push(<div className="videos__thumbnail-wrapper" key={ videoKey + '_img-wapper' }><img className="videos__thumbnail" src={ video.thumbnail } key={ videoKey + '_img' } /></div>);
                    sceneVideo.push(<span className="videos__title" key={ videoKey + '_title' } >{ video.title }</span>);
                    sceneVideo.push(<div className="videos__play-button-wrapper" key={ videoKey + '_button-wrapper' }><button className="videos__play-button" onClick={this.handleClick.bind(null,video.url)} key={ videoKey + '_playbtn' } >play</button></div>);

                    videos.push(<div className="videos__video" key={videoKey}>{ sceneVideo }</div>);
                }
            }
        }

        return (
            <div className="videos" key="videos">{ videos }</div>
        )
    }
}

export default Videos;