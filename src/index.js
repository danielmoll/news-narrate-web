import React from 'react';
import _ from 'lodash';

import Map from './modules/map'
import Interviews from './modules/interviews'
import Menu from './modules/menu'
import Timeline from './modules/timeline'

import scenesData from './data/scenes';
import interviewsData from './data/interviews';
import videosData from './data/videos';
import locationsData from './data/locations';

var defaultData = {
        scenes: scenesData,
        interviews: interviewsData,
        videos: videosData,
        locations: locationsData
    },
    dataSource = 'https://prod-narrate.firebaseio.com/london.json';

class Narrate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {route: window.location.hash.substr(1)}
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            });
        });

        $.get(dataSource, function(data) {
            console.log(data);
            // Those are placeholders in case the live data doesn't
            //   contain the right bits.
            // REMOVE FOR PROD!!!!
            if (!data.scenes) {
                data.scenes = scenesData;
            }
            if (!data.interviews) {
                data.interviews = interviewsData;
            }
            if (!data.videos) {
                data.videos = videosData;
            }
            if (!data.locations) {
                data.locations = locationsData;
            }

            this.setState({
                data: data
            });
        }.bind(this));
    }

    render() {
        var Content,
            route = this.state.route || '/timeline';

        switch(route) {
            case '/interviews':
                Content = Interviews;
                break;
            case '/map':
                Content = Map;
                break;
            case '/timeline':
                Content = Timeline;
                break;
            default:
                Content = Timeline;
        }

        return (
            <div>
                <div className="header">
                    <a href="/">go to...</a>
                </div>
                <Menu data={ route }></Menu>
                <Content data={ this.state.data }></Content>
            </div>
        );
    }

}


var mountNode = document.getElementById('narrate-app')

$(function(){
    React.render(
        <Narrate/>
        , mountNode);
});

