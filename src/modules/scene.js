import React from 'react';
import _ from 'lodash';

import TimeTab from './time_tab';
import Videos from './videos';

class Scene extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = { expanded: false };
    }

    handleClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {

        var contentClassString = 'scene__content' + (this.state.expanded ? ' expanded' : ''),
            h2ClassString = 'scene__title',
            typeClassString = '',
            typeIcon = '',
            expandableIcon = '',
            image = '',
            textParagraphs = [''],
            paragraphs = [],
            text = [];


        if (this.props.data.type) {
            h2ClassString += ' scene__title--with_icon';
            typeClassString = 'scene__title-type scene__title-type--' + this.props.data.type;
            typeIcon = <span className={ typeClassString }></span>;
        }

        if (this.props.data.body) {
            textParagraphs = this.props.data.body.split('\n');
            text.push(<div className="scene_text scene_excerpt"><p>{ textParagraphs.shift() }</p></div>);

            if (textParagraphs.length) {
                var iconState = 'icon icon--expand';

                h2ClassString += ' expandable';

                if (this.state.expanded) {
                    iconState = 'icon icon--collapse';
                }

                expandableIcon = <span className={ iconState }></span>;

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
            <div className={ contentClassString }>
                <h2 className={ h2ClassString } onClick={this.handleClick}>
                    { typeIcon }
                    { expandableIcon }
                    {this.props.data.title}
                </h2>
                { image }
                { text }
            </div>
            <Videos data={ {videos: this.props.data.videos} }></Videos>
        </article>
    }
}

export default Scene;
