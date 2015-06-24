import React from 'react';
import _ from 'lodash';

import Hero from './hero';
import TimeTab from './time_tab';

import scenes from '../data/scenes';

class Scene extends React.Component {
    render() {

        var image = '';

        if(this.props.data.image){
            image = <div className="card__image"><img src={this.props.data.image} /></div>
        }

        return <article className="cf card card--timeline">
            <TimeTab data={this.props.data.time}/>
            <div className="card__content">
                <h2 className="card__title card__title--type1">
                    {this.props.data.title}
                </h2>
                { image }
                <p className="card_text">{this.props.data.body}</p>
            </div>
            <div className="card__media"></div>
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
                <section className="cards">{cards}</section>
            </div>
        )
    }
}

export default Timeline;
