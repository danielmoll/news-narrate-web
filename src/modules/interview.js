import React from 'react';
import Videos from './videos';
import Image from './image';

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
        var interviewData = this.props.data.interview,
            imageUrl = (interviewData.thumbnail) ? interviewData.thumbnail : false,
            image,
            quote = interviewData.quote,
            name = interviewData.name,
            location = this.props.data.globalData.locations[interviewData.location].locationName,
            iconState = (this.state.expanded) ? 'icon icon--collapse' : 'icon icon--expand',
            videos;

        if (imageUrl) {
            image = <Image data={imageUrl} classNames="interview__interviewee" />
        }

        if (this.state.expanded) {
            videos = <Videos data={ {ids: interviewData.videos, videos: this.props.data.globalData.videos} }></Videos>
        }

        return  (
            <article className="interview">
                <div className="interview__button" onClick={this.handleClick}>
                    <span className={iconState}></span>
                </div>

                {image}

                <div className="interview__body">
                    <blockquote className="interview__text">
                        <span className="icon icon--quote icon--quote-left"></span>
                        {quote}
                        <span className="icon icon--quote icon--quote-right"></span>
                    </blockquote>
                    <div className="interview__name">{name}</div>
                    <div className="interview__location">{location}</div>
                </div>
                <div className="interview__videos">
                    {videos}
                </div>
            </article>
            );
    }
}

export default Interview;
