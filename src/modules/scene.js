import React from 'react';
import _ from 'lodash';

import TimeTab from './time_tab';
import Videos from './videos';

class Scene extends React.Component {

    render() {

        var image = '',
            textParagraphs = [''],
            paragraphs = [],
            text = [];

        if (this.props.data.body) {
            textParagraphs = this.props.data.body.split('\n');
            text.push(<div className="scene_text scene_excerpt"><p>{ textParagraphs.shift() }</p></div>);

            if (textParagraphs.length) {
                for ( var idx in textParagraphs) {
                    paragraphs.push(<p>{ textParagraphs[idx] }</p>);
                }

                text.push(<div className="scene_text">{ paragraphs }</div>);
            }
        }

        if(this.props.data.image){
            image = <div className="scene__image"><img src={this.props.data.image} /></div>
        }

        return <article className="cf scene scene--timeline">
            <TimeTab data={this.props.data.time}/>
            <div className="scene__content">
                <h2 className="scene__title scene__title--type1">
                    {this.props.data.title}
                </h2>
                { image }
                { text }
            </div>
            <Videos></Videos>
        </article>
    }
}

export default Scene;
