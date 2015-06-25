import React from 'react';

class Videos extends React.Component {
    render () {
        var output = '';

        if(this.props.videos) {

        }

        return <div className="scene__videos">
            <div className="cf scene__video">
                <img src="http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg" />
                <button className="scene__video-play">play</button>
                <span className="scene__video-title">I was there, I have seen the results of the bombs!</span>
                <span className="scene__video-author">Scott Kelly</span>
            </div>
            <div className="cf scene__video">
                <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/000/264/3ed/0f9aedd.jpg" />
                <button className="scene__video-play">play</button>
                <span className="scene__video-title">Everybody was running around and screaming!</span>
                <span className="scene__video-author">Scott Kelly</span>
            </div>
        </div>
    }
}

export default Videos;