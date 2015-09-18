import React from 'react';
import Videos from './videos';
import Image from './image';
import Share from './share'

class Interview extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = { expanded: false };
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        var interviewData = this.props.data.interview,
            interviewUrl = window.location.origin + window.location.pathname + '#/interviews/' + interviewData.id,
            imageUrl = (interviewData.thumbnail) ? interviewData.thumbnail : false,
            quote = interviewData.quote,
            name = interviewData.name,
            shareTitle = 'Migration Crisis - Sky News talks to ' + name,
            expandable = false,
            classNames = 'interview__body',
            expandedIcon,
            iconState,
            image,
            location,
            locationElt,
            text,
            videos;

        if (imageUrl) {
            image = <Image data={imageUrl} classNames="interview__interviewee" />
        }

        if (interviewData.text || interviewData.videos) {
            expandable = true;
        }

        if (this.props.data.expanded || this.state.expanded) {
            if (interviewData.text) {
                text = <p className="interview__text">{ interviewData.text }</p>
            }

            if (interviewData.videos) {
                videos = <div className="interview__videos"><Videos data={ {ids: interviewData.videos, useFrame: true, videos: this.props.data.globalData.videos} }></Videos></div>
            }
        }

        if (expandable) {
            classNames += ' interview__body--expandable';
            iconState = (this.state.expanded) ? 'icon icon--collapse' : 'icon icon--expand'
        }

        if (expandable && !this.props.data.expanded) {
            expandedIcon = <div className="interview__button"><span className={iconState}></span></div>
        }

        if (interviewData.location) {
            var globalLoc = this.props.data.globalData.locations[interviewData.location],
                locationText = globalLoc && globalLoc.locationName;

            if (!locationText) {
                locationText = interviewData.location
            }

            locationElt = <div className="interview__location">{locationText}</div>
        }

        return  (
            <article className="interview">
                { image }

                <div className={ classNames } onClick={this.handleClick}>
                    { expandedIcon }
                    <blockquote className="interview__quote">
                        <span className="icon icon--quote icon--quote-left"></span>
                        { quote }
                        <span className="icon icon--quote icon--quote-right"></span>
                    </blockquote>
                    <div className="interview__name">{ name }</div>
                    { locationElt }
                    <Share data={ {url: interviewUrl, title: shareTitle  } }/>
                </div>
                {text}
                {videos}
            </article>
            );
    }
}

export default Interview;
