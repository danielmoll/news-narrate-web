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

    titleEncoded() {
        return encodeURIComponent("Sky News: London Bombings 7-7")
    }

    facebookUrl() {
        return "https://www.facebook.com/sharer/sharer.php?u=" + this.urlEncoded();
    }

    twitterUrl() {
        return "https://twitter.com/intent/tweet?url=" + this.urlEncoded() + ";text=" + this.titleEncoded();
    }

    render() {
        return (
            <ul className="share__list share__list--right">
                <li>
                    <a className="share__social-link skycon--hover" target="_blank" href={this.facebookUrl()}>
                        <i aria-hidden="true" className="skycon skycon--facebook"></i>
                    </a>
                </li>
                <li>
                    <a className="share__social-link skycon--hover" target="_blank" href={this.twitterUrl()}>
                        <i aria-hidden="true" className="skycon skycon--twitter"></i>
                    </a>
                </li>
            </ul>
        );
    }

}

export default Share