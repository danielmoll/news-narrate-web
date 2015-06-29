import React from 'react';

class Videos extends React.Component {
    render () {

        var videoIds = this.props.data.ids,
            scenes = [];

        if(videoIds) {
            for (var id in videoIds) {

                var video = this.props.data.videos[id],
                    sceneVideo = [],
                    videoKey = 'video' + id;

                if(video) {
                    sceneVideo.push(<img src={ video.thumbnail } key={ videoKey + '_img' } />);
                    sceneVideo.push(<button className="video-play" key={ videoKey + '_playbtn' } >play</button>);
                    sceneVideo.push(<span className="video-title" key={ videoKey + '_title' } >{ video.title }</span>);

                    scenes.push(<div className="cf video" key={videoKey}>{ sceneVideo }</div>);
                }
            }
        }

        return ( <div className="videos" key="videos">{ scenes }</div> );
    }
}

export default Videos;