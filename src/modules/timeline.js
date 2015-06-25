import React from 'react';
import _ from 'lodash';

import Hero from './hero';
import TimeTab from './time_tab';
import Videos from './videos';

import scenes from '../data/scenes';

class Scene extends React.Component {
    render() {

        var image = '';

        if(this.props.data.image){
            image = <div className="scene__image"><img src={this.props.data.image} /></div>
        }

        return <article className="cf scene scene--timeline">
            <TimeTab data={this.props.data.time}/>
            <div className="scene__content">
                <h2 className="scene__title scene__title--type1">
                    {this.props.data.title}
                </h2>
                { image }
                <p className="scene_text">{this.props.data.body}</p>
            </div>
            <Videos></Videos>
        </article>
    }
}

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scenes: scenes};
    }

    render() {
        var scenes = _.map(this.state.scenes, function (scene) {
            return <Scene data={scene} key={scene.id}/>
        });

        return (
            <div>
                <Hero></Hero>
                <section className="scenes">{scenes}</section>
            </div>
        )
    }
}

export default Timeline;
