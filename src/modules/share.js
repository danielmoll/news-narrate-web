import React from 'react';
import _ from 'lodash';

class Share extends React.Component {
    constructor() {
        super();

        this.state = {
            showVideo: false
        };
    }

    fullUrl() {
        return (this.props.data && this.props.data.url) || window.location;
    }

    urlEncoded() {
        return encodeURIComponent(this.fullUrl())
    }

    title() {
       return this.props.data.title || "July 7 bombings - Timeline and key interviews"
    }

    titleEncoded() {
        return encodeURIComponent(this.title())
    }

    facebookUrl() {
        return "https://www.facebook.com/sharer/sharer.php?u=" + this.urlEncoded();
    }

    twitterUrl() {
        return "https://twitter.com/intent/tweet?url=" + this.urlEncoded() + ";text=" + this.titleEncoded();
    }

    handleTwitterShare(e) {
        e.preventDefault();
        e.stopPropagation();
        this.handleShare('Twitter');
    }

    handleFacebookShare() {
        e.preventDefault();
        e.stopPropagation();
        this.handleShare('Facebook');
    }

    handleShare(network) {

        window.ga('send', 'event', 'share', network, this.title());
    }


    render() {
        var classes = 'share__list';

        if (this.props.data.classNames) {
            classes += ' ' + this.props.data.classNames;this.props.data.classNames;
        }

        return (
            <ul className={ classes }>
                <li>
                    <a className="share__social-link skycon--hover" target="_blank" onClick={this.handleFacebookShare.bind(this)} href={this.facebookUrl()}>
                        <i aria-hidden="true" className="skycon skycon--facebook"></i>
                    </a>
                </li>
                <li>
                    <a className="share__social-link skycon--hover" target="_blank" onClick={this.handleTwitterShare.bind(this)} href={this.twitterUrl()}>
                        <i aria-hidden="true" className="skycon skycon--twitter"></i>
                    </a>
                </li>
            </ul>
        );
    }

}

export default Share