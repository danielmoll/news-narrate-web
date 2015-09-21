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
            mobileBreakpoint = 769,
            mapMaxHeightDesktop = 500,
            // Arbitrary offset from top/bottom edges...
            verticalEdgeOffset = 80,
            // Offset to increase the height of the map on < 768 width
            //  which makes space for the data at the top.
            // Random/trial-error defined.
            verticalMobileExtend = 30,
            // Arbitrary offset from left/right edges...
            horizontalEdgeOffset = 150,
            markerUnselectedHalfSize = 20,
            markerSelectedHalfSize = 20,
            markerHalfSizeDifference = markerSelectedHalfSize - markerUnselectedHalfSize,
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
            // Horrible hack to identify the marker
            //  to show as selected by default
            if (i === 'default') {
                continue;
            }

            var x = locations[i].coordinates.x,
                y = locations[i].coordinates.y;

            // Map coordinates [0,0] is at the top, center
            //  of the map.
            // A marker on the left of the map will have
            //      x < 0
            // A marker on the right of the map will have
            //      x > 0
            // All markers have y > 0 (min === 0)
            markersMinX = markersMinX > x ? x : markersMinX;
            markersMaxX = markersMaxX < x ? x : markersMaxX;
            markersMaxY = markersMaxY < y ? y : markersMaxY;
        }

        widthNeeded = 2 * Math.max(markersMaxX, Math.abs(markersMinX));

        widthNeeded += horizontalEdgeOffset;
        heightNeeded = markersMaxY + verticalEdgeOffset;

        if (window.innerWidth > mobileBreakpoint) {
            heightNeeded = heightNeeded > mapMaxHeightDesktop ? mapMaxHeightDesktop : heightNeeded;
        } else {
            offset = verticalMobileExtend;
        }

        scale = state.containerWidth / widthNeeded;

        scale = scale > 1 ? 1 : scale;

        containerStyle = {
            'backgroundSize': (mapBgWidth * scale) + 'px ' + (mapBgHeight * scale) + 'px',
            'height': (heightNeeded * scale) + offset + 'px'
        }

        // Applying the vertical offset if needed.
        if (window.innerWidth < mobileBreakpoint) {
            containerStyle['backgroundPosition'] = '50% ' + offset + 'px';
        }

        if (locations) {

            if (this.state.selected === null || state.selected === undefined) {
                state.selected = locations.default;
            }

            for (var i in locations) {
                // Horrible hack to identify the marker
                //  to show as selected by default
                if (i === 'default') {
                    continue;
                }

                var loc = locations[i],
                    selected = state.selected === i,
                    classNames = 'map__marker' + (selected ? ' map__marker--selected' : '');

                // The -markerUnselectedHalfSize below are 1/2 the markers widht
                //  and heights, as they should be centered on the given coordinates.
                style = {
                    left: (state.containerWidth / 2 + loc.coordinates.x  * scale) - markerUnselectedHalfSize - (selected ? markerHalfSizeDifference : 0),
                    top: (loc.coordinates.y * scale) + offset - markerUnselectedHalfSize - (selected ? markerHalfSizeDifference : 0)
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
            <div className="map content-container">
                <div className="map__container" ref="container" style={containerStyle}>{ markers }<div className="map__title-bg"><h2 className="map__title">Explore the locations</h2></div></div>
                <div className="map__scenes-container">
                    { scenesOut }
                </div>
            </div>
        );
    }
}

export default Map;
