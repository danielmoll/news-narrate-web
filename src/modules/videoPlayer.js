import React from 'react';

var videoOptions = {
    src: "", //video url goes here
    type: "video/mp4" //video type here
}

class VideoPlayer extends React.Component {
    constructor() {
        super();
        this._handleClose = this._handleClose.bind(this);
        this._handleResize = this._handleResize.bind(this);
        this.initPlayerApi = this.initPlayerApi.bind(this);
        this.loadedMetaData = this.loadedMetaData.bind(this);

        this.state = {
                vidWidth: 0,
                api: undefined,
                duration: 0
            };
    }

    _handleResize() {

        var playerOverlay = $('.video-player__overlay'),
            player = $('.video-player__player'),
            playerWidth = $(window).width() * 0.8,
            playerHeight = $(window).height() * 0.7,
            marginTop = 0,
            marginLeft = 0,
            windowWidth = $(window).width();

        if(playerWidth > 700) {
            playerWidth = 700;
        }

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
    }

    _handleClose() {
        var player = $('.video-player__player').get(0);
        player.pause();

        $('.video-player').hide();
        $('body').css({ 'overflow': 'auto'});
    }

    initPlayerApi() {
        let player = this.refs.player.getDOMNode();
        player.addEventListener('loadedmetadata', this.loadedMetaData);
        this.setState({
            api: player
        });
    }

    loadedMetaData(event) {
        this.setState({
            duration: event.target.duration
        });
    }

    componentDidMount() {
        this._handleResize();
        this.initPlayerApi();
        window.addEventListener('resize', this._handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }

    adjustedVideoSource() {
        var src = videoOptions.src;
        var width = window.innerWidth;
        if (width > 1000) {
            return src;
        } else if (width > 600) {
            return src.replace('upload/','upload/c_scale,q_60,w_600/')
        } else {
            return src.replace('upload/','upload/c_scale,q_60,w_400/')
        }
    }

    render() {
        return (
            <div className='video-player' ref='master'>
                <div className='video-player__overlay' ref='overlay' onClick={this._handleClose}></div>
                <video ref="player" width={this.state.vidWidth} id='video-player' className="video-player__player" preload='metadata' controls>
                    <source src={this.adjustedVideoSource()} type={videoOptions.type} id="videoSource" />
                </video>
            </div>
        )
    }
}

export default VideoPlayer;