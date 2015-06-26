import React from 'react';
import Videos from './videos';
import Image from './image';
import locations from '../data/locations';

class Interview extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = { expanded: false };
    }

    handleClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        var imageUrl = (this.props.data.thumbnail) ? this.props.data.thumbnail : false,
            image,
            text = this.props.data.body,
            name = this.props.data.name,
            location = locations[this.props.data.location].locationName,
            iconState = (this.state.expanded) ? 'icon icon--collapse' : 'icon icon--expand',
            videos;

        if (imageUrl) {
            image = <Image data={imageUrl} classNames="interview__interviewee" />
        }

        if (this.state.expanded) {
            videos = <Videos data={ {videos: this.props.data.videos} }></Videos>
        }

        return  <article className="interview">
                    <div className="interview__button" onClick={this.handleClick}>
                        <span className={iconState}></span>
                    </div>

                    {image}

                    <div className="interview__body">
                        <blockquote className="interview__text">
                            <span className="icon icon--quote icon--quote-left"></span>
                            {text}
                            <span className="icon icon--quote icon--quote-right"></span>
                        </blockquote>
                        <div className="interview__name">{name}</div>
                        <div className="interview__location">{location}</div>
                    </div>

                    {videos}
                </article>
    }
}

export default Interview;
