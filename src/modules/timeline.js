import React from 'react';
import _ from 'lodash';

import Hero from './hero'

import scenes from '../data/scenes'

class Scene extends React.Component {
    render() {

        var style = {
            border: '1px solid gray',
            padding: '10px',
            margin: '10px',
            width: '600px'
        };

        return <article style={style}>
            <h2>
                {this.props.data.title}
            </h2>
        </article>
    }
}

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scenes: scenes};
    }

    render() {
        var cards = _.map(this.state.scenes, function (scene) {
            return <Scene data={scene} key={scene.id}/>
        });
        return (
            <div>
                <Hero></Hero>
                <section>{cards}</section>
            </div>
        )
    }
}

export default Timeline;
