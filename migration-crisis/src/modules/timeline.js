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

        _.forEach(propScenes, function (scene) {
            scenes.push(<Scene data={ { scene: scene, id: scene._id, globalData: that.props.data } } key={scene._id}/>);
        });

        return (
            <div className="content-container">
                <Hero></Hero>
                <section className="scenes">{scenes}</section>
            </div>
        );
    }
}

export default Timeline;
