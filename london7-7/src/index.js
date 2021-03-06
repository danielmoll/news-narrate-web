import React from 'react';
import _ from 'lodash';
import DocumentMeta from 'react-document-meta';

import Map from './modules/map'
import Interviews from './modules/interviews'
import Menu from './modules/menu'
import Timeline from './modules/timeline'
import VideoPlayer from './modules/videoPlayer';
import Share from './modules/share'

import londonData from './data/london';

var dataSource = 'https://prod-narrate.firebaseio.com/london.json';

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

        var sortedScenes = [];

        _.forEach(londonData.scenes, function(s, k) {
            s._id = k;
        });

        sortedScenes = _.sortBy(londonData.scenes, function(s) {
            return new Date(s.time).getTime();
        });

        londonData.scenes = sortedScenes;

        this.setState({
            data: londonData
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
            pageTitle = 'July 7 bombings - Timeline and key interviews';


        const metaData = {
            title: pageTitle,
            canonical: 'http://narrate.news.sky.com/london7-7',
            meta: {
                charset: 'utf-8',
                'og:image': '',
                'og:title': pageTitle
            }
        };

        return (
            <div>
                <DocumentMeta {...metaData} />
                <div className="header">
                    <a className="header__logo" href="http://news.sky.com/">go to...</a>
                    <Share data={ {classNames:'share__list--right'} }/>
                </div>

                <Menu data={ route }></Menu>

                <Content data={ this.state.data } id={ id }></Content>
                <VideoPlayer></VideoPlayer>
                <footer><a href="http://news.sky.com/">skynews.com</a></footer>
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

