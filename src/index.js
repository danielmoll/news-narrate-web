import React from 'react';
import _ from 'lodash';

import Map from './modules/map'
import Interviews from './modules/interviews'
import Menu from './modules/menu'
import Timeline from './modules/timeline'


class Narrate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {route: window.location.hash.substr(1)}
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            });
        });

    }

    render() {

        var Content;

        switch(this.state.route) {
            case '/interviews':
                Content = Interviews;
                break;
            case '/map':
                Content = Map;
                break;
            case '/timeline':
                Content = Timeline;
                break;
            default:
                Content = Timeline;
        }


        return (
            <div>
                <div className="header">
                    <a href="/">go to...</a>
                </div>
                <Menu data={this.state.route}></Menu>
                <Content></Content>
            </div>
        )
    }

}


var mountNode = document.getElementById('narrate-app')
React.render(
    <Narrate/>
    , mountNode);

