import React from 'react';
import _ from 'lodash';

import Scene from './scene';

import locations from '../data/locations';
import scenes from '../data/scenes';

class Map extends React.Component {
    constructor(props){
        super(props);

        this.render = this.render.bind(this);
        this.setState = this.setState.bind(this);
        this._handleResize = this._handleResize.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this.state = {containerWidth: 0, selected: null};
        this.locations = locations;
    }

    _handleResize(e) {
        this.setState({containerWidth: this.refs.container.getDOMNode().offsetWidth});
    }

    _handleClick(name) {
        var state = this.state;

        if (state.selected === name) {
            state.selected = null;
        } else {
            state.selected = name;
        }

        this.setState(state);
    }

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);
        this._handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }

    render() {
        var markers = [],
            scene = '',
            sceneData,
            style,
            state = this.state;

        for (var i in locations) {
            var loc = locations[i],
                selected = state.selected === i,
                classNames = 'map__marker' + (selected ? ' map__marker--selected' : '');

            style = {
                left: state.containerWidth / 2 + loc.coordinates[0] - (selected ? 10 : 0),
                top: loc.coordinates[1] - (selected ? 10 : 0)
            };

            markers.push(<a className={ classNames } style={ style } onClick={ this._handleClick.bind(this, i) }></a>);
        }

        if (state.selected !== null) {

            for (var i in scenes) {

                if (scenes[i].id === locations[state.selected].scene) {
                    sceneData = scenes[i];

                    break;
                }
            }

            if (sceneData) {
                scene = <Scene data={sceneData} key={sceneData.id}/>
            }
        }

        return <div className="map">
            <div className="map__container" ref="container">{ markers }</div>
            { scene }
        </div>;
    }
}

export default Map;
