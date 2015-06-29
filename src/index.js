import React from 'react';
import _ from 'lodash';

import Map from './modules/map'
import Interviews from './modules/interviews'
import Menu from './modules/menu'
import Timeline from './modules/timeline'


class Narrate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1)
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            });
        });
    }

    getTemplate(route) {
        var view = {};

        switch(true) {
            case /\/timeline/.test(route):
                view.module = Timeline;
                break;
            case /\/map/.test(route):
                view.module = Map;
                break;
            case /\/interviews\/\d+/.test(route):
                view.module = Interviews;
                view.id = route.match(/\d+/)[0];
                break;
            case /\/interviews/.test(route):
                view.module = Interviews;
                break;
            default:
                view.module = Timeline;
        }

        return view;
    }

    render() {
        var route = this.state.route || '/timeline',
            template = this.getTemplate(route),
            Content = template.module,
            id = template.id || 'all';

        return (
            <div>
                <div className="header">
                    <a href="/">go to...</a>
                </div>

                <Menu data={ route }></Menu>

                <Content data={ id }></Content>
            </div>
        )
    }

}

var mountNode = document.getElementById('narrate-app');

React.render(<Narrate/>, mountNode);

