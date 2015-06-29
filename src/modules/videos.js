import React from 'react';

class Videos extends React.Component {
    render () {

        var videoIds = this.props.data.ids,
            scenes = [];

        if(videoIds) {
            for (var id in videoIds) {

                var videoId = videoIds[id],
                    video = this.props.data.videos[videoId],
                    sceneVideo = [];

                if(video) {
                    sceneVideo.push(<img src={ video.thumbnail } />);
                    sceneVideo.push(<button className="video-play">play</button>);
                    sceneVideo.push(<span className="video-title">{ video.title }</span>);

                    scenes.push(<div className="cf video">{ sceneVideo }</div>);
                }
            }
        }

        return <div className="videos">{ scenes }</div>
    }
}

export default Videos;