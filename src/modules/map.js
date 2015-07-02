import React from 'react';
import _ from 'lodash';

import Scene from './scene';

class Map extends React.Component {

    constructor(props){
        super(props);

        this.render = this.render.bind(this);
        this.setState = this.setState.bind(this);
        this._handleResize = this._handleResize.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this.state = {
            containerWidth: 0,
            containerHeight: 0,
            selected: null
        };
    }

    _handleResize(e) {
        var container = this.refs.container.getDOMNode();

        this.setState({
            containerWidth: container.offsetWidth,
            containerHeight: container.offsetHeight
        });
    }

    _handleClick(name) {
        this.setState( { selected: name } );
    }

    componentDidMount() {
        window.addEventListener('resize', this._handleResize);
        this._handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }

    render() {

        var locations = (this.props.data && this.props.data.locations) || [],
            scenes =  (this.props.data && this.props.data.scenes) || [],
            state = this.state,
            scale = 1,
            mapBgWidth = 1000,
            mapBgHeight = 500,
            mapMaxHeightDesktop = 350,
            markersMinX = 0,
            markersMaxX = 0,
            markersMinY = 0,
            markersMaxY = 0,
            widthNeeded = 0,
            heightNeeded = state.containerHeight,
            containerStyle,
            markers = [],
            scene = '',
            sceneData,
            style;

        for (var i in locations) {
            if (i === 'default') {
                continue;
            }

            var x = locations[i].coordinates.x,
                y = locations[i].coordinates.y;

            markersMinX = markersMinX > x ? x : markersMinX;
            markersMaxX = markersMaxX < x ? x : markersMaxX;
            markersMinY = markersMinY > y ? y : markersMinY;
            markersMaxY = markersMaxY < y ? y : markersMaxY;
        }

        widthNeeded = markersMaxX - markersMinX + 150;
        heightNeeded = markersMaxY - markersMinY + 230;

        if (window.innerWidth > 800) {
            heightNeeded = heightNeeded > mapMaxHeightDesktop ? mapMaxHeightDesktop : heightNeeded;
        }

        scale = state.containerWidth / widthNeeded;

        scale = scale > 1 ? 1 : scale;

        containerStyle = {
            'backgroundSize': (mapBgWidth * scale) + 'px ' + (mapBgHeight * scale) + 'px',
            'height': (heightNeeded * scale) + 'px'
        }

        if (locations) {

            if (this.state.selected === null || state.selected === undefined) {
                state.selected = locations.default;
            }

            for (var i in locations) {
                if (i === 'default') {
                    continue;
                }

                var loc = locations[i],
                    selected = state.selected === i,
                    classNames = 'map__marker' + (selected ? ' map__marker--selected' : '');

                style = {
                    left: (state.containerWidth / 2 + loc.coordinates.x  * scale) - (selected ? 10 : 0),
                    top: (heightNeeded * scale / 2 + loc.coordinates.y * scale) - (selected ? 10 : 0)
                };

                markers.push(<a className={ classNames } style={ style } onClick={ this._handleClick.bind(this, i) }  key={ 'marker' + i }></a>);
            }

            if (state.selected !== null && state.selected !== undefined) {

                for (var i = 0 ; i < scenes.length ; i++) {
                    if (scenes[i]._id === locations[state.selected].scene) {
                        sceneData = scenes[i];
                        break;
                    }
                }

                if (sceneData) {
                    scene = <Scene data={ {scene: sceneData, globalData: this.props.data, expanded:true} } key={sceneData._id}/>
                }
            }
        }

        return (
            <div className="map">
                <div className="map__container" ref="container" style={containerStyle}>{ markers }</div>
                { scene }
            </div>
        );
    }
}

export default Map;
