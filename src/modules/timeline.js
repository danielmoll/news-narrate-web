import React from 'react';
import _ from 'lodash';

import Hero from './hero';
import TimeTab from './time_tab';
import Videos from './videos';
import Scene from './scene';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scenes: []};
    }

    render() {
        var propScenes = (this.props.data && this.props.data.scenes) || [],
            scenes = [],
            that = this;

        _.forEach(propScenes, function (scene, id) {
            scenes.push(<Scene data={ { scene: scene, id: id, globalData: that.props.data } } key={id}/>);
        });

        return (
            <div>
                <Hero></Hero>
                <section className="scenes">{scenes}</section>
            </div>
        );
    }
}

export default Timeline;
