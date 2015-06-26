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
                    sceneVideo.push(<button className="video-play">play</button>);
                    sceneVideo.push(<span className="video-title">{ video.title }</span>);
                    sceneVideo.push(<span className="video-author">{ video.author }</span>);

                    scenes.push(<div className="cf video">{ sceneVideo }</div>);
                }
            }
        }

        return <div className="videos">{ scenes }</div>
    }
}

export default Videos;