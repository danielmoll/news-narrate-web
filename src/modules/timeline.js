import React from 'react';
import _ from 'lodash';

import Hero from './hero';
import TimeTab from './time_tab';
import Videos from './videos';
import Scene from './scene';

import scenes from '../data/scenes';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scenes: scenes};
    }

    render() {
        var scenes = [];

        _.forEach(this.state.scenes, function (scene, id) {
            scenes.push(<Scene data={scene} key={id}/>);
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
