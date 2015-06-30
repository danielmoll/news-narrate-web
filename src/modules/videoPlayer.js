import React from 'react';

var videoOptions = {
    src: "http://video-js.zencoder.com/oceans-clip.mp4", //video url goes here
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
            marginTop = 0,
            marginLeft = 0;

        if(playerWidth > 700) {
            playerWidth = 700;
        }

        player.attr('width', playerWidth);

        marginLeft = ($(window).width() - playerWidth) / 2,
        marginTop = ($(window).height() - player.outerHeight()) / 2;

        player.css({
            'margin-left' : marginLeft,
            'margin-top' : marginTop,
            'left' : 0,
            'top' : 0
        });
    }

    _handleClose() {
        var player = $('.video-player__player').get(0);
        player.pause();

        $('.video-player').hide();
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

    render() {
        return (
            <div className='video-player' ref='master'>
                <div className='video-player__overlay' ref='overlay' ></div>
                <button className="video-player__close" ref="close" onClick={this._handleClose}>close</button>
                <video ref="player" width={this.state.vidWidth} id='video-player' className="video-player__player" preload='metadata' controls>
                    <source src={videoOptions.src} type={videoOptions.type} id="videoSource" />
                </video>
            </div>
        )
    }
}

export default VideoPlayer;