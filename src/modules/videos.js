import React from 'react';

import videosData from '../data/videos';

class Videos extends React.Component {
    render () {
        var videos = this.props.data.videos,
            scenes = [];

        if(videos) {
            for (var idx in videos) {

                var videoId = videos[idx],
                    video = videosData[videoId],
                    sceneVideo = [];

                if(video) {
                    sceneVideo.push(<img src={ video.thumbnail } />);
                    sceneVideo.push(<button className="scene__video-play">play</button>);
                    sceneVideo.push(<span className="scene__video-title">{ video.title }</span>);
                    sceneVideo.push(<span className="scene__video-author">{ video.author }</span>);

                    scenes.push(<div className="cf scene__video">{ sceneVideo }</div>);
                }
            }
        }

        return <div className="scene__videos">{ scenes }</div>
    }
}

export default Videos;