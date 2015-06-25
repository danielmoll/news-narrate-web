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
