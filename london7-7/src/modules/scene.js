import React from 'react';
import _ from 'lodash';

import TimeTab from './time_tab';
import Videos from './videos';
import Image from './image';

class Scene extends React.Component {
    constructor() {
        super();
    }

    render() {

        var sceneKey = 'scene_' + this.props.data.id,
            sceneData = (this.props.data && this.props.data.scene) || {},
            contentClassString = 'scene__content',
            h2ClassString = 'scene__title',
            typeClassString = '',
            typeIcon = '',
            imageUrl = (sceneData.image) ? sceneData.image : '',
            imageOutput = '',
            textParagraphs = [''],
            paragraphs = [],
            text = [];


        if (sceneData.type) {
            h2ClassString += ' scene__title--with_icon';
            typeClassString = 'scene__title-type scene__title-type--' + sceneData.type;
            typeIcon = <span className={ typeClassString } key={ sceneKey + '_icon' }></span>;
        }

        if (sceneData.body) {
            textParagraphs = sceneData.body.split('\n');
            text.push(<div className="scene_text" key={ sceneKey + '_excerpt' }><p>{ textParagraphs.shift() }</p></div>);

            if (textParagraphs.length) {
                for ( var idx in textParagraphs) {
                    paragraphs.push(<p key={ 'p_' + idx }>{ textParagraphs[idx] }</p>);
                }

                text.push(<div className="scene_text" key={ sceneKey + '_text' }>{ paragraphs }</div>);
            }
        }

        if (imageUrl) {
            imageOutput = <Image data={imageUrl} classNames="scene__image"  key={ sceneKey + '_img' }/>;
        }

        return (
            <article className="cf scene scene--timeline">
                <TimeTab data={sceneData.time} key={ sceneKey + '_time' } />
                <div className={ contentClassString }  key={ sceneKey + '_content' }>
                    <h2 className={ h2ClassString } onClick={this.handleClick} key={ sceneKey + '_title' }>
                        { typeIcon }
                        {sceneData.title}
                    </h2>
                    { imageOutput }
                    { text }
                </div>
                <Videos data={ {ids: sceneData.videos, videos: this.props.data.globalData.videos } } key={ sceneKey + '_videos' }></Videos>
            </article>
        )
    }
}

export default Scene;
