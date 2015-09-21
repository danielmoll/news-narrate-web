import React from 'react';
import _ from 'lodash';
import DocumentMeta from 'react-document-meta';

import Map from './modules/map'
import Interviews from './modules/interviews'
import Menu from './modules/menu'
import Timeline from './modules/timeline'
import VideoPlayer from './modules/videoPlayer';
import Share from './modules/share'

import videoData from './data/videos';
import interviewData from './data/interviews';
import mapData from './data/map';
import scenesData from './data/scenes'

//var dataSource = 'https://crossing-borders.firebaseio.com/timeline.json';

class Narrate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1)
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            });

            window.scrollTo(0,0);
        });

        var data = {};

        var unsortedScenes = scenesData.scenes;
        var sortedScenes = [];

        _.forEach(unsortedScenes, function(s, k) {
            s._id = k;
        });

        sortedScenes = _.sortBy(unsortedScenes, function(s) {
            return new Date(s.time).getTime();
        })

        data.scenes = sortedScenes;
        data.interviews = interviewData;
        data.videos = videoData;
        data.locations = mapData.locations;

        this.setState({
            data: data
        });
    }

    getTemplate(route) {
        var view = {};

        switch(true) {
            case /\/timeline/.test(route):
                view.module = Timeline;
                break;
            case /\/map/.test(route):
                view.module = Map;
                break;
            case /\/interviews\/.+/.test(route):
                view.module = Interviews;
                var regexp = /interviews\/(.+)/g;
                view.id = regexp.exec(route)[1];
                break;
            case /\/interviews/.test(route):
                view.module = Interviews;
                break;
            default:
                view.module = Timeline;
        }

        return view;
    }

    render() {
        var route = this.state.route || '/timeline',
            template = this.getTemplate(route),
            Content = template.module,
            id = template.id || 'all',
            pageTitle = 'Migration Crisis';


        const metaData = {
            title: pageTitle,
            canonical: 'http://narrate.news.sky.com/migration-crisis'
        };

        return (
            <div>
                <DocumentMeta {...metaData} />
                <div className="header">
                    <div className="header__content">
                        <a className="header__logo" href="http://news.sky.com/">go to...</a>
                        <Share data={ {classNames:'share__list--right'} }/>
                        <Menu data={ route }></Menu>
                    </div>
                </div>


                <Content data={ this.state.data } id={ id }></Content>
                <VideoPlayer></VideoPlayer>
                <footer>
                    <div className="footer__content">
                        <a href="http://news.sky.com/">skynews.com</a>
                    </div>
                </footer>
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
