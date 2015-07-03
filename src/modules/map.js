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
            mapMaxHeightDesktop = 400,
            markersMinX = 0,
            markersMaxX = 0,
            markersMinY = 0,
            markersMaxY = 0,
            widthNeeded = 0,
            offset = 0,
            heightNeeded = state.containerHeight,
            containerStyle,
            markers = [],
            scenesOut = [],
            style;

        for (var i in locations) {
            if (i === 'default') {
                continue;
            }

            var x = locations[i].coordinates.x,
                y = locations[i].coordinates.y;

            markersMinX = markersMinX > x ? x : markersMinX;
            markersMaxX = markersMaxX < x ? x : markersMaxX;
            markersMaxY = markersMaxY < y ? y : markersMaxY;
        }

        if (markersMaxX > Math.abs(markersMinX)) {
            widthNeeded = 2 * markersMaxX;
        } else {
            widthNeeded = 2 * Math.abs(markersMinX);
        }

        widthNeeded += 150; // arbitrary offset from edges...
        heightNeeded = markersMaxY + 80; // arbitrary offset from edges...

        if (window.innerWidth > 768) {
            heightNeeded = heightNeeded > mapMaxHeightDesktop ? mapMaxHeightDesktop : heightNeeded;
        } else {
            offset = 30;
        }

        scale = state.containerWidth / widthNeeded;

        scale = scale > 1 ? 1 : scale;

        containerStyle = {
            'backgroundSize': (mapBgWidth * scale) + 'px ' + (mapBgHeight * scale) + 'px',
            'height': (heightNeeded * scale) + offset + 'px'
        }

        if (window.innerWidth < 768) {
            containerStyle['backgroundPosition'] = '50% ' + offset + 'px';
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

                // The -20 below are 1/2 the markers widht and heights, as they should
                //  be centered on the given coordinates.
                style = {
                    left: (state.containerWidth / 2 + loc.coordinates.x  * scale) - 20 - (selected ? 10 : 0),
                    top: (loc.coordinates.y * scale) + offset - 20 - (selected ? 10 : 0)
                };

                markers.push(<a className={ classNames } style={ style } onClick={ this._handleClick.bind(this, i) }  key={ 'marker' + i }></a>);
            }

            if (state.selected !== null && state.selected !== undefined) {
                _.forEach(locations[state.selected].scenes, function(sceneId) {
                    var scene = _.find(scenes, function(s) {
                        return s._id === sceneId;
                    })

                    if (scene) {
                        scenesOut.push(<Scene data={ {scene: scene, globalData: this.props.data, expanded:true} } key={scene._id}/>)
                    }
                }.bind(this));
            }
        }

        return (
            <div className="map">
                <div className="map__container" ref="container" style={containerStyle}>{ markers }<div className="map__title-bg"><h2 className="map__title">Explore the locations</h2></div></div>
                { scenesOut }
            </div>
        );
    }
}

export default Map;
